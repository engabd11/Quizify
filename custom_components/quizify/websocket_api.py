"""WebSocket API for Quizify.

Uses Home Assistant's built-in websocket_api so we don't need to open any
new ports. Authenticated commands flow through the admin user; player
commands use a session-scoped token (the join code combined with a
player_id assigned at join time).
"""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import (
    CATEGORIES,
    DIFFICULTIES,
    MODES,
    WS_TYPE_ADMIN_SUBSCRIBE,
    WS_TYPE_GAME_CREATE,
    WS_TYPE_GAME_END,
    WS_TYPE_GAME_REMATCH,
    WS_TYPE_GAME_START,
    WS_TYPE_LIST_CATEGORIES,
    WS_TYPE_LIST_SPEAKERS,
    WS_TYPE_PLAYER_ANSWER,
    WS_TYPE_PLAYER_JOIN,
    WS_TYPE_PLAYER_SUBSCRIBE,
)
from .game import GameSettings
from .manager import QuizifyManager, get_manager

_LOGGER = logging.getLogger(__name__)


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    """Register all websocket commands."""
    websocket_api.async_register_command(hass, ws_list_categories)
    websocket_api.async_register_command(hass, ws_list_speakers)
    websocket_api.async_register_command(hass, ws_game_create)
    websocket_api.async_register_command(hass, ws_game_start)
    websocket_api.async_register_command(hass, ws_game_end)
    websocket_api.async_register_command(hass, ws_game_rematch)
    websocket_api.async_register_command(hass, ws_admin_subscribe)
    websocket_api.async_register_command(hass, ws_player_join)
    websocket_api.async_register_command(hass, ws_player_subscribe)
    websocket_api.async_register_command(hass, ws_player_answer)


def _manager(hass: HomeAssistant) -> QuizifyManager | None:
    return get_manager(hass)


# --- read-only commands -----------------------------------------------------


