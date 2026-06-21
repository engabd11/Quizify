"""HTTP views and WebSocket handler for Quizify.

Architecture mirrors beatify exactly:

1. **Static assets** served with cache_headers=False.
2. **Player HTML page** at ``/quizify/play`` serves ``player.html`` from disk,
   matching beatify's PlayerView pattern.
3. **QR generator** at ``/api/quizify/qr``.
4. **Player WebSocket** registered as a raw aiohttp route via
   ``hass.http.app.router.add_get`` — NOT a HomeAssistantView.
   This is the key fix: HA's view middleware interferes with unauthenticated
   WebSocket upgrades, causing the 500 errors.
"""
from __future__ import annotations

import asyncio
import io
import json
import logging
import time
from pathlib import Path
from typing import Any

from aiohttp import WSMsgType, web
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import (
    JOIN_URL_PREFIX,
    MAX_PLAYER_NAME_LENGTH,
    MAX_SESSION_ID_LENGTH,
    MAX_TOKEN_LENGTH,
    PLAY_URL,
    PLAYER_WS_JOIN_TIMEOUT,
    PLAYER_WS_STRICT_ORIGIN,
    PLAYER_WS_URL,
    QR_RATE_LIMIT_REQUESTS,
    QR_RATE_LIMIT_WINDOW,
    STATIC_URL,
)
from .game import SessionFullError
from .manager import get_manager

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIST = Path(__file__).parent / "frontend" / "dist"

_NO_CACHE_HEADERS = {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    # Defensive security headers for the unauthenticated player page.
    # The page itself is small and contains no third-party assets, but
    # these mitigate a class of attacks if the integration is ever
    # exposed beyond the local network (reverse proxy, Cloudflare, etc.).
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
    "X-Frame-Options": "SAMEORIGIN",
    # CSP: scripts from same origin only (the quizify.js module);
    # unsafe-inline for styles because the JS bundle injects a <style>
    # tag dynamically (no nonce available at build time); WebSocket and
    # fetch connections to same origin (ws:/wss: covers the player socket);
    # images from same origin + data-URIs (for QR code display).
    "Content-Security-Policy": (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' data: blob:; "
        "connect-src 'self' ws: wss:; "
        "frame-ancestors 'self'"
    ),
}

_html_cache: dict[str, str] = {}


def _read_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


async def _get_html(hass: HomeAssistant, path: Path) -> str | None:
    key = str(path)
    if key in _html_cache:
        return _html_cache[key]
    if not path.exists():
        return None
    content = await hass.async_add_executor_job(_read_file, path)
    _html_cache[key] = content
    return content


def _html_response(text: str) -> web.Response:
    return web.Response(text=text, content_type="text/html",
                        charset="utf-8", headers=_NO_CACHE_HEADERS)


async def async_register_views(hass: HomeAssistant) -> None:
    """Register views, raw WS route, and static paths — matching beatify order."""
    hass.http.register_view(QuizifyQRView(hass))
    hass.http.register_view(QuizifyPlayView(hass))
    hass.http.register_view(QuizifyJoinRedirectView)

    ws_handler = QuizifyPlayerWSHandler(hass)
    hass.http.app.router.add_get(PLAYER_WS_URL, ws_handler.handle)

    if FRONTEND_DIST.exists():
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(FRONTEND_DIST), cache_headers=False)]
        )
    else:
        _LOGGER.warning("Quizify frontend not found at %s. Did the build run?",
                        FRONTEND_DIST)


# ---------------------------------------------------------------------------
# QR view
# ---------------------------------------------------------------------------

