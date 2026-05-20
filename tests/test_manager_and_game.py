"""Tests for the player-token logic and the game state machine.

These tests don't boot Home Assistant; they exercise the pure-Python parts
of the integration by stubbing the bits of HA they depend on.
"""
from __future__ import annotations

import asyncio
import sys
import types
from pathlib import Path


# ---------------------------------------------------------------------------
# Stub the homeassistant package just enough that our modules import.
# ---------------------------------------------------------------------------

def _install_ha_stubs() -> None:
    """Provide minimal stubs for the bits of homeassistant we touch."""
    if "homeassistant" in sys.modules:
        return

    # Build the package hierarchy as real packages so submodule imports work.
    ha = types.ModuleType("homeassistant")
    ha.__path__ = []  # mark as package
    ha_core = types.ModuleType("homeassistant.core")
    ha_helpers = types.ModuleType("homeassistant.helpers")
    ha_helpers.__path__ = []
    ha_helpers_er = types.ModuleType("homeassistant.helpers.entity_registry")
    ha_components = types.ModuleType("homeassistant.components")
    ha_components.__path__ = []
    ha_components_frontend = types.ModuleType("homeassistant.components.frontend")
    ha_components_http = types.ModuleType("homeassistant.components.http")
    ha_components_ws = types.ModuleType("homeassistant.components.websocket_api")
    ha_config_entries = types.ModuleType("homeassistant.config_entries")
    ha_const = types.ModuleType("homeassistant.const")

    class _StubHomeAssistant:  # noqa: D401
        """Stand-in for HomeAssistant; tests don't actually use it."""

        config = types.SimpleNamespace(components=set())
        states = types.SimpleNamespace(async_all=lambda _domain: [])

        async def async_add_executor_job(self, func, *args):
            return func(*args)

        def async_create_task(self, coro):
            return asyncio.ensure_future(coro)

    ha_core.HomeAssistant = _StubHomeAssistant
    ha_core.callback = lambda f: f
    ha_helpers_er.async_get = lambda _hass: types.SimpleNamespace(
        async_get=lambda _entity_id: None
    )

    ha_components_frontend.async_register_built_in_panel = lambda *a, **k: None
    ha_components_frontend.async_remove_panel = lambda *a, **k: None

    class _HAView:
        url = ""
        name = ""
        requires_auth = True

    ha_components_http.HomeAssistantView = _HAView
    ha_components_http.StaticPathConfig = lambda *a, **k: None

    ha_components_ws.async_register_command = lambda *a, **k: None
    ha_components_ws.async_response = lambda f: f
    ha_components_ws.websocket_command = lambda _schema: (lambda f: f)
    ha_components_ws.ActiveConnection = object

    ha_config_entries.ConfigEntry = object
    ha_config_entries.ConfigFlow = object
    ha_config_entries.ConfigFlowResult = dict

    class _Platform:
        pass
    ha_const.Platform = _Platform

    sys.modules["homeassistant"] = ha
    sys.modules["homeassistant.core"] = ha_core
    sys.modules["homeassistant.helpers"] = ha_helpers
    sys.modules["homeassistant.helpers.entity_registry"] = ha_helpers_er
    sys.modules["homeassistant.components"] = ha_components
    sys.modules["homeassistant.components.frontend"] = ha_components_frontend
    sys.modules["homeassistant.components.http"] = ha_components_http
    sys.modules["homeassistant.components.websocket_api"] = ha_components_ws
    sys.modules["homeassistant.config_entries"] = ha_config_entries
    sys.modules["homeassistant.const"] = ha_const


_install_ha_stubs()

# Make custom_components importable.
_REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_REPO))

# Import the modules directly via importlib to bypass __init__.py, which
# pulls in the full HA HTTP/aiohttp surface that we don't need here.
import importlib.util  # noqa: E402

def _load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, str(path))
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


_QZ = _REPO / "custom_components" / "quizify"
# const has no HA deps, load it first under the proper dotted name so the
# relative imports in game/manager resolve.
_pkg = types.ModuleType("custom_components")
_pkg.__path__ = [str(_REPO / "custom_components")]
sys.modules["custom_components"] = _pkg
_subpkg = types.ModuleType("custom_components.quizify")
_subpkg.__path__ = [str(_QZ)]
sys.modules["custom_components.quizify"] = _subpkg
_load_module("custom_components.quizify.const", _QZ / "const.py")
_load_module("custom_components.quizify.questions", _QZ / "questions.py")
_game_mod = _load_module("custom_components.quizify.game", _QZ / "game.py")
_mgr_mod = _load_module("custom_components.quizify.manager", _QZ / "manager.py")
_load_module(
    "custom_components.quizify.conversation_helper",
    _QZ / "conversation_helper.py",
)

