"""HTTP and WebSocket views for Quizify.

Two distinct concerns live here:

1. **Static assets and public landing pages** — the bundled React app at
   ``/quizify-static`` and a guest-friendly play page at ``/quizify/play``
   that requires no Home Assistant account. The page accepts the join code
   via the ``?code=ABCDEF`` query string. Legacy ``/quizify/join/ABCDEF``
   URLs (from older printed QR codes) redirect to the canonical form.

2. **An unauthenticated player WebSocket** at ``/api/quizify/player_ws``.
   Home Assistant's built-in ``websocket_api`` requires authentication for
   every connection, which makes it unusable for anonymous party guests.
   Rather than weaken HA's global socket, we expose a dedicated socket that
   only knows three messages (``join``, ``subscribe``, ``answer``) and only
   ever speaks to a single game session. Authentication is the join code —
   the same secret that's encoded in the QR poster.
"""
from __future__ import annotations

import asyncio
import io
import json
import logging
from pathlib import Path
from typing import Any

from aiohttp import WSMsgType, web
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import (
    JOIN_URL_PREFIX,
    PLAY_URL,
    PLAYER_WS_URL,
    STATIC_URL,
)
from .manager import get_manager

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIST = Path(__file__).parent / "frontend" / "dist"
FONTS_DIR = FRONTEND_DIST / "fonts"

# Entry-point HTML must never be cached by the browser, otherwise updates to
# the referenced JS/CSS never get picked up. Mirrors beatify's behaviour.
_NO_CACHE_HEADERS = {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
}


async def async_register_views(hass: HomeAssistant) -> None:
    """Register HTTP views and static asset paths."""
    if FRONTEND_DIST.exists():
        # cache_headers=False on the directory mount. The static bundle is
        # cache-busted by file mtime via aiohttp's own ETag, which is what
        # we want for /quizify-static. Forcing cache_headers=True on a
        # directory mount has triggered 500s on some HA versions; beatify
        # avoids the same flag for the same reason.
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    STATIC_URL,
                    str(FRONTEND_DIST),
                    cache_headers=False,
                )
            ]
        )
    else:
        _LOGGER.warning(
            "Quizify frontend not found at %s. Did the build run?",
            FRONTEND_DIST,
        )

    hass.http.register_view(QuizifyQRView)
    hass.http.register_view(QuizifyPlayView)
    hass.http.register_view(QuizifyJoinRedirectView)
    hass.http.register_view(QuizifyPlayerWSView())


# ---------------------------------------------------------------------------
# QR-code generator (public)
# ---------------------------------------------------------------------------


class QuizifyQRView(HomeAssistantView):
    """Generate a QR code PNG for a join URL.

    Public on purpose: a host wants to display the QR on a TV or printout
    before anyone has signed in.
    """

    url = "/api/quizify/qr"
    name = "api:quizify:qr"
    requires_auth = False

    # Limit the data we'll encode to a sane length; QR codes top out at
    # ~2.9 KB but anything larger here is almost certainly abuse.
    MAX_LEN = 512

    async def get(self, request: web.Request) -> web.Response:
        data = request.query.get("data", "")
        if not data:
            return web.Response(status=400, text="missing 'data' parameter")
        if len(data) > self.MAX_LEN:
            return web.Response(status=400, text="'data' too long")

        hass: HomeAssistant = request.app["hass"]

        def _make() -> bytes:
            import qrcode

            qr = qrcode.QRCode(
                version=None,
                error_correction=qrcode.constants.ERROR_CORRECT_M,
                box_size=12,
                border=2,
            )
            qr.add_data(data)
            qr.make(fit=True)
            img = qr.make_image(fill_color="#0f172a", back_color="#ffffff")
            buf = io.BytesIO()
            img.save(buf, format="PNG")
            return buf.getvalue()

        png = await hass.async_add_executor_job(_make)
        return web.Response(
            body=png,
            content_type="image/png",
            headers={"Cache-Control": "public, max-age=300"},
        )


# ---------------------------------------------------------------------------
# Public play landing page (guest-facing SPA shell)
# ---------------------------------------------------------------------------


