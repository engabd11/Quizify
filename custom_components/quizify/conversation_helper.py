"""LLM-powered announcement generation via HA's conversation integration.

This module is the *only* place that calls into an LLM. The game loop
itself never blocks on a model call — `generate_announcement()` is
invoked ahead of when the audio is needed, and the result (or `None` on
failure) is cached on the GameSession.

We talk to LLMs through the standard `conversation.process` service so
any agent the user has configured works: Ollama (the common case for
local setups), OpenAI Conversation, Google Generative AI, Anthropic,
custom agents, etc. We never import the Ollama package directly.

Failure modes (timeout, agent missing, weird response shape, etc.) all
return `None`. The caller falls back to the static template.
"""
from __future__ import annotations

import asyncio
import logging
import uuid
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import (
    HomeAssistantError,
    ServiceNotFound,
    ServiceValidationError,
)

from .const import CONVERSATION_MAX_CHARS, CONVERSATION_TIMEOUT

_LOGGER = logging.getLogger(__name__)


# Prompts for each personality. We keep them short and direct so even a
# small local model can produce something usable in one shot. The
# critical instructions — "no stage directions", "plain prose only" —
# are repeated near the end of the prompt because models pay more
# attention to the last part of long instructions.
_PERSONALITY_STYLE: dict[str, str] = {
    "hype": (
        "You are a high-energy hype-master, all caps energy, lots of "
        "exclamation marks, but the words themselves must still be "
        "real readable English."
    ),
    "drill": (
        "You are a grizzled drill sergeant. Bark orders. Be direct. "
        "Use military diction. No actual slurs."
    ),
    "soap": (
        "You are a melodramatic soap opera narrator. Lean into longing, "
        "betrayal, family secrets, swelling music. But keep the actual "
        "spoken text natural — never write stage directions or sounds."
    ),
    "conspiracy": (
        "You are a conspiracy theorist. Hint at hidden forces, ask "
        "loaded rhetorical questions, sound paranoid but coherent."
    ),
    "parent": (
        "You are a passive-aggressive disappointed parent. Sound resigned, "
        "use mild guilt, end on a backhanded compliment."
    ),
    "sports": (
        "You are a sports commentator at a live event. Use vivid play-by-play "
        "language. Be excited but coherent."
    ),
}

# The hard rules that apply to every personality. Listed last in the
# prompt so the model weights them heavily.
_HARD_RULES = (
    "Write ONLY the words to be SPOKEN ALOUD by a text-to-speech engine.\n"
    "ABSOLUTE RULES — failure here breaks the announcement:\n"
    "- NO stage directions, sound effects, or actions in asterisks. "
    "Never write things like *gasps*, *dramatic pause*, *swelling music*. "
    "These get read aloud literally and sound stupid.\n"
    "- NO ellipses (no '...'). Use full sentences with periods.\n"
    "- NO emoji.\n"
    "- NO markdown, NO bullet points, NO headers, NO meta-text like 'Here is your announcement:'.\n"
    "- Plain prose only. 2-4 short sentences. Under 80 words total.\n"
    "- Mention every player by name exactly once.\n"
    "- Stay in character but stay pronounceable. Piper TTS will read this verbatim."
)


def _build_start_prompt(
    personality: str,
    player_names: list[str],
    questions: int,
    seconds_per_question: int,
) -> str:
    style = _PERSONALITY_STYLE.get(personality, _PERSONALITY_STYLE["hype"])
    names_str = ", ".join(player_names) if player_names else "the players"
    return (
        f"You are the announcer for a Home Assistant trivia game called Quizify. "
        f"It's about to begin. Write the opening announcement.\n\n"
        f"PERSONALITY: {style}\n\n"
        f"CONTEXT:\n"
        f"- Players ({len(player_names)}): {names_str}\n"
        f"- Questions in this round: {questions}\n"
        f"- Seconds per question: {seconds_per_question}\n\n"
        f"{_HARD_RULES}"
    )


def _build_end_prompt(
    personality: str,
    winner_name: str,
    winner_score: int,
    runner_up_name: str | None,
) -> str:
    style = _PERSONALITY_STYLE.get(personality, _PERSONALITY_STYLE["hype"])
    runner = (
        f"- Runner up: {runner_up_name}\n"
        if runner_up_name else ""
    )
    return (
        f"You are the announcer for a Home Assistant trivia game called Quizify. "
        f"The game just ended. Write the closing announcement.\n\n"
        f"PERSONALITY: {style}\n\n"
        f"CONTEXT:\n"
        f"- Winner: {winner_name}\n"
        f"- Winning score: {winner_score:,} points\n"
        f"{runner}\n"
        f"{_HARD_RULES}"
    )


def _clean_llm_output(text: str) -> str:
    """Strip the most common LLM-output noise.

    The hard rules in the prompt cut most of this out, but small local
    models still occasionally emit a markdown code fence, a "Here's the
    announcement:" preamble, or wrap their output in quotes. We post-
    process to catch those before handing the string to TTS.
    """
    if not text:
        return ""
    # Drop common preambles. We compare in lower-case but slice from
    # the original to preserve casing.
    lowered = text.lower().lstrip()
    for prefix in (
        "here's the announcement:",
        "here is the announcement:",
        "announcement:",
        "sure!",
        "sure,",
        "of course!",
        "of course,",
    ):
        if lowered.startswith(prefix):
            # Find the prefix in the original and skip past it.
            idx = text.lower().find(prefix) + len(prefix)
            text = text[idx:].lstrip()
            lowered = text.lower().lstrip()
            break
    # Strip outer triple-backtick / single-backtick fences.
    stripped = text.strip()
    if stripped.startswith("```") and stripped.endswith("```"):
        # Remove first and last fenced line.
        lines = stripped.split("\n")
        if len(lines) >= 2:
            text = "\n".join(lines[1:-1])
    # Strip surrounding quotes (some models wrap output in "...").
    stripped = text.strip()
    if (
        len(stripped) >= 2
        and stripped[0] in ('"', "'")
        and stripped[-1] == stripped[0]
    ):
        text = stripped[1:-1]
    return text.strip()