class QuizifyQRView(HomeAssistantView):
    url = "/api/quizify/qr"
    name = "api:quizify:qr"
    requires_auth = False
    MAX_LEN = 512

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        # Per-IP token bucket for the QR endpoint. PIL rendering runs on
        # the executor pool; a flood of requests could starve other HA
        # work. We sweep entries lazily on access.
        self._rate_buckets: dict[str, list[float]] = {}
        self._last_sweep: float = 0.0

    def _check_rate_limit(self, ip: str) -> bool:
        now = time.time()
        cutoff = now - QR_RATE_LIMIT_WINDOW
        # Periodic GC to stop the bucket dict from growing without bound on
        # an internet-exposed instance with many unique source IPs.
        if now - self._last_sweep > 300:
            self._rate_buckets = {
                k: [t for t in v if t > cutoff]
                for k, v in self._rate_buckets.items()
                if any(t > cutoff for t in v)
            }
            self._last_sweep = now
        times = [t for t in self._rate_buckets.get(ip, []) if t > cutoff]
        if len(times) >= QR_RATE_LIMIT_REQUESTS:
            self._rate_buckets[ip] = times
            return False
        times.append(now)
        self._rate_buckets[ip] = times
        return True

    async def get(self, request: web.Request) -> web.Response:
        client_ip = request.remote or "unknown"
        if not self._check_rate_limit(client_ip):
            return web.Response(status=429, text="Too many QR requests")
        data = request.query.get("data", "")
        if not data:
            return web.Response(status=400, text="missing 'data' parameter")
        if len(data) > self.MAX_LEN:
            return web.Response(status=400, text="'data' too long")

        def _make() -> bytes:
            import qrcode  # noqa: PLC0415
            qr = qrcode.QRCode(version=None,
                               error_correction=qrcode.constants.ERROR_CORRECT_M,
                               box_size=12, border=2)
            qr.add_data(data)
            qr.make(fit=True)
            img = qr.make_image(fill_color="#0f172a", back_color="#ffffff")
            buf = io.BytesIO()
            img.save(buf, format="PNG")
            return buf.getvalue()

        png = await self.hass.async_add_executor_job(_make)
        return web.Response(body=png, content_type="image/png",
                            headers={"Cache-Control": "public, max-age=300"})


# ---------------------------------------------------------------------------
# Player page — mirrors beatify's PlayerView exactly
# ---------------------------------------------------------------------------

class QuizifyPlayView(HomeAssistantView):
    """Serve player.html from disk. Join code is read from ?code= query string."""

    url = PLAY_URL
    name = "quizify:play"
    requires_auth = False

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request: web.Request) -> web.Response:  # noqa: ARG002
        html_path = FRONTEND_DIST / "player.html"
        html_content = await _get_html(self.hass, html_path)
        if html_content is None:
            _LOGGER.error("Player page not found: %s", html_path)
            return web.Response(text="Player page not found", status=404)
        return _html_response(html_content)


class QuizifyJoinRedirectView(HomeAssistantView):
    """302 redirect from old /quizify/join/CODE to /quizify/play?code=CODE."""

    url = f"{JOIN_URL_PREFIX}/{{join_code}}"
    name = "quizify:join_redirect"
    requires_auth = False

    async def get(self, request: web.Request, join_code: str = "") -> web.Response:
        # HA passes path-match variables as keyword args (see helpers/http.py).
        sanitized = "".join(c for c in join_code.upper() if c.isalnum())[:6]
        target = f"{PLAY_URL}?code={sanitized}" if sanitized else PLAY_URL
        raise web.HTTPFound(location=target)


# ---------------------------------------------------------------------------
# Player WebSocket — raw aiohttp handler, NOT HomeAssistantView
# ---------------------------------------------------------------------------