GameSession = _game_mod.GameSession
GameSettings = _game_mod.GameSettings
QuizifyManager = _mgr_mod.QuizifyManager


# ---------------------------------------------------------------------------
# Player token tests
# ---------------------------------------------------------------------------


def _mgr() -> QuizifyManager:
    from homeassistant.core import HomeAssistant
    return QuizifyManager(HomeAssistant())


def test_player_token_roundtrip():
    mgr = _mgr()
    token = mgr.issue_player_token("sess1", "player1")
    assert mgr.verify_player_token(token, "sess1") == "player1"


def test_player_token_wrong_session_rejected():
    mgr = _mgr()
    token = mgr.issue_player_token("sess1", "player1")
    assert mgr.verify_player_token(token, "sess2") is None


def test_player_token_tampered_signature_rejected():
    mgr = _mgr()
    token = mgr.issue_player_token("sess1", "player1")
    # Flip a bit in the signature suffix.
    head, sig = token.rsplit(".", 1)
    flipped_sig = ("0" if sig[0] != "0" else "1") + sig[1:]
    bad = f"{head}.{flipped_sig}"
    assert mgr.verify_player_token(bad, "sess1") is None


def test_player_token_tampered_body_rejected():
    mgr = _mgr()
    token = mgr.issue_player_token("sess1", "alice")
    # Swap alice -> mallory; signature won't match.
    bad = token.replace(".alice.", ".mallory.")
    assert mgr.verify_player_token(bad, "sess1") is None


def test_player_token_expired_rejected():
    mgr = _mgr()
    # Forge an "expired" token using the manager's secret.
    import hmac, hashlib, time
    body = f"{int(time.time()) - 10}.sess1.player1"
    sig = hmac.new(
        mgr._token_secret, body.encode("utf-8"), hashlib.sha256
    ).hexdigest()
    token = f"{body}.{sig}"
    assert mgr.verify_player_token(token, "sess1") is None


def test_player_token_garbage_rejected():
    mgr = _mgr()
    assert mgr.verify_player_token("not-a-token", "sess1") is None
    assert mgr.verify_player_token("", "sess1") is None
    assert mgr.verify_player_token("a.b.c", "sess1") is None
    assert mgr.verify_player_token("a.b.c.d", "sess1") is None


def test_each_manager_has_independent_secret():
    """Tokens from one manager must not verify on another (no shared key)."""
    mgr_a = _mgr()
    mgr_b = _mgr()
    tok = mgr_a.issue_player_token("s", "p")
    assert mgr_a.verify_player_token(tok, "s") == "p"
    assert mgr_b.verify_player_token(tok, "s") is None


# ---------------------------------------------------------------------------
# Game state machine tests
# ---------------------------------------------------------------------------


class _FakeBank:
    """Minimal QuestionBank stand-in."""

    def __init__(self, questions):
        self._questions = questions

    def pick(self, **_kwargs):
        return list(self._questions)


def _make_session(questions=None, question_time=1, reveal_time=0):
    settings = GameSettings(
        mode="adults",
        category="general_knowledge",
        difficulty="mixed",
        questions_per_round=2,
        question_time=question_time,
        reveal_time=reveal_time,
    )
    if questions is None:
        questions = [
            {
                "id": "q1",
                "question": "1+1?",
                "answers": ["2", "3", "4", "5"],
                "correct": 0,
                "difficulty": "easy",
            },
            {
                "id": "q2",
                "question": "2+2?",
                "answers": ["3", "4", "5", "6"],
                "correct": 1,
                "difficulty": "easy",
            },
        ]
    bank = _FakeBank(questions)
    return GameSession("sess-test", settings, bank)


def test_add_player_assigns_unique_id_and_name():
    s = _make_session()
    a = s.add_player("Alice")
    b = s.add_player("Alice")  # same name -> deduplicated
    assert a.player_id != b.player_id
    assert a.name == "Alice"
    assert b.name == "Alice 2"


def test_add_player_empty_name_becomes_player():
    s = _make_session()
    p = s.add_player("   ")
    assert p.name == "Player"


