"""Sensor entities exposed by the Quizify integration.

Two sensors are created for every config entry:

* ``sensor.quizify_leaderboard`` — reflects the current (or most recent)
  game's leaderboard. ``state`` is the leading player's name (or ``idle``
  when no game is active). ``attributes`` include the ranked list of
  players with their scores and streaks, plus session metadata.

* ``sensor.quizify_current_song`` — mirrors the currently-playing track
  on the session's configured ``music_player``. ``state`` is the track
  title and ``attributes`` include artist, album, and source media_player.

Both sensors keep themselves updated by subscribing to the manager's
session lifecycle and the relevant game events. The current-song sensor
additionally tracks state changes on the configured media_player so it
updates the moment the track changes — not just on game events.
"""
from __future__ import annotations

import logging
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_state_change_event

from .const import DOMAIN
from .game import GameSession

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Quizify sensor entities for a config entry."""
    manager = hass.data[DOMAIN][entry.entry_id]
    leaderboard = QuizifyLeaderboardSensor(manager, entry)
    current_song = QuizifyCurrentSongSensor(manager, entry)
    async_add_entities([leaderboard, current_song])


class _QuizifyEntityBase(SensorEntity):
    """Shared plumbing for Quizify sensors.

    Subclasses handle the actual state derivation. This base wires the
    session-listener lifecycle so subclasses get notified when a game
    starts or ends, and provides per-session event subscriptions managed
    against the active session only.
    """

    _attr_should_poll = False
    _attr_has_entity_name = False

    def __init__(self, manager, entry: ConfigEntry) -> None:
        self._manager = manager
        self._entry = entry
        self._active_session: GameSession | None = None
        # Active subscriptions to cancel when the active session changes.
        self._session_event_unsub = None
        self._unsub_session_listener = None

    async def async_added_to_hass(self) -> None:
        """Wire up session lifecycle callbacks once the entity is registered."""
        self._unsub_session_listener = self._manager.subscribe_sessions(
            self._on_session_change
        )
        # Pick up an already-running session (rare on startup, but possible
        # if a sensor was reloaded mid-game).
        sessions = self._manager.list_sessions()
        if sessions:
            self._attach_session(sessions[0])

    async def async_will_remove_from_hass(self) -> None:
        """Tear down subscriptions when the entity goes away."""
        if self._unsub_session_listener is not None:
            self._unsub_session_listener()
            self._unsub_session_listener = None
        self._detach_session()

    # --- session lifecycle hooks ----------------------------------------

    @callback
    def _on_session_change(self, action: str, session: GameSession) -> None:
        """Manager → entity callback for create/end events."""
        if action == "created":
            self._attach_session(session)
        elif action == "ended" and session is self._active_session:
            self._detach_session()
            self._on_session_ended(session)
        self.async_write_ha_state()

    def _attach_session(self, session: GameSession) -> None:
        # Switch tracking to the new session.
        self._detach_session()
        self._active_session = session
        self._session_event_unsub = session.subscribe(self._on_game_event)
        self._on_session_attached(session)

    def _detach_session(self) -> None:
        if self._session_event_unsub is not None:
            self._session_event_unsub()
            self._session_event_unsub = None
        self._active_session = None

    async def _on_game_event(self, event: dict[str, Any]) -> None:
        """Game-loop → entity callback for every game event. Schedules a state
        write. Subclasses override ``_handle_game_event`` for custom behaviour
        before the write.
        """
        try:
            self._handle_game_event(event)
        except Exception:  # pragma: no cover - defensive
            _LOGGER.exception("Error handling game event in %s", self.entity_id)
        self.async_write_ha_state()

    # Hooks subclasses may override --------------------------------------

    def _on_session_attached(self, session: GameSession) -> None:
        """Called when a session becomes the active session."""

    def _on_session_ended(self, session: GameSession) -> None:
        """Called when the active session ends (after detach)."""

    def _handle_game_event(self, event: dict[str, Any]) -> None:
        """Called for every emitted game event on the active session."""


class QuizifyLeaderboardSensor(_QuizifyEntityBase):
    """Sensor reflecting the live leaderboard of the current game.

    State is the leading player's name; ``idle`` when no game is active.
    Attributes carry the ranked player list and session metadata so
    dashboards can render a full leaderboard from a single entity.
    """

    _attr_icon = "mdi:trophy"

    def __init__(self, manager, entry: ConfigEntry) -> None:
        super().__init__(manager, entry)
        self._attr_unique_id = f"{entry.entry_id}_leaderboard"
        self._attr_name = "Quizify Leaderboard"
        # Cache so the sensor keeps showing the last game's winner after the
        # game ends, rather than flipping to "idle" the moment it finishes.
        self._last_snapshot: dict[str, Any] = {
            "leader": None,
            "players": [],
            "join_code": None,
            "state": None,
        }

    @property
    def native_value(self) -> str:
        if self._active_session is not None:
            leader = self._top_player(self._active_session)
            if leader is not None:
                return leader.name
        # Fall back to the last known leader so the sensor isn't blank
        # between games.
        return self._last_snapshot.get("leader") or "idle"

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        session = self._active_session
        if session is not None:
            players = self._ranked_players(session)
            return {
                "players": players,
                "leader": players[0]["name"] if players else None,
                "join_code": session.join_code,
                "session_state": session.state,
                "question_index": (
                    session.current_index + 1
                    if session.current_index >= 0 else 0
                ),
                "total_questions": len(session.questions),
            }
        # No active session — show whatever we last saw.
        return {
            "players": self._last_snapshot.get("players", []),
            "leader": self._last_snapshot.get("leader"),
            "join_code": self._last_snapshot.get("join_code"),
            "session_state": self._last_snapshot.get("state"),
            "question_index": 0,
            "total_questions": 0,
        }

    # --- internal helpers -----------------------------------------------

    @staticmethod
    def _top_player(session: GameSession):
        if not session.players:
            return None
        return max(session.players.values(), key=lambda p: p.score)

    @staticmethod
    def _ranked_players(session: GameSession) -> list[dict[str, Any]]:
        ranked = sorted(
            session.players.values(),
            key=lambda p: (-p.score, p.joined_at),
        )
        return [
            {
                "rank": i + 1,
                "name": p.name,
                "score": p.score,
                "streak": p.streak,
                "best_streak": p.best_streak,
                "correct_count": p.correct_count,
            }
            for i, p in enumerate(ranked)
        ]

    # --- session lifecycle ----------------------------------------------

    def _on_session_attached(self, session: GameSession) -> None:
        # When a new game starts, clear the cached snapshot so old players
        # don't show up alongside the new game's players.
        self._last_snapshot = {
            "leader": None,
            "players": [],
            "join_code": session.join_code,
            "state": session.state,
        }

    def _on_session_ended(self, session: GameSession) -> None:
        # Freeze the final standings on the sensor so the dashboard can
        # show the winner after the game ends.
        leader = self._top_player(session)
        self._last_snapshot = {
            "leader": leader.name if leader else None,
            "players": self._ranked_players(session),
            "join_code": session.join_code,
            "state": "ended",
        }


class QuizifyCurrentSongSensor(_QuizifyEntityBase):
    """Sensor mirroring the currently-playing track on the game's speaker.

    The sensor tracks the configured ``music_player`` for the active
    session and updates whenever its media metadata changes — so the
    state reflects the song that's actually playing in the room, not
    just whatever was playing when the question started.
    """

    _attr_icon = "mdi:music-note"

    def __init__(self, manager, entry: ConfigEntry) -> None:
        super().__init__(manager, entry)
        self._attr_unique_id = f"{entry.entry_id}_current_song"
        self._attr_name = "Quizify Current Song"
        self._tracked_player: str | None = None
        self._unsub_state_listener = None

    @property
    def native_value(self) -> str | None:
        attrs = self._media_attrs()
        if attrs is None:
            return None
        title = attrs.get("media_title")
        return title if title else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        attrs = self._media_attrs() or {}
        return {
            "media_player": self._tracked_player,
            "artist": attrs.get("media_artist"),
            "album": attrs.get("media_album_name"),
            "media_content_type": attrs.get("media_content_type"),
            "duration": attrs.get("media_duration"),
            "media_position": attrs.get("media_position"),
            "app_name": attrs.get("app_name"),
            "entity_picture": attrs.get("entity_picture"),
        }

    # --- internal helpers -----------------------------------------------

    def _media_attrs(self) -> dict[str, Any] | None:
        if not self._tracked_player:
            return None
        state = self.hass.states.get(self._tracked_player)
        if state is None:
            return None
        return dict(state.attributes)

    # --- session lifecycle ----------------------------------------------

    def _on_session_attached(self, session: GameSession) -> None:
        """Attach to the session's music_player for state-change tracking."""
        player = session.settings.music_player
        self._set_tracked_player(player)

    def _on_session_ended(self, session: GameSession) -> None:
        """Stop tracking the speaker when the game ends."""
        self._set_tracked_player(None)

    def _set_tracked_player(self, entity_id: str | None) -> None:
        if entity_id == self._tracked_player:
            return
        # Tear down the previous subscription before swapping targets.
        if self._unsub_state_listener is not None:
            self._unsub_state_listener()
            self._unsub_state_listener = None
        self._tracked_player = entity_id
        if entity_id:
            self._unsub_state_listener = async_track_state_change_event(
                self.hass, [entity_id], self._on_media_state_change
            )

    @callback
    def _on_media_state_change(self, event: Event) -> None:
        """Push a new sensor state whenever the media player's state changes."""
        self.async_write_ha_state()

    async def async_will_remove_from_hass(self) -> None:
        """Make sure the media-player state listener is torn down too."""
        if self._unsub_state_listener is not None:
            self._unsub_state_listener()
            self._unsub_state_listener = None
        await super().async_will_remove_from_hass()
