"""Config flow for Quizify (single-instance, no user config required)."""
from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow

from .const import DOMAIN

# ConfigFlowResult was introduced in HA 2024.3. Fall back to the generic
# FlowResult type so the integration loads on older versions too.
try:
    from homeassistant.config_entries import ConfigFlowResult
except ImportError:
    from homeassistant.data_entry_flow import FlowResult as ConfigFlowResult  # type: ignore[assignment]


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
