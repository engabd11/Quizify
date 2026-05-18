"""HTTP views: QR code generator and static frontend serving.

The bundled React app is built into `frontend/dist/` and served from
`/quizify-static/`. The QR code view generates a PNG on the fly so we
don't need a separate library on the client.
"""
from __future__ import annotations

import io
import logging
from pathlib import Path

from aiohttp import web
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.core import HomeAssistant


_LOGGER = logging.getLogger(__name__)

FRONTEND_DIST = Path(__file__).parent / "frontend" / "dist"
STATIC_URL = "/quizify-static"


async def async_register_views(hass: HomeAssistant) -> None:
    """Register HTTP views and static paths."""
    if FRONTEND_DIST.exists():
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
    hass.http.register_view(QuizifyJoinView)
    hass.http.register_view(QuizifyIndexView())


class QuizifyQRView(HomeAssistantView):
    """Generate a QR code PNG for a join URL."""

    url = "/api/quizify/qr"
    name = "api:quizify:qr"
    requires_auth = False  # QR is intentionally public for guest scanning

    async def get(self, request: web.Request) -> web.Response:
        data = request.query.get("data")
        if not data:
            return web.Response(status=400, text="missing 'data' parameter")
        # Generate off the event loop.
        import qrcode

        def _make() -> bytes:
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

        png = await request.app["hass"].async_add_executor_job(_make)
        return web.Response(
            body=png,
            content_type="image/png",
            headers={"Cache-Control": "public, max-age=300"},
        )


class QuizifyJoinView(HomeAssistantView):
    """Public guest join landing page (renders the SPA shell for /quizify/join)."""

    url = "/quizify/join/{join_code}"
    name = "quizify:join"
    requires_auth = False

    async def get(self, request: web.Request) -> web.Response:
        join_code = request.match_info.get("join_code", "").upper()
        return web.Response(text=_render_shell("player", join_code), content_type="text/html")


class QuizifyIndexView(HomeAssistantView):
    """Admin shell (auth required) at /quizify/admin."""

    url = "/quizify/admin"
    name = "quizify:admin"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        return web.Response(text=_render_shell("admin", ""), content_type="text/html")


def _render_shell(view: str, join_code: str) -> str:
    """Render the HTML shell that boots the React app."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0b1020" />
<title>Quizify</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="{STATIC_URL}/quizify.css" />
</head>
<body>
<div id="quizify-root"
     data-view="{view}"
     data-join-code="{join_code}"></div>
<script type="module" src="{STATIC_URL}/quizify.js"></script>
</body>
</html>"""