class QuizifyPlayerWSHandler:
    """Raw aiohttp WebSocket handler, registered via hass.http.app.router.

    Using HomeAssistantView for WebSocket endpoints causes HA middleware to
    intercept the Upgrade handshake for unauthenticated connections, returning
    500. The raw router bypasses all HA middleware. Beatify uses this same
    pattern for /beatify/ws.
    """

    MAX_MSG_SIZE = 16 * 1024
    RATE_LIMIT_BURST = 20
    RATE_LIMIT_WINDOW = 5.0
    RATE_LIMIT_CONNECTIONS = 10
    RATE_LIMIT_CONN_WINDOW = 60

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._connection_rate_limits: dict[str, list[float]] = {}
        self._last_rate_sweep: float = 0.0

    def _check_connection_rate_limit(self, ip: str) -> bool:
        now = time.time()
        cutoff = now - self.RATE_LIMIT_CONN_WINDOW
        if now - self._last_rate_sweep > 300:
            self._connection_rate_limits = {
                k: [t for t in v if t > cutoff]
                for k, v in self._connection_rate_limits.items()
                if any(t > cutoff for t in v)
            }
            self._last_rate_sweep = now
        times = [t for t in self._connection_rate_limits.get(ip, []) if t > cutoff]
        self._connection_rate_limits[ip] = times
        if len(times) >= self.RATE_LIMIT_CONNECTIONS:
            return False
        times.append(now)
        return True

    def _check_origin(self, request: web.Request) -> bool:
        """Default-deny Origin check for the player WebSocket.

        The player socket is unauthenticated — any browser on the LAN can
        connect by design (it's how guests join). But we don't want a
        malicious third-party website embedded in a phone tab opening
        connections to a known HA URL from anywhere on the internet. We
        accept connections that either:
          * have no Origin header (native apps, some QR launchers, curl), or
          * have an Origin matching the Host of the request (same-origin).

        Disable by setting ``PLAYER_WS_STRICT_ORIGIN = False`` in const.py.
        """
        if not PLAYER_WS_STRICT_ORIGIN:
            return True
        origin = request.headers.get("Origin")
        # No Origin header: typical for native apps, in-app QR readers,
        # and direct WS clients. Accept.
        if not origin:
            return True
        host = request.headers.get("Host", "")
        if not host:
            return False
        # Origin may be "https://example.com" or "https://example.com:8123";
        # Host is "example.com:8123" or just "example.com". Compare the
        # authority (host[:port]) only.
        try:
            from urllib.parse import urlparse  # noqa: PLC0415
            parsed = urlparse(origin)
            origin_authority = parsed.netloc.lower()
        except Exception:
            return False
        return origin_authority == host.lower()

    async def handle(self, request: web.Request) -> web.StreamResponse:
        client_ip = request.remote or "unknown"
        if not self._check_origin(request):
            _LOGGER.warning(
                "Rejecting player WS from disallowed Origin %r (ip=%s)",
                request.headers.get("Origin"), client_ip,
            )
            return web.Response(status=403, text="Origin not allowed")
        if not self._check_connection_rate_limit(client_ip):
            return web.Response(status=429, text="Too many connections")

        ws = web.WebSocketResponse(max_msg_size=self.MAX_MSG_SIZE, heartbeat=30)
        await ws.prepare(request)

        manager = get_manager(self.hass)
        if manager is None:
            await _ws_send(ws, {"event": "error", "code": "not_ready",
                                "message": "Quizify is not initialised"})
            await ws.close()
            return ws

        bound: dict[str, Any] = {"session_id": None, "player_id": None,
                                  "unsubscribe": None}
        msg_times: list[float] = []

        async def forward(event: dict[str, Any]) -> None:
            session = (manager.get_session(bound["session_id"])
                       if bound["session_id"] else None)
            if session is None:
                return
            pid = bound["player_id"]
            game_dict = session.to_dict(include_correct=False)
            payload = {
                **event,
                "game": game_dict,
                "you": session.players[pid].to_dict()
                if pid and pid in session.players else None,
            }
            await _ws_send(ws, payload)

        # Idle-join watchdog: if the client connects but never sends a
        # join/resume within PLAYER_WS_JOIN_TIMEOUT, drop the socket so a
        # bot can't hold open sockets indefinitely (heartbeats alone would
        # let them sit forever).
        async def _idle_join_watchdog() -> None:
            try:
                await asyncio.sleep(PLAYER_WS_JOIN_TIMEOUT)
            except asyncio.CancelledError:
                return
            if bound["session_id"] is None and not ws.closed:
                _LOGGER.debug(
                    "Closing idle player WS (no join within %ss) ip=%s",
                    PLAYER_WS_JOIN_TIMEOUT, client_ip,
                )
                try:
                    await _ws_send(ws, {"event": "error", "code": "idle_timeout",
                                        "message": "No join received"})
                except Exception:
                    pass
                await ws.close()

        idle_task = asyncio.create_task(_idle_join_watchdog())

        try:
            async for msg in ws:
                if msg.type == WSMsgType.ERROR:
                    _LOGGER.debug("Player WS error: %s", ws.exception())
                    break
                if msg.type != WSMsgType.TEXT:
                    continue

                now = asyncio.get_running_loop().time()
                msg_times.append(now)
                msg_times[:] = [t for t in msg_times
                                 if now - t <= self.RATE_LIMIT_WINDOW]
                if len(msg_times) >= self.RATE_LIMIT_BURST:
                    await _ws_send(ws, {"event": "error", "code": "rate_limited",
                                        "message": "Slow down"})
                    continue

                try:
                    data = json.loads(msg.data)
                except (TypeError, ValueError):
                    await _ws_send(ws, {"event": "error", "code": "bad_json",
                                        "message": "Malformed JSON"})
                    continue
                if not isinstance(data, dict):
                    continue

                msg_type = data.get("type")
                try:
                    if msg_type == "ping":
                        await _ws_send(ws, {"event": "pong"})
                    elif msg_type == "join":
                        await _handle_join(manager, ws, data, bound, forward)
                    elif msg_type == "resume":
                        await _handle_resume(manager, ws, data, bound, forward)
                    elif msg_type == "answer":
                        await _handle_answer(manager, ws, data, bound)
                    elif msg_type == "peek_answer":
                        await _handle_peek_answer(manager, ws, bound)
                    elif msg_type == "lifeline":
                        await _handle_lifeline(manager, ws, data, bound)
                    elif msg_type == "pause":
                        await _handle_pause(manager, ws, bound)
                    elif msg_type == "resume_game":
                        await _handle_resume_game(manager, ws, bound)
                    elif msg_type == "leave":
                        break
                    else:
                        await _ws_send(ws, {"event": "error",
                                            "code": "unknown_type",
                                            "message": f"Unknown type {msg_type!r}"})
                except Exception:  # pragma: no cover
                    _LOGGER.exception("Player WS handler crashed")
                    await _ws_send(ws, {"event": "error", "code": "internal",
                                        "message": "Internal error"})
        finally:
            # Tear down the idle-join watchdog regardless of how we exited.
            idle_task.cancel()
            try:
                await idle_task
            except (asyncio.CancelledError, Exception):
                pass
            unsubscribe = bound.get("unsubscribe")
            if unsubscribe:
                try:
                    unsubscribe()
                except Exception:
                    _LOGGER.debug("Unsubscribe raised", exc_info=True)
            if not ws.closed:
                await ws.close()

        return ws


