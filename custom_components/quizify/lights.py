"""Party Lights service for Quizify — trivia-themed mood lighting.

Adopts proven patterns from Beatify (capability detection, WLED presets,
intensity levels, beat loop, celebration sequence, state save/restore)
with Quizify-specific phase colours for trivia gameplay.
"""

from __future__ import annotations

import asyncio
import logging
from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError, ServiceNotFound

from .const import (
    STATE_ANNOUNCING,
    STATE_ENDED,
    STATE_LOBBY,
    STATE_QUESTION,
    STATE_REVEAL,
    STATE_SCOREBOARD,
)

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Phase colours — trivia-themed
# ---------------------------------------------------------------------------

PHASE_COLORS: dict[str, dict[str, Any]] = {
    STATE_LOBBY:      {"rgb_color": [147, 112, 219], "brightness": 102},  # purple
    STATE_ANNOUNCING: {"rgb_color": [0, 180, 255],   "brightness": 128},  # cyan
    STATE_QUESTION:   {"rgb_color": [0, 100, 255],   "brightness": 153},  # blue
    STATE_REVEAL:     {"rgb_color": [0, 200, 100],   "brightness": 204},  # green
    STATE_SCOREBOARD: {"rgb_color": [255, 140, 0],   "brightness": 180},  # orange
    STATE_ENDED:      {"color_temp_kelvin": 3000,     "brightness": 255},  # warm white
}

FLASH_COLORS: dict[str, list[int]] = {
    "gold":   [255, 215, 0],
    "green":  [0, 255, 0],
    "red":    [255, 0, 0],
    "orange": [255, 165, 0],
    "purple": [147, 112, 219],
    "cyan":   [0, 180, 255],
}

RAINBOW_COLORS: list[list[int]] = [
    [255, 0, 0], [255, 127, 0], [255, 255, 0],
    [0, 255, 0], [0, 0, 255], [75, 0, 130], [148, 0, 211],
]

BEAT_COLORS: list[list[int]] = [
    [0, 100, 255], [0, 180, 255], [0, 60, 200],
]

INTENSITY_PRESETS: dict[str, dict[str, float]] = {
    "subtle": {"brightness_scale": 0.6, "flash_duration": 0.8},
    "medium": {"brightness_scale": 1.0, "flash_duration": 0.5},
    "party":  {"brightness_scale": 1.0, "flash_duration": 0.3},
}

WLED_PRESET_DEFAULTS: dict[str, int] = {
    STATE_LOBBY: 1, STATE_QUESTION: 2, STATE_REVEAL: 3,
    STATE_SCOREBOARD: 4, STATE_ENDED: 5,
}


@dataclass
class _SavedLightState:
    """Snapshot of a light before the game takes it over."""
    entity_id: str
    state: str
    brightness: int | None = None
    rgb_color: tuple[int, ...] | None = None
    color_temp_kelvin: int | None = None
    effect: str | None = None

    @classmethod
    def from_ha_state(cls, entity_id: str, state_obj: Any) -> "_SavedLightState":
        attrs = state_obj.attributes
        return cls(
            entity_id=entity_id, state=state_obj.state,
            brightness=attrs.get("brightness"),
            rgb_color=(
                tuple(attrs["rgb_color"])
                if isinstance(attrs.get("rgb_color"), (list, tuple)) else None
            ),
            color_temp_kelvin=attrs.get("color_temp_kelvin"),
            effect=attrs.get("effect"),
        )


