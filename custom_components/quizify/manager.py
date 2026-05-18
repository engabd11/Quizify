"""Quizify manager: holds active sessions, music control, speaker discovery."""
from __future__ import annotations

import asyncio
import hmac
import logging
import secrets
import time
from hashlib import sha256
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import DOMAIN, PLAYER_TOKEN_TTL
from .game import GameSession, GameSettings
from .questions import QuestionBank

_LOGGER = logging.getLogger(__name__)


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

    async def async_setup(self) -> None:
        """Load question banks."""
        await self.bank.async_load()

    # --- session lifecycle -------------------------------------------------

    def create_session(self, settings: GameSettings) -> GameSession:
        """Create a new game session with a unique join code."""
        session_id = secrets.token_urlsafe(12)
        # Re-roll the join code on the rare collision with an in-flight game.
        for _ in range(8):
            session = GameSession(session_id, settings, self.bank, hass=self.hass)
            if session.join_code not in self._join_index:
                break
        else:
            _LOGGER.warning(
                "Eight join-code collisions in a row; using whatever we got"
            )
        self._sessions[session_id] = session
        self._join_index[session.join_code] = session_id
        _LOGGER.info(
            "Created session %s (join code %s)", session_id, session.join_code
        )
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
        """Start background music for a session if configured."""
        settings = session.settings
        if not settings.music_player or not settings.music_uri:
            return
        # Prefer Music Assistant's play_media when present.
        if "music_assistant" in self.hass.config.components:
            try:
                await self.hass.services.async_call(
                    "music_assistant",
                    "play_media",
                    {
                        "entity_id": settings.music_player,
                        "media_id": settings.music_uri,
                        "media_type": "playlist",
                    },
                    blocking=False,
                )
                return
            except Exception:  # pragma: no cover
                _LOGGER.warning(
                    "music_assistant.play_media failed; falling back to media_player",
                    exc_info=True,
                )
        # Generic media_player fallback.
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