# ---------------------------------------------------------------------------
# Protocol handlers
# ---------------------------------------------------------------------------

async def _handle_join(manager, ws, data, bound, forward):
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
    # Reject obviously absurd input lengths before doing any session lookup.
    if len(join_code) > 16 or len(name) > 200:
        await _ws_send(ws, {"event": "error", "code": "bad_request",
                            "message": "Input too long"})
        return
    # The server-side add_player applies the canonical name sanitization +
    # length cap; the soft trim here is just a quick guard.
    if len(name) > MAX_PLAYER_NAME_LENGTH:
        name = name[:MAX_PLAYER_NAME_LENGTH]
    session = manager.get_by_join_code(join_code)
    if session is None:
        await _ws_send(ws, {"event": "error", "code": "not_found",
                            "message": "No game with that code"})
        return
    try:
        player = session.add_player(name)
    except SessionFullError as err:
        await _ws_send(ws, {"event": "error", "code": "session_full",
                            "message": str(err)})
        return
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


async def _handle_resume(manager, ws, data, bound, forward):
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
    # Defense-in-depth: reject oversize inputs before HMAC work. The
    # 16KB WS frame cap already bounds this but explicit limits document
    # intent and catch any future framing changes.
    if (
        len(session_id) > MAX_SESSION_ID_LENGTH
        or len(token) > MAX_TOKEN_LENGTH
    ):
        await _ws_send(ws, {"event": "error", "code": "bad_request",
                            "message": "Token or session_id too long"})
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