def test_correct_answer_awards_points_and_streak():
    s = _make_session()
    p = s.add_player("A")

    async def run():
        await s.start()
        # Give the loop a tick to enter the first question.
        for _ in range(5):
            await asyncio.sleep(0)
            if s.current_index == 0:
                break
        await s.submit_answer(p.player_id, 0)  # correct
        # Cancel before the wait_for completes to avoid sleeping 1s.
        await s.cancel()

    asyncio.run(run())
    assert p.score > 0
    assert p.correct_count == 1
    assert p.streak == 1


def test_wrong_answer_resets_streak():
    s = _make_session()
    p = s.add_player("A")
    p.streak = 4  # pretend they had a streak

    async def run():
        await s.start()
        for _ in range(5):
            await asyncio.sleep(0)
            if s.current_index == 0:
                break
        await s.submit_answer(p.player_id, 2)  # wrong
        await s.cancel()

    asyncio.run(run())
    assert p.streak == 0
    assert p.score == 0


def test_double_answer_ignored():
    s = _make_session()
    p = s.add_player("A")

    async def run():
        await s.start()
        for _ in range(5):
            await asyncio.sleep(0)
            if s.current_index == 0:
                break
        await s.submit_answer(p.player_id, 0)
        first_score = p.score
        # Second answer must not change anything.
        await s.submit_answer(p.player_id, 2)
        await s.cancel()
        return first_score

    final = asyncio.run(run())
    assert p.score == final


def test_ranking_breaks_ties_alphabetically():
    s = _make_session()
    z = s.add_player("Zoe")
    a = s.add_player("Aria")
    z.score = 100
    a.score = 100
    ranked = s._ranked_players()
    assert ranked[0].name == "Aria"
    assert ranked[1].name == "Zoe"


def test_no_questions_ends_game_cleanly():
    s = _make_session(questions=[])

    async def run():
        await s.start()
    asyncio.run(run())
    assert s.state == "ended"


def test_double_points_doubles_correct_score():
    """An armed double-points lifeline doubles the points awarded."""
    s = _make_session()
    a = s.add_player("A")
    b = s.add_player("B")

    async def run():
        await s.start()
        for _ in range(5):
            await asyncio.sleep(0)
            if s.current_index == 0:
                break
        # B arms the lifeline; A doesn't.
        await s.arm_lifeline(b.player_id, "double_points")
        await s.submit_answer(a.player_id, 0)
        await s.submit_answer(b.player_id, 0)
        await s.cancel()

    asyncio.run(run())
    assert a.score > 0
    assert b.score == a.score * 2


def test_double_points_penalty_on_wrong():
    """Wrong answer with armed lifeline subtracts 1000 points."""
    s = _make_session()
    p = s.add_player("A")
    p.score = 5000

    async def run():
        await s.start()
        for _ in range(5):
            await asyncio.sleep(0)
            if s.current_index == 0:
                break
        await s.arm_lifeline(p.player_id, "double_points")
        await s.submit_answer(p.player_id, 2)  # wrong (correct is 0)
        await s.cancel()

    asyncio.run(run())
    assert p.score == 4000  # 5000 - 1000 penalty
    assert p.double_points_losses == 1


def test_lifeline_disarms_after_question():
    """Each question requires re-arming the lifeline."""
    s = _make_session()
    p = s.add_player("A")

    async def run():
        await s.start()
        for _ in range(5):
            await asyncio.sleep(0)
            if s.current_index == 0:
                break
        ok = await s.arm_lifeline(p.player_id, "double_points")
        assert ok
        assert p.double_points_armed
        # submit -> lifeline disarms
        await s.submit_answer(p.player_id, 0)
        assert not p.double_points_armed
        await s.cancel()

    asyncio.run(run())


def test_pause_and_resume_round_trip():
    """pause() and resume_game() transition state cleanly."""
    s = _make_session()
    s.add_player("A")

    async def run():
        await s.start()
        for _ in range(5):
            await asyncio.sleep(0)
            if s.current_index == 0:
                break
        ok = await s.pause()
        assert ok
        assert s.state == "paused"
        assert not s._pause_event.is_set()
        ok2 = await s.resume_game()
        assert ok2
        assert s.state == "question"
        assert s._pause_event.is_set()
        await s.cancel()

    asyncio.run(run())