async def generate_announcement(
    hass: HomeAssistant,
    *,
    agent_id: str,
    kind: str,
    personality: str,
    context: dict[str, Any],
    timeout: float = CONVERSATION_TIMEOUT,
) -> str | None:
    """Generate an announcement via HA's conversation integration.

    Args:
        hass: HA instance.
        agent_id: conversation agent ID (e.g. "conversation.ollama").
        kind: "start" or "end".
        personality: tts_personality key.
        context: dict with keys depending on kind:
            - start: player_names (list), questions (int), seconds (int)
            - end:   winner_name (str), winner_score (int), runner_up (str|None)
        timeout: seconds to wait before giving up.

    Returns:
        The generated text, or None on any failure. Callers must handle
        the None case by falling back to the static template.
    """
    if not agent_id:
        return None

    if kind == "start":
        prompt = _build_start_prompt(
            personality=personality,
            player_names=context.get("player_names", []),
            questions=context.get("questions", 10),
            seconds_per_question=context.get("seconds", 20),
        )
    elif kind == "end":
        prompt = _build_end_prompt(
            personality=personality,
            winner_name=context.get("winner_name", ""),
            winner_score=context.get("winner_score", 0),
            runner_up_name=context.get("runner_up_name"),
        )
    else:
        _LOGGER.warning("Unknown announcement kind: %s", kind)
        return None

    # `conversation.process` is the standard HA service for talking to
    # any configured conversation agent. We force a fresh conversation
    # by minting a new conversation_id each call so context from
    # previous games doesn't leak in (Ollama agents in particular keep
    # rolling context by default).
    service_data = {
        "agent_id": agent_id,
        "text": prompt,
        "conversation_id": f"quizify-{uuid.uuid4()}",
    }

    try:
        # `conversation.process` with return_response=True is the modern
        # shape. We wrap in wait_for so a slow or hung model can't lock up
        # the pre-roll. asyncio.wait_for cancels the inner coroutine on
        # timeout; HA's service call handles cancellation cleanly.
        result = await asyncio.wait_for(
            hass.services.async_call(
                "conversation",
                "process",
                service_data,
                blocking=True,
                return_response=True,
            ),
            timeout=timeout,
        )
    except asyncio.TimeoutError:
        _LOGGER.warning(
            "Quizify: conversation agent %s timed out after %.0fs; "
            "using built-in announcement instead",
            agent_id, timeout,
        )
        return None
    except (HomeAssistantError, ServiceValidationError, ServiceNotFound) as err:
        # Agent not found, bad arguments, agent returned an error, the
        # conversation integration doesn't support return_response on this
        # HA version, etc. Log a concise reason (not a full traceback) and
        # fall back — these are expected, recoverable conditions.
        _LOGGER.warning(
            "Quizify: conversation agent %s could not generate an "
            "announcement (%s); using built-in announcement instead",
            agent_id, err,
        )
        return None
    except Exception:
        # Anything else is unexpected — log with traceback for debugging
        # but still fall back so the game is never broken by the AI path.
        _LOGGER.warning(
            "Quizify: unexpected error from conversation agent %s; "
            "using built-in announcement instead",
            agent_id, exc_info=True,
        )
        return None

    # The response shape varies between HA versions and agent types.
    # The canonical path is response.speech.plain.speech; we also try
    # a couple of legacy keys before giving up.
    text = _extract_speech(result)
    if not text:
        _LOGGER.warning(
            "Conversation agent %s returned an empty response; using fallback",
            agent_id,
        )
        return None

    cleaned = _clean_llm_output(text)
    if not cleaned:
        return None
    if len(cleaned) > CONVERSATION_MAX_CHARS:
        cleaned = cleaned[:CONVERSATION_MAX_CHARS].rstrip()
    return cleaned


def _extract_speech(result: Any) -> str:
    """Pull the spoken text out of a conversation.process response.

    HA wraps the response in several layers depending on version:
        result["response"]["speech"]["plain"]["speech"]   (current)
        result["speech"]["plain"]["speech"]               (some setups)
        result["response"]["speech"]                      (very old)
    We probe each in order and return the first match.
    """
    if not isinstance(result, dict):
        return ""

    # Modern shape
    resp = result.get("response")
    if isinstance(resp, dict):
        speech = resp.get("speech")
        if isinstance(speech, dict):
            plain = speech.get("plain")
            if isinstance(plain, dict):
                text = plain.get("speech")
                if isinstance(text, str):
                    return text
        elif isinstance(speech, str):
            return speech

    # Flatter shape some agents return
    speech = result.get("speech")
    if isinstance(speech, dict):
        plain = speech.get("plain")
        if isinstance(plain, dict):
            text = plain.get("speech")
            if isinstance(text, str):
                return text

    return ""


def list_conversation_agents(hass: HomeAssistant) -> list[dict[str, str]]:
    """Return the list of conversation.* entities for the admin UI.

    We surface every `conversation.*` entity — the user picks which to
    use. The HA conversation registry isn't trivially accessible from
    older versions, so we fall back to the entity registry approach.
    """
    out: list[dict[str, str]] = []
    for state in hass.states.async_all("conversation"):
        out.append({
            "entity_id": state.entity_id,
            "name": state.attributes.get("friendly_name") or state.entity_id,
        })
    out.sort(key=lambda e: e["name"].lower())
    return out