class QuizifyLights:
    """Trivia-themed lighting control for Quizify games."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._entity_ids: list[str] = []
        self._intensity: str = "medium"
        self._light_mode: str = "dynamic"
        self._wled_presets: dict[str, int] = dict(WLED_PRESET_DEFAULTS)
        self._wled_entities: set[str] = set()
        self._saved_states: dict[str, _SavedLightState] = {}
        self._active: bool = False
        self._current_phase: str | None = None
        self._beat_task: asyncio.Task | None = None
        self._base_brightness: int = 128

    async def start(
        self, entity_ids: list[str], intensity: str = "medium",
        light_mode: str = "dynamic", wled_presets: dict[str, int] | None = None,
    ) -> None:
        """Save current light states and take control."""
        if not entity_ids:
            return
        self._entity_ids = list(entity_ids)
        self._intensity = intensity if intensity in INTENSITY_PRESETS else "medium"
        self._light_mode = (
            light_mode if light_mode in ("static", "dynamic", "wled") else "dynamic"
        )
        if wled_presets:
            self._wled_presets.update(wled_presets)
        self._wled_entities = self._detect_wled_entities()
        self._saved_states = {}
        for eid in self._entity_ids:
            state_obj = self._hass.states.get(eid)
            if state_obj:
                self._saved_states[eid] = _SavedLightState.from_ha_state(eid, state_obj)
        brightnesses = [
            s.brightness for s in self._saved_states.values()
            if s.state != "off" and s.brightness is not None
        ]
        self._base_brightness = int(sum(brightnesses) / len(brightnesses)) if brightnesses else 128
        self._active = True
        _LOGGER.info(
            "Quizify Lights started: %d lights, intensity=%s, mode=%s",
            len(self._entity_ids), self._intensity, self._light_mode,
        )

    async def set_phase(self, phase: str) -> None:
        """Apply phase-appropriate colours/brightness."""
        if not self._active or not self._entity_ids:
            return
        self._current_phase = phase
        if phase not in (STATE_QUESTION,):
            await self.stop_beat_loop()
        if phase == STATE_ENDED:
            return
        if self._light_mode == "wled" and self._wled_entities:
            preset_id = self._wled_presets.get(phase)
            if preset_id is not None:
                for eid in self._wled_entities:
                    await self._apply_wled(eid, preset_id)
            non_wled = [e for e in self._entity_ids if e not in self._wled_entities]
            if non_wled:
                phase_data = PHASE_COLORS.get(phase)
                if phase_data:
                    await self._apply(non_wled, dict(phase_data), transition=1.0)
        else:
            phase_data = PHASE_COLORS.get(phase)
            if not phase_data:
                return
            sd = dict(phase_data)
            self._scale_brightness(sd)
            await self._apply(self._entity_ids, sd, transition=1.0)
        if phase == STATE_QUESTION and self._light_mode == "dynamic":
            await self.start_beat_loop(bpm=100)

    async def flash(self, color_name: str = "red") -> None:
        """Quick flash — on with colour, sleep, restore phase colour."""
        if not self._active or not self._entity_ids:
            return
        rgb = FLASH_COLORS.get(color_name)
        if not rgb:
            return
        preset = INTENSITY_PRESETS.get(self._intensity, INTENSITY_PRESETS["medium"])
        dur = preset["flash_duration"]
        await self._apply(self._entity_ids, {"rgb_color": rgb, "brightness": 255}, transition=0.1)
        await asyncio.sleep(dur)
        if self._current_phase and self._current_phase in PHASE_COLORS:
            restore = dict(PHASE_COLORS[self._current_phase])
            self._scale_brightness(restore)
            await self._apply(self._entity_ids, restore, transition=0.3)

    async def strobe(self, count: int = 5, interval: float = 0.4) -> None:
        """Rapid on/off strobe for tension."""
        for _ in range(count):
            if not self._active:
                break
            await self._apply(self._entity_ids, {"rgb_color": [255, 0, 0], "brightness": 255}, transition=0.05)
            await asyncio.sleep(interval / 2)
            await self._apply(self._entity_ids, {"brightness": 10}, transition=0.05)
            await asyncio.sleep(interval / 2)
        if self._current_phase and self._current_phase in PHASE_COLORS:
            restore = dict(PHASE_COLORS[self._current_phase])
            self._scale_brightness(restore)
            await self._apply(self._entity_ids, restore, transition=0.3)

    async def celebrate(self) -> None:
        """Rainbow cycle celebration for ~5 seconds."""
        if not self._active or not self._entity_ids:
            return
        brightness = 255 if self._intensity != "subtle" else min(self._base_brightness + 102, 255)
        for color in RAINBOW_COLORS:
            if not self._active:
                break
            await self._apply(self._entity_ids, {"rgb_color": color, "brightness": brightness}, transition=0.3)
            await asyncio.sleep(0.7)

    async def start_beat_loop(self, bpm: int = 100) -> None:
        """Start beat-pulse during question phase."""
        if self._light_mode != "dynamic":
            return
        await self.stop_beat_loop()
        self._beat_task = asyncio.create_task(self._beat_loop(bpm))

    async def stop_beat_loop(self) -> None:
        if self._beat_task is not None:
            self._beat_task.cancel()
            self._beat_task = None

    async def stop(self) -> None:
        """Restore saved light states."""
        if not self._active:
            return
        await self.stop_beat_loop()
        self._active = False
        _LOGGER.info("Quizify Lights stopping, restoring %d lights", len(self._saved_states))
        for eid, saved in self._saved_states.items():
            try:
                if saved.state == "off":
                    await self._hass.services.async_call("light", "turn_off", {"entity_id": eid}, blocking=False)
                else:
                    rd: dict[str, Any] = {"entity_id": eid}
                    if saved.brightness is not None:
                        rd["brightness"] = saved.brightness
                    if saved.rgb_color is not None:
                        rd["rgb_color"] = list(saved.rgb_color)
                    if saved.color_temp_kelvin is not None:
                        rd["color_temp_kelvin"] = saved.color_temp_kelvin
                    if saved.effect is not None:
                        rd["effect"] = saved.effect
                    await self._hass.services.async_call("light", "turn_on", rd, blocking=False)
            except (HomeAssistantError, ServiceNotFound):
                _LOGGER.warning("Failed to restore light: %s", eid)
        self._saved_states = {}
        self._entity_ids = []
        self._current_phase = None

    # -- internal -----------------------------------------------------------

    def _scale_brightness(self, data: dict[str, Any]) -> None:
        preset = INTENSITY_PRESETS.get(self._intensity, INTENSITY_PRESETS["medium"])
        if "brightness" in data:
            data["brightness"] = int(data["brightness"] * preset["brightness_scale"])

    def _get_capability(self, entity_id: str) -> str:
        state = self._hass.states.get(entity_id)
        if not state:
            return "onoff"
        modes = state.attributes.get("supported_color_modes", [])
        if not modes:
            return "onoff"
        if any(m in modes for m in ("rgb", "rgbw", "rgbww", "hs", "xy")):
            return "rgb"
        if "color_temp" in modes:
            return "ct"
        if "brightness" in modes:
            return "dim"
        return "onoff"

    def _detect_wled_entities(self) -> set[str]:
        wled: set[str] = set()
        try:
            from homeassistant.helpers import entity_registry as er  # noqa: PLC0415
            registry = er.async_get(self._hass)
            for eid in self._entity_ids:
                entry = registry.async_get(eid)
                if entry and entry.platform == "wled":
                    wled.add(eid)
        except (ImportError, AttributeError, KeyError):
            for eid in self._entity_ids:
                if "wled" in eid.lower():
                    wled.add(eid)
        return wled

    async def _apply(self, entity_ids: list[str], sd: dict[str, Any], transition: float = 1.0) -> None:
        for eid in entity_ids:
            cap = self._get_capability(eid)
            call: dict[str, Any] = {"entity_id": eid, "transition": transition}
            if cap == "rgb":
                if "rgb_color" in sd:
                    call["rgb_color"] = sd["rgb_color"]
                if "color_temp_kelvin" in sd:
                    call["color_temp_kelvin"] = sd["color_temp_kelvin"]
                if "brightness" in sd:
                    call["brightness"] = sd["brightness"]
            elif cap == "ct":
                if "color_temp_kelvin" in sd:
                    call["color_temp_kelvin"] = sd["color_temp_kelvin"]
                elif "rgb_color" in sd:
                    r, g, b = sd["rgb_color"]
                    call["color_temp_kelvin"] = 2700 if r > b else 6500
                if "brightness" in sd:
                    call["brightness"] = sd["brightness"]
            elif cap == "dim":
                if "brightness" in sd:
                    call["brightness"] = sd["brightness"]
            try:
                await self._hass.services.async_call("light", "turn_on", call, blocking=False)
            except (HomeAssistantError, ServiceNotFound):
                _LOGGER.warning("Failed to control light: %s", eid)

    async def _apply_wled(self, entity_id: str, preset_id: int) -> None:
        preset_entity = None
        try:
            from homeassistant.helpers import entity_registry as er  # noqa: PLC0415
            registry = er.async_get(self._hass)
            light_entry = registry.async_get(entity_id)
            if light_entry and light_entry.device_id:
                for entry in registry.entities.values():
                    if entry.device_id == light_entry.device_id and entry.domain == "select" and "preset" in (entry.entity_id or ""):
                        preset_entity = entry.entity_id
                        break
        except (ImportError, AttributeError, KeyError):
            pass
        if not preset_entity:
            preset_entity = entity_id.replace("light.", "select.") + "_preset"
        try:
            await self._hass.services.async_call(
                "select", "select_option",
                {"entity_id": preset_entity, "option": str(preset_id)}, blocking=False,
            )
        except (HomeAssistantError, ServiceNotFound):
            _LOGGER.warning("Failed WLED preset %d on %s", preset_id, entity_id)

    async def _beat_loop(self, bpm: int) -> None:
        interval = 60.0 / bpm
        i = 0
        try:
            while self._active:
                entities = [e for e in self._entity_ids if e not in self._wled_entities]
                if entities:
                    await self._apply(
                        entities,
                        {"rgb_color": BEAT_COLORS[i % len(BEAT_COLORS)], "brightness": 200},
                        transition=0.1,
                    )
                i += 1
                await asyncio.sleep(interval)
        except asyncio.CancelledError:
            pass
