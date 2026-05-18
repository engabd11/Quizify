"""Config flow for Quizify (single-instance, no user config required)."""
from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN


class QuizifyConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the (very simple) Quizify setup flow."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the user step. We don't need any input; one entry is enough."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        return self.async_create_entry(title="Quizify", data={})