@websocket_api.websocket_command({vol.Required("type"): WS_TYPE_LIST_CATEGORIES})
@callback
def ws_list_categories(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return categories available per mode with question counts."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    result = {
        mode: mgr.bank.categories(mode) for mode in MODES
    }
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command({vol.Required("type"): WS_TYPE_LIST_SPEAKERS})
@callback
def ws_list_speakers(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return media players that can be used for background music."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    connection.send_result(msg["id"], {"speakers": mgr.list_speakers()})


# --- admin commands ---------------------------------------------------------


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_GAME_CREATE,
        vol.Required("mode"): vol.In(MODES),
        vol.Required("category"): vol.Any(vol.In(CATEGORIES), "random"),
        vol.Required("difficulty"): vol.In(DIFFICULTIES),
        vol.Optional("questions_per_round", default=10): vol.All(
            int, vol.Range(min=5, max=30)
        ),
        vol.Optional("question_time", default=20): vol.All(
            int, vol.Range(min=10, max=60)
        ),
        vol.Optional("music_player"): vol.Any(str, None),
        vol.Optional("music_uri"): vol.Any(str, None),
    }
)
@websocket_api.async_response
async def ws_game_create(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Create a new game session."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    settings = GameSettings(
        mode=msg["mode"],
        category=msg["category"],
        difficulty=msg["difficulty"],
        questions_per_round=msg["questions_per_round"],
        question_time=msg["question_time"],
        music_player=msg.get("music_player"),
        music_uri=msg.get("music_uri"),
    )
    session = mgr.create_session(settings)
    connection.send_result(
        msg["id"],
        {
            "session_id": session.session_id,
            "join_code": session.join_code,
            "game": session.to_dict(),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_GAME_START,
        vol.Required("session_id"): str,
    }
)
@websocket_api.async_response
async def ws_game_start(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Start a previously created session."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    session = mgr.get_session(msg["session_id"])
    if session is None:
        connection.send_error(msg["id"], "not_found", "Session not found")
        return
    await mgr.play_music(session)
    await session.start()
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_GAME_END,
        vol.Required("session_id"): str,
    }
)
@websocket_api.async_response
async def ws_game_end(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """End / cancel a session."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    await mgr.end_session(msg["session_id"])
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_GAME_REMATCH,
        vol.Required("session_id"): str,
    }
)
@websocket_api.async_response
async def ws_game_rematch(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Start a new game using the same settings and players."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    old = mgr.get_session(msg["session_id"])
    if old is None:
        connection.send_error(msg["id"], "not_found", "Session not found")
        return
    new_session = mgr.create_session(old.settings)
    # Carry players forward with reset scores.
    for player in old.players.values():
        new_player = new_session.add_player(player.name)
        # Preserve their identity for the client by replacing the auto id.
        # (Client will receive the new id and switch over.)
        _ = new_player
    connection.send_result(
        msg["id"],
        {
            "session_id": new_session.session_id,
            "join_code": new_session.join_code,
            "game": new_session.to_dict(),
        },
    )


# --- subscriptions ----------------------------------------------------------


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_ADMIN_SUBSCRIBE,
        vol.Required("session_id"): str,
    }
)
@websocket_api.async_response
async def ws_admin_subscribe(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Subscribe an admin to a session's events."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    session = mgr.get_session(msg["session_id"])
    if session is None:
        connection.send_error(msg["id"], "not_found", "Session not found")
        return

    async def forward(event: dict[str, Any]) -> None:
        connection.send_event(msg["id"], {**event, "game": session.to_dict(True)})

    unsubscribe = session.subscribe(forward)

    @callback
    def cancel() -> None:
        unsubscribe()

    connection.subscriptions[msg["id"]] = cancel
    connection.send_result(msg["id"])
    # Send initial state.
    connection.send_event(
        msg["id"],
        {"event": "snapshot", "game": session.to_dict(True)},
    )


# --- player commands (no auth required beyond the join_code) ---------------


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_PLAYER_JOIN,
        vol.Required("join_code"): str,
        vol.Required("name"): vol.All(str, vol.Length(min=1, max=30)),
    }
)
@websocket_api.async_response
async def ws_player_join(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Join a session by join code."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    session = mgr.get_by_join_code(msg["join_code"])
    if session is None:
        connection.send_error(msg["id"], "not_found", "No game with that code")
        return
    player = session.add_player(msg["name"])
    connection.send_result(
        msg["id"],
        {
            "player_id": player.player_id,
            "session_id": session.session_id,
            "name": player.name,
            "game": session.to_dict(),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_PLAYER_SUBSCRIBE,
        vol.Required("session_id"): str,
        vol.Required("player_id"): str,
    }
)
@websocket_api.async_response
async def ws_player_subscribe(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Subscribe a player to their game's events."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    session = mgr.get_session(msg["session_id"])
    if session is None or msg["player_id"] not in session.players:
        connection.send_error(msg["id"], "not_found", "Session or player not found")
        return

    player_id = msg["player_id"]

    async def forward(event: dict[str, Any]) -> None:
        # Players never see the correct answer until reveal.
        game_dict = session.to_dict(include_correct=False)
        connection.send_event(
            msg["id"],
            {
                **event,
                "game": game_dict,
                "you": session.players[player_id].to_dict()
                if player_id in session.players
                else None,
            },
        )

    unsubscribe = session.subscribe(forward)

    @callback
    def cancel() -> None:
        unsubscribe()

    connection.subscriptions[msg["id"]] = cancel
    connection.send_result(msg["id"])
    connection.send_event(
        msg["id"],
        {
            "event": "snapshot",
            "game": session.to_dict(False),
            "you": session.players[player_id].to_dict(),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_TYPE_PLAYER_ANSWER,
        vol.Required("session_id"): str,
        vol.Required("player_id"): str,
        vol.Required("answer"): int,
    }
)
@websocket_api.async_response
async def ws_player_answer(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Submit an answer for the current question."""
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    session = mgr.get_session(msg["session_id"])
    if session is None:
        connection.send_error(msg["id"], "not_found", "Session not found")
        return
    await session.submit_answer(msg["player_id"], msg["answer"])
    connection.send_result(msg["id"], {"ok": True})
