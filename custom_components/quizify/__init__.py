"""The Quizify integration."""
from __future__ import annotations

import logging

from homeassistant.components import frontend
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PANEL_ICON, PANEL_TITLE, PANEL_URL
from .http_views import async_register_views
from .manager import QuizifyManager
from .websocket_api import async_register_commands

_LOGGER = logging.getLogger(__name__)
PLATFORMS: list[Platform] = []


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the Quizify integration (YAML not supported, config flow only)."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Quizify from a config entry."""
    manager = QuizifyManager(hass)
    await manager.async_setup()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = manager

    # Register WebSocket commands & HTTP views once.
    if not hass.data[DOMAIN].get("_registered"):
        async_register_commands(hass)
        await async_register_views(hass)
        # Register the sidebar panel pointing at the admin URL.
        frontend.async_register_built_in_panel(
            hass,
            component_name="iframe",
            sidebar_title=PANEL_TITLE,
            sidebar_icon=PANEL_ICON,
            frontend_url_path=PANEL_URL.lstrip("/"),
            config={"url": "/quizify/admin"},
            require_admin=False,
        )
        hass.data[DOMAIN]["_registered"] = True

    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    manager: QuizifyManager | None = hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    if manager:
        for session in list(manager.list_sessions()):
            await manager.end_session(session.session_id)

    # If no entries remain, remove the panel.
    remaining = [
        k for k in hass.data.get(DOMAIN, {}).keys() if not k.startswith("_")
    ]
    if not remaining:
        try:
            frontend.async_remove_panel(hass, PANEL_URL.lstrip("/"))
        except Exception:  # panel may already be gone
            pass
        hass.data[DOMAIN].pop("_registered", None)

    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle options update by reloading."""
    await hass.config_entries.async_reload(entry.entry_id)