def test_end_game_emits_highlights():
    """_compute_highlights returns a dict keyed by award."""
    s = _make_session()
    p1 = s.add_player("A")
    p2 = s.add_player("B")
    p1.score = 5000
    p1.best_streak = 6
    p1.correct_count = 3
    p1.answered_count = 5
    p1.fastest_answer = 1.2
    p2.score = 2500
    p2.correct_count = 2
    p2.answered_count = 5

    # Pretend a 5-question game has been played so the highlight thresholds
    # are satisfied.
    s.current_index = 4

    ranked = s._ranked_players()
    h = s._compute_highlights(ranked)
    assert h["winner"]["name"] == "A"
    assert h["winner"]["value"].startswith("5,000")
    assert "on_fire" in h
    assert h["on_fire"]["name"] == "A"
    assert "lightning" in h
    assert h["lightning"]["name"] == "A"


# ---------------------------------------------------------------------------
# v1.0 hardening tests
# ---------------------------------------------------------------------------


def test_player_token_oversize_rejected():
    """Tokens larger than MAX_TOKEN_LENGTH should be rejected outright."""
    from custom_components.quizify.const import MAX_TOKEN_LENGTH
    mgr = _mgr()
    # Build a garbage string longer than the cap. Must not even try to split.
    huge = "a." * (MAX_TOKEN_LENGTH + 100)
    assert mgr.verify_player_token(huge, "sess1") is None
    # And a string of exactly cap+1 length.
    assert mgr.verify_player_token("x" * (MAX_TOKEN_LENGTH + 1), "s") is None


def test_player_name_sanitizer_strips_control_chars():
    """Newlines, NULs, and zero-width chars must not appear in stored names."""
    s = _make_session()
    # Mix of control chars and zero-width joiners around a real name.
    p = s.add_player("\u0000Bob\nFoo\u200b\u200c")
    # Internal whitespace from the \n becomes a single space.
    assert "\u0000" not in p.name
    assert "\n" not in p.name
    assert "\u200b" not in p.name
    assert "Bob" in p.name and "Foo" in p.name


def test_player_name_zero_width_dedup():
    """A name that's a zero-width variant of an existing one shouldn't slip past dedup."""
    s = _make_session()
    a = s.add_player("Alice")
    # Zero-width chars between letters used to be a sneaky way to claim
    # an "identical" looking name. The sanitizer strips them, so this
    # should dedup to "Alice 2".
    b = s.add_player("A\u200bli\u200bce")
    assert a.name == "Alice"
    assert b.name == "Alice 2"


def test_player_name_length_capped():
    """Names beyond MAX_PLAYER_NAME_LENGTH must be trimmed."""
    from custom_components.quizify.const import MAX_PLAYER_NAME_LENGTH
    s = _make_session()
    p = s.add_player("X" * 200)
    assert len(p.name) <= MAX_PLAYER_NAME_LENGTH


def test_session_full_raises_after_cap():
    """add_player must raise SessionFullError once the cap is hit."""
    from custom_components.quizify.const import MAX_PLAYERS_PER_SESSION
    from custom_components.quizify.game import SessionFullError
    s = _make_session()
    for i in range(MAX_PLAYERS_PER_SESSION):
        s.add_player(f"P{i}")
    assert len(s.players) == MAX_PLAYERS_PER_SESSION
    try:
        s.add_player("OneMore")
    except SessionFullError:
        pass
    else:
        raise AssertionError("Expected SessionFullError")


def test_too_many_sessions_raises():
    """create_session must raise once the concurrent cap is hit."""
    from custom_components.quizify.const import MAX_CONCURRENT_SESSIONS
    from custom_components.quizify.manager import TooManySessionsError
    mgr = _mgr()
    # Seed a fake bank so create_session can build sessions without files.
    mgr.bank = _FakeBank([{
        "id": "q1", "question": "?", "answers": ["a", "b"],
        "correct": 0, "difficulty": "easy",
    }])
    settings = GameSettings(
        mode="adults", category="general_knowledge", difficulty="mixed",
    )
    for _ in range(MAX_CONCURRENT_SESSIONS):
        mgr.create_session(settings)
    try:
        mgr.create_session(settings)
    except TooManySessionsError:
        pass
    else:
        raise AssertionError("Expected TooManySessionsError")


# ---------------------------------------------------------------------------
# TTS sanitization + AI announcement tests (v1.1)
# ---------------------------------------------------------------------------