class QuizifyPlayView(HomeAssistantView):
    """Serve the guest play page at ``/quizify/play?code=ABCDEF``.

    The page is a tiny HTML shell that boots the React bundle in *player*
    mode. The bundle then reads the join code from ``window.location.search``
    and opens a connection to the unauthenticated player WebSocket; no Home
    Assistant account is required.

    This mirrors beatify's ``/beatify/play?game=...`` pattern, which has
    proven robust in production. Using a fixed path with a query parameter
    avoids the path-parameter routing quirks that caused 500s on some HA
    versions when the join code lived in the URL path.
    """

    url = PLAY_URL
    name = "quizify:play"
    requires_auth = False

    async def get(self, request: web.Request) -> web.Response:
        # Only forward characters from the join-code alphabet; anything else
        # is dropped before the value reaches the page. The client-side code
        # also re-validates, but sanitising server-side keeps malicious data
        # out of the embedded HTML attribute entirely.
        raw = request.query.get("code", "")
        sanitized = "".join(c for c in raw.upper() if c.isalnum())[:6]
        try:
            body = _render_player_shell(sanitized)
        except Exception:  # pragma: no cover - defensive
            _LOGGER.exception("Failed to render player shell")
            return web.Response(
                status=500,
                text="Quizify could not render the player page.",
                content_type="text/plain",
            )
        return web.Response(text=body, content_type="text/html",
                            charset="utf-8", headers=_NO_CACHE_HEADERS)


class QuizifyJoinRedirectView(HomeAssistantView):
    """Backward-compatibility redirect from ``/quizify/join/CODE`` to ``/quizify/play?code=CODE``.

    Earlier versions of Quizify printed QR codes that encoded the
    path-parameter form. This view keeps those QR codes working forever
    by issuing a 302 to the new canonical URL.
    """

    url = f"{JOIN_URL_PREFIX}/{{join_code}}"
    name = "quizify:join_redirect"
    requires_auth = False

    async def get(self, request: web.Request) -> web.Response:
        raw = request.match_info.get("join_code", "")
        sanitized = "".join(c for c in raw.upper() if c.isalnum())[:6]
        target = f"{PLAY_URL}?code={sanitized}" if sanitized else PLAY_URL
        raise web.HTTPFound(location=target)


def _render_player_shell(join_code: str) -> str:
    """Render the HTML shell that boots the React app in player mode.

    The ``data-join-code`` attribute is retained as a belt-and-braces hint
    so the bundle can fall back to it if it can't read the query string for
    any reason; the primary source of truth is ``window.location.search``.
    """
    # All dynamic values are JSON-encoded so HTML-special characters cannot
    # break out of the attribute even with a hostile join code.
    return (
        "<!DOCTYPE html>\n"
        '<html lang="en">\n'
        "<head>\n"
        '<meta charset="utf-8" />\n'
        '<meta name="viewport" '
        'content="width=device-width, initial-scale=1, viewport-fit=cover" />\n'
        '<meta name="theme-color" content="#0b1020" />\n'
        '<meta name="robots" content="noindex" />\n'
        "<title>Quizify</title>\n"
        f'<link rel="stylesheet" href="{STATIC_URL}/quizify.css" />\n'
        "</head>\n"
        '<body>\n'
        '<div id="quizify-root"\n'
        '     data-view="player"\n'
        f'     data-join-code={json.dumps(join_code)}></div>\n'
        f'<script type="module" src="{STATIC_URL}/quizify.js"></script>\n'
        "</body>\n"
        "</html>\n"
    )


# ---------------------------------------------------------------------------
# Unauthenticated player WebSocket
# ---------------------------------------------------------------------------


