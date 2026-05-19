"""Admin WebSocket API for Quizify.

Admin commands ride Home Assistant's built-in ``websocket_api`` so they
inherit HA's auth, replay protection, and rate-limiting. Guest players use
the dedicated unauthenticated socket exposed by ``http_views``; they do
not appear here.

Commands:
    quizify/categories/list      -> {adults: [...], kids: [...]}
    quizify/speakers/list        -> {speakers: [...]}
    quizify/game/create          -> {session_id, join_code, game}
    quizify/game/start           -> {ok: true}
    quizify/game/end             -> {ok: true}
    quizify/game/rematch         -> {session_id, join_code, game}
    quizify/admin/subscribe      -> stream of game events
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
)
from .game import GameSettings
from .manager import QuizifyManager, get_manager

_LOGGER = logging.getLogger(__name__)


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    """Register all admin websocket commands."""
    websocket_api.async_register_command(hass, ws_list_categories)
    websocket_api.async_register_command(hass, ws_list_speakers)
    websocket_api.async_register_command(hass, ws_game_create)
    websocket_api.async_register_command(hass, ws_game_start)
    websocket_api.async_register_command(hass, ws_game_end)
    websocket_api.async_register_command(hass, ws_game_rematch)
    websocket_api.async_register_command(hass, ws_admin_subscribe)


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
    result = {mode: mgr.bank.categories(mode) for mode in MODES}
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
    """Start a new game using the same settings.

    Players are NOT carried forward server-side any more — the previous
    implementation issued them new IDs without telling them, which silently
    broke their identity on reconnect. Instead, the admin gets a fresh join
    code and players rescan the QR (or, if they're still on the join page,
    just type their name again).
    """
    mgr = _manager(hass)
    if mgr is None:
        connection.send_error(msg["id"], "not_ready", "Quizify is not initialised")
        return
    old = mgr.get_session(msg["session_id"])
    if old is None:
        connection.send_error(msg["id"], "not_found", "Session not found")
        return
    new_session = mgr.create_session(old.settings)
    # End the old session so the join code is freed and listeners detach.
    await mgr.end_session(msg["session_id"])
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
    connection.send_event(
        msg["id"],
        {"event": "snapshot", "game": session.to_dict(True)},
    )