def test_sanitize_for_tts_strips_stage_directions():
    """Asterisk-wrapped stage directions must not survive into TTS."""
    from custom_components.quizify.game import _sanitize_for_tts
    out = _sanitize_for_tts(
        "*gasps dramatically* Oh no. *dramatic pause* The winner is Bob."
    )
    assert "*" not in out
    assert "gasps" not in out
    assert "dramatic pause" not in out
    assert "The winner is Bob." in out


def test_sanitize_for_tts_collapses_ellipses():
    """Long ellipses become a single period to avoid awkward Piper pauses."""
    from custom_components.quizify.game import _sanitize_for_tts
    out = _sanitize_for_tts("After all these years... the quiz is here.")
    assert "..." not in out
    assert "…" not in out
    # The replacement should still parse as a sentence break.
    assert "years." in out or "years ." not in out  # no trailing space-period


def test_sanitize_for_tts_unicode_ellipsis():
    """The single-character ellipsis (…) gets handled too."""
    from custom_components.quizify.game import _sanitize_for_tts
    out = _sanitize_for_tts("Well… that was something.")
    assert "…" not in out


def test_sanitize_for_tts_preserves_caps_and_punctuation():
    """ALL CAPS is intentional in hype/sports personalities; don't strip it."""
    from custom_components.quizify.game import _sanitize_for_tts
    out = _sanitize_for_tts("AND THE WINNER IS Alice! What a performance!")
    assert "AND THE WINNER IS" in out
    assert "Alice!" in out


def test_sanitize_for_tts_empty_input():
    from custom_components.quizify.game import _sanitize_for_tts
    assert _sanitize_for_tts("") == ""
    assert _sanitize_for_tts(None) == ""


def test_static_soap_template_has_no_stage_directions():
    """The default soap personality must not contain asterisked stage directions."""
    s = _make_session()
    s.settings.tts_personality = "soap"
    # Build the announcement many times to cover both variants in the pool.
    for _ in range(50):
        msg = s._build_start_announcement()
        assert "*" not in msg, f"Stage direction leaked: {msg!r}"
    for _ in range(50):
        msg = s._build_end_announcement("Alice", 1000, "Bob")
        assert "*" not in msg, f"Stage direction leaked in end: {msg!r}"


def test_resolve_start_announcement_falls_back_without_agent():
    """No conversation_agent_id configured -> static template is used."""
    s = _make_session()
    s.settings.conversation_agent_id = None

    async def run():
        msg = await s._resolve_start_announcement()
        assert isinstance(msg, str)
        assert len(msg) > 0
    asyncio.run(run())


def test_resolve_end_announcement_falls_back_without_agent():
    s = _make_session()
    s.settings.conversation_agent_id = None

    async def run():
        msg = await s._resolve_end_announcement("Alice", 1000, "Bob")
        assert "Alice" in msg
    asyncio.run(run())


def test_conversation_helper_clean_output_strips_preamble():
    """LLMs often prefix with 'Here is the announcement:' — strip it."""
    from custom_components.quizify.conversation_helper import _clean_llm_output
    out = _clean_llm_output("Here's the announcement: ATTENTION recruits, fall in!")
    assert not out.lower().startswith("here")
    assert "ATTENTION" in out


def test_conversation_helper_clean_output_strips_code_fences():
    from custom_components.quizify.conversation_helper import _clean_llm_output
    text = "```\nWelcome to Quizify!\n```"
    out = _clean_llm_output(text)
    assert "```" not in out
    assert "Welcome to Quizify!" in out


def test_conversation_helper_clean_output_strips_outer_quotes():
    from custom_components.quizify.conversation_helper import _clean_llm_output
    out = _clean_llm_output('"And so the quiz begins."')
    assert not out.startswith('"')
    assert "And so the quiz begins" in out


def test_conversation_helper_extract_speech_modern_shape():
    """The current HA shape is response.speech.plain.speech."""
    from custom_components.quizify.conversation_helper import _extract_speech
    fake = {
        "response": {
            "speech": {
                "plain": {"speech": "Get ready, players!"}
            }
        }
    }
    assert _extract_speech(fake) == "Get ready, players!"


def test_conversation_helper_extract_speech_handles_garbage():
    """Anything malformed must return empty string, not crash."""
    from custom_components.quizify.conversation_helper import _extract_speech
    assert _extract_speech(None) == ""
    assert _extract_speech("not a dict") == ""
    assert _extract_speech({}) == ""
    assert _extract_speech({"response": None}) == ""
    assert _extract_speech({"response": {"speech": "just a string"}}) == "just a string"