class QuizifyPlayerWSView(HomeAssistantView):
    """Anonymous WebSocket for guest players.

    Protocol (all messages are JSON objects with a ``type``):

    Client -> server
        {"type": "join", "join_code": "ABCDEF", "name": "Alice"}
        {"type": "resume", "session_id": "...", "player_token": "..."}
        {"type": "answer", "answer": 2}
        {"type": "leave"}
        {"type": "ping"}

    Server -> client
        {"event": "joined", "player_id": "...", "player_token": "...",
         "session_id": "...", "name": "Alice", "game": {...}}
        {"event": "resumed", ...same shape as joined}
        {"event": "snapshot" | "question" | "reveal" | "scoreboard"
                 | "game_ended" | "player_joined" | "player_answered",
         "game": {...}, "you": {...} | null, ...event-specific fields}
        {"event": "error", "code": "...", "message": "..."}
        {"event": "pong"}

    The socket is bound to a single (session, player) pair after a
    successful ``join`` or ``resume`` message. There is no HA-level auth;
    the guarantees we make are:

    * Players can only see and act on the session their join_code grants
      access to.
    * Players never see the correct answer until reveal.
    * A player's ``player_token`` is required to resume the same identity
      after a disconnect.
    """

    url = PLAYER_WS_URL
    name = "api:quizify:player_ws"
    requires_auth = False

    # Cap per-connection inbound message size to keep guests from sending
    # multi-megabyte payloads. ~16 KB is more than any legitimate frame.
    MAX_MSG_SIZE = 16 * 1024

    # Soft rate limit (msgs/sec window) for player input. Anything beyond
    # this is dropped with a warning. Generous because answer-bursts in the
    # last second of a question are legitimate.
    RATE_LIMIT_BURST = 20
    RATE_LIMIT_WINDOW = 5.0

    async def get(self, request: web.Request) -> web.WebSocketResponse:
        hass: HomeAssistant = request.app["hass"]
        ws = web.WebSocketResponse(
            max_msg_size=self.MAX_MSG_SIZE,
            heartbeat=30,
        )
        await ws.prepare(request)

        manager = get_manager(hass)
        if manager is None:
            await _ws_send(ws, {"event": "error", "code": "not_ready",
                                "message": "Quizify is not initialised"})
            await ws.close()
            return ws

        bound: dict[str, Any] = {"session_id": None, "player_id": None,
                                 "unsubscribe": None}
        msg_times: list[float] = []

        async def forward(event: dict[str, Any]) -> None:
            """Forward a game event to this player's socket."""
            session = manager.get_session(bound["session_id"]) if bound["session_id"] else None
            if session is None:
                return
            pid = bound["player_id"]
            game_dict = session.to_dict(include_correct=False)
            payload = {
                **event,
                "game": game_dict,
                "you": session.players[pid].to_dict()
                if pid and pid in session.players
                else None,
            }
            await _ws_send(ws, payload)

        try:
            async for msg in ws:
                if msg.type == WSMsgType.ERROR:
                    _LOGGER.debug("Player WS error: %s", ws.exception())
                    break
                if msg.type != WSMsgType.TEXT:
                    continue

                # Rate limit
                now = asyncio.get_running_loop().time()
                msg_times.append(now)
                # Drop times outside the window
                msg_times[:] = [
                    t for t in msg_times if now - t <= self.RATE_LIMIT_WINDOW
                ]
                if len(msg_times) > self.RATE_LIMIT_BURST:
                    await _ws_send(ws, {"event": "error", "code": "rate_limited",
                                        "message": "Slow down"})
                    continue

                try:
                    data = json.loads(msg.data)
                except (TypeError, ValueError):
                    await _ws_send(ws, {"event": "error",
                                        "code": "bad_json",
                                        "message": "Malformed JSON"})
                    continue
                if not isinstance(data, dict):
                    continue

                msg_type = data.get("type")
                try:
                    if msg_type == "ping":
                        await _ws_send(ws, {"event": "pong"})
                    elif msg_type == "join":
                        await self._handle_join(
                            manager, ws, data, bound, forward
                        )
                    elif msg_type == "resume":
                        await self._handle_resume(
                            manager, ws, data, bound, forward
                        )
                    elif msg_type == "answer":
                        await self._handle_answer(manager, ws, data, bound)
                    elif msg_type == "leave":
                        break
                    else:
                        await _ws_send(ws, {"event": "error",
                                            "code": "unknown_type",
                                            "message": f"Unknown type {msg_type!r}"})
                except Exception:  # pragma: no cover - defensive
                    _LOGGER.exception("Player WS handler crashed")
                    await _ws_send(ws, {"event": "error",
                                        "code": "internal",
                                        "message": "Internal error"})
        finally:
            unsubscribe = bound.get("unsubscribe")
            if unsubscribe:
                try:
                    unsubscribe()
                except Exception:
                    _LOGGER.debug("Unsubscribe raised", exc_info=True)
            if not ws.closed:
                await ws.close()
        return ws

    # ----- handlers --------------------------------------------------------

    @staticmethod
    async def _handle_join(
        manager,
        ws: web.WebSocketResponse,
        data: dict[str, Any],
        bound: dict[str, Any],
        forward,
    ) -> None:
        if bound["session_id"] is not None:
            await _ws_send(ws, {"event": "error", "code": "already_joined",
                                "message": "Already joined"})
            return
        join_code = str(data.get("join_code", "")).strip().upper()
        name = str(data.get("name", "")).strip()
        if not join_code or not name:
            await _ws_send(ws, {"event": "error", "code": "bad_request",
                                "message": "join_code and name are required"})
            return
        if len(name) > 30:
            name = name[:30]

        session = manager.get_by_join_code(join_code)
        if session is None:
            await _ws_send(ws, {"event": "error", "code": "not_found",
                                "message": "No game with that code"})
            return

        player = session.add_player(name)
        token = manager.issue_player_token(session.session_id, player.player_id)

        bound["session_id"] = session.session_id
        bound["player_id"] = player.player_id
        bound["unsubscribe"] = session.subscribe(forward)

        await _ws_send(ws, {
            "event": "joined",
            "player_id": player.player_id,
            "player_token": token,
            "session_id": session.session_id,
            "name": player.name,
            "game": session.to_dict(include_correct=False),
            "you": player.to_dict(),
        })

    @staticmethod
    async def _handle_resume(
        manager,
        ws: web.WebSocketResponse,
        data: dict[str, Any],
        bound: dict[str, Any],
        forward,
    ) -> None:
        if bound["session_id"] is not None:
            await _ws_send(ws, {"event": "error", "code": "already_joined",
                                "message": "Already joined"})
            return
        session_id = str(data.get("session_id", ""))
        token = str(data.get("player_token", ""))
        if not session_id or not token:
            await _ws_send(ws, {"event": "error", "code": "bad_request",
                                "message": "session_id and player_token required"})
            return
        verified = manager.verify_player_token(token, session_id)
        if not verified:
            await _ws_send(ws, {"event": "error", "code": "invalid_token",
                                "message": "Session expired"})
            return
        session = manager.get_session(session_id)
        if session is None or verified not in session.players:
            await _ws_send(ws, {"event": "error", "code": "not_found",
                                "message": "Session no longer exists"})
            return

        player = session.players[verified]
        bound["session_id"] = session_id
        bound["player_id"] = verified
        bound["unsubscribe"] = session.subscribe(forward)

        await _ws_send(ws, {
            "event": "resumed",
            "player_id": player.player_id,
            "player_token": token,
            "session_id": session.session_id,
            "name": player.name,
            "game": session.to_dict(include_correct=False),
            "you": player.to_dict(),
        })

    @staticmethod
    async def _handle_answer(
        manager,
        ws: web.WebSocketResponse,
        data: dict[str, Any],
        bound: dict[str, Any],
    ) -> None:
        if bound["session_id"] is None:
            await _ws_send(ws, {"event": "error", "code": "not_joined",
                                "message": "Join first"})
            return
        answer = data.get("answer")
        if not isinstance(answer, int) or answer < 0 or answer > 5:
            await _ws_send(ws, {"event": "error", "code": "bad_request",
                                "message": "answer must be an integer 0-5"})
            return
        session = manager.get_session(bound["session_id"])
        if session is None:
            await _ws_send(ws, {"event": "error", "code": "not_found",
                                "message": "Session ended"})
            return
        await session.submit_answer(bound["player_id"], answer)


async def _ws_send(ws: web.WebSocketResponse, payload: dict[str, Any]) -> None:
    """Send JSON to a WebSocket, swallowing connection-closed errors."""
    if ws.closed:
        return
    try:
        await ws.send_json(payload)
    except ConnectionResetError:
        pass
    except Exception:
        _LOGGER.debug("Failed to send WS message", exc_info=True)