async def _handle_answer(manager, ws, data, bound):
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


async def _handle_peek_answer(manager, ws, bound):
    """Lifeline: reveal the correct answer index to the requesting player only.

    Server-enforced once-per-game: the player's ``peek_answer_used`` flag is
    checked and set here so a malicious or buggy client cannot reveal more
    than once per session.
    """
    if bound["session_id"] is None:
        await _ws_send(ws, {"event": "error", "code": "not_joined",
                            "message": "Join first"})
        return
    session = manager.get_session(bound["session_id"])
    if session is None:
        await _ws_send(ws, {"event": "error", "code": "not_found",
                            "message": "Session ended"})
        return
    player = session.players.get(bound["player_id"])
    if player is None:
        await _ws_send(ws, {"event": "peek_result", "correct": None,
                            "message": "Player not in session"})
        return
    if player.peek_answer_used:
        await _ws_send(ws, {"event": "peek_result", "correct": None,
                            "message": "Already used"})
        return
    from .const import STATE_QUESTION
    if session.state != STATE_QUESTION:
        await _ws_send(ws, {"event": "peek_result", "correct": None,
                            "message": "Not in question phase"})
        return
    if session.current_index < 0 or session.current_index >= len(session.questions):
        await _ws_send(ws, {"event": "peek_result", "correct": None})
        return
    correct = session.questions[session.current_index]["correct"]
    # Try to deliver the result first; only mark the lifeline used if the
    # client actually got it. A blip during send shouldn't burn the
    # one-per-game lifeline silently.
    sent = await _ws_send(ws, {"event": "peek_result", "correct": correct})
    if sent:
        player.peek_answer_used = True


async def _handle_lifeline(manager, ws, data, bound):
    """Arm a per-question lifeline server-side so scoring honours it."""
    if bound["session_id"] is None:
        await _ws_send(ws, {"event": "error", "code": "not_joined",
                            "message": "Join first"})
        return
    lifeline = str(data.get("lifeline", "")).strip()
    if lifeline not in ("double_points",):
        await _ws_send(ws, {"event": "error", "code": "bad_request",
                            "message": "Unknown lifeline"})
        return
    session = manager.get_session(bound["session_id"])
    if session is None:
        await _ws_send(ws, {"event": "error", "code": "not_found",
                            "message": "Session ended"})
        return
    ok = await session.arm_lifeline(bound["player_id"], lifeline)
    await _ws_send(ws, {
        "event": "lifeline_result",
        "lifeline": lifeline,
        "armed": ok,
    })


async def _handle_pause(manager, ws, bound):
    """Player-initiated pause. Pauses the game for everyone."""
    if bound["session_id"] is None:
        await _ws_send(ws, {"event": "error", "code": "not_joined",
                            "message": "Join first"})
        return
    session = manager.get_session(bound["session_id"])
    if session is None:
        await _ws_send(ws, {"event": "error", "code": "not_found",
                            "message": "Session ended"})
        return
    await session.pause(initiated_by=bound["player_id"])


async def _handle_resume_game(manager, ws, bound):
    """Player-initiated resume. Any player can lift the pause."""
    if bound["session_id"] is None:
        await _ws_send(ws, {"event": "error", "code": "not_joined",
                            "message": "Join first"})
        return
    session = manager.get_session(bound["session_id"])
    if session is None:
        await _ws_send(ws, {"event": "error", "code": "not_found",
                            "message": "Session ended"})
        return
    await session.resume_game(initiated_by=bound["player_id"])


async def _ws_send(ws: web.WebSocketResponse,
                   payload: dict[str, Any]) -> bool:
    """Send a JSON message; return True iff it was delivered.

    Returning a status lets callers (e.g. the peek lifeline) avoid burning
    a one-shot side-effect when the client's connection just died.
    """
    if ws.closed:
        return False
    try:
        await ws.send_json(payload)
        return True
    except ConnectionResetError:
        return False
    except Exception:
        _LOGGER.debug("Failed to send WS message", exc_info=True)
        return False
