"""Quizify manager: holds active sessions, music control, speaker discovery."""
from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import DOMAIN
from .game import GameSession, GameSettings
from .questions import QuestionBank

_LOGGER = logging.getLogger(__name__)


class QuizifyManager:
    """Singleton-per-config-entry manager for Quizify."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._sessions: dict[str, GameSession] = {}
        self._join_index: dict[str, str] = {}  # join_code -> session_id
        questions_path = Path(__file__).parent / "questions"
        self.bank = QuestionBank(questions_path)

    async def async_setup(self) -> None:
        """Load question banks."""
        await self.bank.async_load()

    # --- session lifecycle -------------------------------------------------

    def create_session(self, settings: GameSettings) -> GameSession:
        import secrets

        session_id = secrets.token_urlsafe(12)
        session = GameSession(session_id, settings, self.bank)
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
        session = self._sessions.pop(session_id, None)
        if session is None:
            return
        self._join_index.pop(session.join_code, None)
        await session.cancel()
        await self.stop_music(session)

    # --- speaker discovery -------------------------------------------------

    def list_speakers(self) -> list[dict[str, Any]]:
        """Return supported media players for the music backing track.

        We list any media_player entity. The frontend will let admins
        pick — we don't restrict by integration here since "supported"
        is fuzzier for chill background music than for Beatify's
        song-by-song playback.
        """
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
        out.sort(key=lambda p: (not p["supports_mass"], p["name"]))
        return out

    # --- music control -----------------------------------------------------

    async def play_music(self, session: GameSession) -> None:
        """Start background music for a session if configured."""
        settings = session.settings
        if not settings.music_player or not settings.music_uri:
            return
        # Prefer Music Assistant's play_media which handles URIs cleanly.
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
            except Exception:  # pragma: no cover - graceful fallback
                _LOGGER.warning(
                    "music_assistant.play_media failed; falling back to media_player"
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
        """Stop the music for a session."""
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
    """Look up the manager from hass.data."""
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        return None
    # Return the first manager (we support a single config entry for now).
    for value in domain_data.values():
        if isinstance(value, QuizifyManager):
            return value
    return None
