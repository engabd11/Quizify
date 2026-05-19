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
