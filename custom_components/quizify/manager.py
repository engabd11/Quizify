"""Quizify manager: holds active sessions, music control, speaker discovery."""
from __future__ import annotations

import asyncio
import hmac
import logging
import secrets
import time
from collections.abc import Callable
from hashlib import sha256
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import DOMAIN, MAX_CONCURRENT_SESSIONS, MAX_TOKEN_LENGTH, PLAYER_TOKEN_TTL
from .game import GameSession, GameSettings
from .questions import QuestionBank

_LOGGER = logging.getLogger(__name__)


class TooManySessionsError(Exception):
    """Raised when ``create_session`` is called past ``MAX_CONCURRENT_SESSIONS``."""


class QuizifyManager:
    """Singleton-per-config-entry manager for Quizify."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._sessions: dict[str, GameSession] = {}
        self._join_index: dict[str, str] = {}  # join_code -> session_id
        self._lock = asyncio.Lock()
        # HMAC secret for issuing/verifying player tokens. Generated per
        # process start: tokens do not need to survive a restart because
        # in-memory game state doesn't either.
        self._token_secret = secrets.token_bytes(32)
        questions_path = Path(__file__).parent / "questions"
        self.bank = QuestionBank(questions_path)
        # Callbacks invoked when sessions are created/removed. Used by the
        # sensor platform to wire entity state to live game state without
        # the game/manager modules needing to know about entities.
        # Each callback receives ``(action, session)`` where ``action`` is
        # ``"created"`` or ``"ended"``.
        self._session_listeners: list[Callable[[str, GameSession], None]] = []

    async def async_setup(self) -> None:
        """Load question banks."""
        await self.bank.async_load()

    # --- session lifecycle -------------------------------------------------

    def create_session(self, settings: GameSettings) -> GameSession:
        """Create a new game session with a unique join code.

        Raises:
            TooManySessionsError: if there are already
                ``MAX_CONCURRENT_SESSIONS`` games running, or if we
                somehow couldn't find a free join code (vanishingly
                unlikely given 32^6 ≈ 1 billion codes).
        """
        if len(self._sessions) >= MAX_CONCURRENT_SESSIONS:
            raise TooManySessionsError(
                f"Maximum {MAX_CONCURRENT_SESSIONS} concurrent games reached"
            )
        session_id = secrets.token_urlsafe(12)
        # Re-roll the join code on the rare collision with an in-flight game.
        session: GameSession | None = None
        for _ in range(16):
            candidate = GameSession(session_id, settings, self.bank, hass=self.hass)
            if candidate.join_code not in self._join_index:
                session = candidate
                break
        if session is None:
            # 32^6 ≈ 1 billion codes; getting here means something is
            # seriously wrong (e.g. a degenerate RNG). Fail loudly rather
            # than overwrite another active session's join code.
            _LOGGER.error(
                "Could not find a unique join code in 16 attempts; aborting"
            )
            raise TooManySessionsError(
                "Could not allocate a unique join code"
            )
        self._sessions[session_id] = session
        self._join_index[session.join_code] = session_id
        _LOGGER.info(
            "Created session %s (join code %s)", session_id, session.join_code
        )
        self._notify_session_listeners("created", session)
        return session

    def get_session(self, session_id: str) -> GameSession | None:
        return self._sessions.get(session_id)

    def get_by_join_code(self, join_code: str) -> GameSession | None:
        sid = self._join_index.get(join_code.upper())
        if sid is None:
            return None
        return self._sessions.get(sid)

    def list_sessions(self) -> list[GameSession]:
        return list(self._sessions.values())

    async def end_session(self, session_id: str) -> None:
        """End a session, stopping music and cancelling the game loop."""
        async with self._lock:
            session = self._sessions.pop(session_id, None)
            if session is None:
                return
            self._join_index.pop(session.join_code, None)
        await session.cancel()
        await self.stop_music(session)
        self._notify_session_listeners("ended", session)

    # --- session lifecycle listeners --------------------------------------

    def subscribe_sessions(
        self, callback: Callable[[str, GameSession], None]
    ) -> Callable[[], None]:
        """Register a callback for session create/end events.

        ``callback`` is called as ``callback(action, session)`` where
        ``action`` is ``"created"`` or ``"ended"``. Returns an unsubscribe
        callable.
        """
        self._session_listeners.append(callback)

        def unsubscribe() -> None:
            try:
                self._session_listeners.remove(callback)
            except ValueError:
                pass

        return unsubscribe

    def _notify_session_listeners(
        self, action: str, session: GameSession
    ) -> None:
        for callback in list(self._session_listeners):
            try:
                callback(action, session)
            except Exception:  # pragma: no cover - defensive
                _LOGGER.exception("Session listener raised; continuing")

    # --- player tokens -----------------------------------------------------

    def issue_player_token(self, session_id: str, player_id: str) -> str:
        """Issue an HMAC-signed token binding a player_id to a session.

        Format: ``<expiry>.<session_id>.<player_id>.<hex_signature>``.
        Tokens are opaque to the client; they're only checked by us.
        """
        expiry = int(time.time()) + PLAYER_TOKEN_TTL
        body = f"{expiry}.{session_id}.{player_id}"
        sig = hmac.new(self._token_secret, body.encode("utf-8"), sha256).hexdigest()
        return f"{body}.{sig}"

    def verify_player_token(self, token: str, session_id: str) -> str | None:
        """Verify a token; return the player_id if valid, else None."""
        # Reject obviously malformed inputs before doing any string work.
        if not token or len(token) > MAX_TOKEN_LENGTH:
            return None
        try:
            expiry_str, sid, player_id, sig = token.split(".", 3)
        except ValueError:
            return None
        if sid != session_id:
            return None
        try:
            expiry = int(expiry_str)
        except ValueError:
            return None
        if expiry < time.time():
            return None
        body = f"{expiry_str}.{sid}.{player_id}"
        expected = hmac.new(
            self._token_secret, body.encode("utf-8"), sha256
        ).hexdigest()
        if not hmac.compare_digest(expected, sig):
            return None
        return player_id

    # --- speaker discovery -------------------------------------------------

    def list_speakers(self) -> list[dict[str, Any]]:
        """Return media_player entities suitable for background music."""
        registry = er.async_get(self.hass)
        out: list[dict[str, Any]] = []
        for state in self.hass.states.async_all("media_player"):
            entry = registry.async_get(state.entity_id)
            platform = entry.platform if entry else "unknown"
            out.append(
                {
                    "entity_id": state.entity_id,
                    "name": state.attributes.get("friendly_name", state.entity_id),
                    "platform": platform,
                    "state": state.state,
                    "supports_mass": platform == "music_assistant",
                }
            )
        # Music Assistant first, then by friendly name.
        out.sort(key=lambda p: (not p["supports_mass"], p["name"].lower()))
        return out

    # --- music control -----------------------------------------------------

    async def play_music(self, session: GameSession) -> None:
        """Start background music for a session if configured.

        Behaviour:
        - **Music Assistant + playlist URI**: call ``music_assistant.play_media``
          with ``radio_mode: true`` so the playlist gets shuffled/extended via
          MA's radio feature.
        - **Music Assistant + no URI**: call ``music_assistant.play_media``
          with ``radio_mode: true`` and no ``media_id``. MA picks something
          to play (its standard "play random / radio" behaviour). If MA
          doesn't like that shape of call, we fall back to ``media_play``
          on the underlying media_player so the speaker at least resumes
          whatever it had queued.
        - **Generic media_player + URI**: ``media_player.play_media``.
        - **Generic media_player + no URI**: ``media_player.media_play``.
        """
        settings = session.settings
        if not settings.music_player:
            return

        has_mass = "music_assistant" in self.hass.config.components

        # --- Music Assistant path ---
        if has_mass:
            service_data: dict[str, Any] = {
                "entity_id": settings.music_player,
                "radio_mode": True,
            }
            if settings.music_uri:
                service_data["media_id"] = settings.music_uri
                service_data["media_type"] = "playlist"
            try:
                await self.hass.services.async_call(
                    "music_assistant",
                    "play_media",
                    service_data,
                    blocking=False,
                )
                return
            except Exception:
                _LOGGER.warning(
                    "music_assistant.play_media failed; falling back",
                    exc_info=True,
                )
                # Fall through to media_player fallbacks below.

        # --- Generic media_player path ---
        if settings.music_uri:
            try:
                await self.hass.services.async_call(
                    "media_player",
                    "play_media",
                    {
                        "entity_id": settings.music_player,
                        "media_content_id": settings.music_uri,
                        "media_content_type": "music",
                    },
                    blocking=False,
                )
            except Exception:
                _LOGGER.exception("Failed to start background music")
            return

        # No URI, no Music Assistant — best effort: shuffle on, then play.
        try:
            await self.hass.services.async_call(
                "media_player",
                "shuffle_set",
                {"entity_id": settings.music_player, "shuffle": True},
                blocking=False,
            )
        except Exception:
            _LOGGER.debug(
                "shuffle_set not supported on %s", settings.music_player
            )
        try:
            await self.hass.services.async_call(
                "media_player",
                "media_play",
                {"entity_id": settings.music_player},
                blocking=False,
            )
        except Exception:
            _LOGGER.debug("media_play failed (nothing queued?)", exc_info=True)

    async def pause_music(self, session: GameSession) -> None:
        """Pause background music (used when the game is paused)."""
        if not session.settings.music_player:
            return
        try:
            await self.hass.services.async_call(
                "media_player",
                "media_pause",
                {"entity_id": session.settings.music_player},
                blocking=False,
            )
        except Exception:
            _LOGGER.debug("Music pause failed", exc_info=True)

    async def resume_music(self, session: GameSession) -> None:
        """Resume background music (used when the game is resumed)."""
        if not session.settings.music_player:
            return
        try:
            await self.hass.services.async_call(
                "media_player",
                "media_play",
                {"entity_id": session.settings.music_player},
                blocking=False,
            )
        except Exception:
            _LOGGER.debug("Music resume failed", exc_info=True)

    def wire_session_music(self, session: GameSession) -> None:
        """Hook a session's pause/resume into the music controls.

        Called by the websocket layer right after a session is created so
        ``game.pause()`` and ``game.resume_game()`` pause and play the
        speaker without the game module needing to know about the manager.
        """
        async def on_pause() -> None:
            await self.pause_music(session)
        async def on_resume() -> None:
            await self.resume_music(session)
        session.set_music_callbacks(on_pause, on_resume)

    async def stop_music(self, session: GameSession) -> None:
        if not session.settings.music_player:
            return
        try:
            await self.hass.services.async_call(
                "media_player",
                "media_stop",
                {"entity_id": session.settings.music_player},
                blocking=False,
            )
        except Exception:
            _LOGGER.exception("Failed to stop background music")

    async def duck_music(self, session: GameSession, ducked: bool) -> None:
        """Lower (or restore) the music volume for emphasis on reveals."""
        if not session.settings.music_player:
            return
        target_volume = 0.15 if ducked else 0.4
        try:
            await self.hass.services.async_call(
                "media_player",
                "volume_set",
                {
                    "entity_id": session.settings.music_player,
                    "volume_level": target_volume,
                },
                blocking=False,
            )
        except Exception:
            _LOGGER.debug("Volume set failed (not all players support it)")


def get_manager(hass: HomeAssistant) -> QuizifyManager | None:
    """Return the singleton manager, if Quizify has been set up."""
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        return None
    for value in domain_data.values():
        if isinstance(value, QuizifyManager):
            return value
    return None
