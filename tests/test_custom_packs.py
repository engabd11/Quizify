"""Tests for custom question pack loading."""
from __future__ import annotations

import asyncio
import json
import sys
import tempfile
from pathlib import Path

import pytest

# Patch out the .const relative import so we can load questions.py
# without booting Home Assistant.
import importlib.util
import types

_QZ = Path(__file__).resolve().parent.parent / "custom_components" / "quizify"

_ADULTS_CATS = [
    "general_knowledge",
    "science",
    "geography",
    "history",
    "sport",
    "food_and_drink",
    "literature",
    "language",
    "art",
    "technology",
    "mythology",
    "animals",
]
_KIDS_CATS = ["general_knowledge", "science", "geography", "history"]


def _load_questions_module():
    src = (_QZ / "questions.py").read_text()
    src = src.replace(
        "from .const import (\n    CATEGORIES_BY_MODE,\n    DIFFICULTY_MIXED,\n    MODES,\n)",
        (
            f"CATEGORIES_BY_MODE = {{'adults': {_ADULTS_CATS!r}, 'kids': {_KIDS_CATS!r}}}\n"
            'DIFFICULTY_MIXED = "mixed"\n'
            'MODES = ["adults", "kids"]'
        ),
    )
    ns: dict = {}
    exec(compile(src, str(_QZ / "questions.py"), "exec"), ns)
    return ns


def _make_pack(dir_path: Path, mode: str, category: str, questions: list) -> Path:
    """Write a custom pack JSON file and return its path."""
    mode_dir = dir_path / mode
    mode_dir.mkdir(parents=True, exist_ok=True)
    path = mode_dir / f"{category}.json"
    path.write_text(json.dumps(questions), encoding="utf-8")
    return path


# --------------------------------------------------------------------------- #
# Tests: custom pack loading
# --------------------------------------------------------------------------- #


def test_custom_pack_adds_new_category():
    """A custom pack with a new category id should appear in categories()."""
    mod = _load_questions_module()
    with tempfile.TemporaryDirectory() as tmp:
        custom_path = Path(tmp) / "quizify_packs"
        _make_pack(custom_path, "adults", "movies", [
            {"id": "custom-movies-001", "question": "Who directed Jaws?",
             "answers": ["Spielberg", "Lucas", "Scorsese", "Coppola"],
             "correct": 0, "difficulty": "easy"},
        ])
        bank = mod["QuestionBank"](_QZ / "questions", custom_path)
        asyncio.run(bank.async_load())

        cats = bank.categories("adults")
        cat_ids = {c["id"] for c in cats}
        assert "movies" in cat_ids
        movies = next(c for c in cats if c["id"] == "movies")
        assert movies["count"] == 1
        assert movies["pack"] == "custom"


def test_custom_pack_extends_builtin_category():
    """A custom pack with an existing category id should merge questions."""
    mod = _load_questions_module()
    with tempfile.TemporaryDirectory() as tmp:
        custom_path = Path(tmp) / "quizify_packs"
        _make_pack(custom_path, "adults", "science", [
            {"id": "custom-science-001", "question": "What is H2O?",
             "answers": ["Water", "Salt", "Sugar", "Acid"],
             "correct": 0, "difficulty": "easy"},
        ])
        bank = mod["QuestionBank"](_QZ / "questions", custom_path)
        asyncio.run(bank.async_load())

        cats = bank.categories("adults")
        science = next(c for c in cats if c["id"] == "science")
        # Should have the built-in questions plus 1 custom one.
        assert science["count"] > 84  # built-in is 84
        assert science["pack"] == "custom"  # overridden by custom pack


def test_custom_pack_duplicate_ids_filtered():
    """Custom questions with IDs that already exist should be skipped."""
    mod = _load_questions_module()
    with tempfile.TemporaryDirectory() as tmp:
        custom_path = Path(tmp) / "quizify_packs"
        # Use a real built-in ID to test dedup.
        _make_pack(custom_path, "adults", "general_knowledge", [
            {"id": "ak-gk-001", "question": "Duplicate?",
             "answers": ["A", "B"], "correct": 0, "difficulty": "easy"},
            {"id": "custom-gk-new", "question": "New question?",
             "answers": ["A", "B"], "correct": 0, "difficulty": "easy"},
        ])
        bank = mod["QuestionBank"](_QZ / "questions", custom_path)
        asyncio.run(bank.async_load())

        cats = bank.categories("adults")
        gk = next(c for c in cats if c["id"] == "general_knowledge")
        # Should have added only 1 (the duplicate is filtered).
        assert gk["count"] == 85  # 84 built-in + 1 new


def test_custom_pack_invalid_json_skipped():
    """Malformed custom pack files should be skipped, not crash."""
    mod = _load_questions_module()
    with tempfile.TemporaryDirectory() as tmp:
        custom_path = Path(tmp) / "quizify_packs"
        mode_dir = custom_path / "adults"
        mode_dir.mkdir(parents=True, exist_ok=True)
        # Write invalid JSON.
        (mode_dir / "broken.json").write_text("{not valid json", encoding="utf-8")
        # Write a valid one alongside.
        _make_pack(custom_path, "adults", "music", [
            {"id": "custom-music-001", "question": "What note comes after C?",
             "answers": ["D", "E", "F", "G"],
             "correct": 0, "difficulty": "easy"},
        ])
        bank = mod["QuestionBank"](_QZ / "questions", custom_path)
        asyncio.run(bank.async_load())

        cats = bank.categories("adults")
        cat_ids = {c["id"] for c in cats}
        assert "music" in cat_ids  # valid pack loaded
        assert "broken" not in cat_ids  # invalid pack skipped


def test_no_custom_packs_path():
    """When custom_packs_path is None, everything works as before."""
    mod = _load_questions_module()
    bank = mod["QuestionBank"](_QZ / "questions", None)
    asyncio.run(bank.async_load())

    cats = bank.categories("adults")
    for c in cats:
        assert c["pack"] == "builtin"


def test_custom_packs_path_nonexistent():
    """When custom_packs_path doesn't exist, everything works as before."""
    mod = _load_questions_module()
    bank = mod["QuestionBank"](_QZ / "questions", Path("/nonexistent/path"))
    asyncio.run(bank.async_load())

    cats = bank.categories("adults")
    for c in cats:
        assert c["pack"] == "builtin"


def test_custom_pack_pick_questions():
    """Questions from custom packs should be pickable."""
    mod = _load_questions_module()
    with tempfile.TemporaryDirectory() as tmp:
        custom_path = Path(tmp) / "quizify_packs"
        _make_pack(custom_path, "adults", "movies", [
            {"id": "custom-movies-001", "question": "Who directed Jaws?",
             "answers": ["Spielberg", "Lucas", "Scorsese", "Coppola"],
             "correct": 0, "difficulty": "easy"},
            {"id": "custom-movies-002", "question": "Who directed Titanic?",
             "answers": ["Cameron", "Spielberg", "Bay", "Nolan"],
             "correct": 0, "difficulty": "easy"},
        ])
        bank = mod["QuestionBank"](_QZ / "questions", custom_path)
        asyncio.run(bank.async_load())

        picks = bank.pick("adults", "movies", "mixed", 2)
        assert len(picks) == 2
        for q in picks:
            assert "question" in q
            assert 0 <= q["correct"] < len(q["answers"])


def test_custom_pack_random_includes_custom():
    """Random mode should pool custom categories too."""
    mod = _load_questions_module()
    with tempfile.TemporaryDirectory() as tmp:
        custom_path = Path(tmp) / "quizify_packs"
        # Add enough custom questions that the random pool test is
        # statistically reliable (5 out of ~1013 is still rare, so we
        # pick 30 and loop 200 times).
        _make_pack(custom_path, "adults", "movies", [
            {"id": "custom-movies-001", "question": "Who directed Jaws?",
             "answers": ["Spielberg", "Lucas", "Scorsese", "Coppola"],
             "correct": 0, "difficulty": "easy"},
            {"id": "custom-movies-002", "question": "Who directed Titanic?",
             "answers": ["Cameron", "Spielberg", "Bay", "Nolan"],
             "correct": 0, "difficulty": "easy"},
            {"id": "custom-movies-003", "question": "Who directed The Matrix?",
             "answers": ["Wachowskis", "Nolan", "Cameron", "Bay"],
             "correct": 0, "difficulty": "easy"},
            {"id": "custom-movies-004", "question": "Who directed Pulp Fiction?",
             "answers": ["Tarantino", "Scorsese", "Coppola", "Spielberg"],
             "correct": 0, "difficulty": "easy"},
            {"id": "custom-movies-005", "question": "Who directed Inception?",
             "answers": ["Nolan", "Cameron", "Bay", "Tarantino"],
             "correct": 0, "difficulty": "easy"},
        ])
        bank = mod["QuestionBank"](_QZ / "questions", custom_path)
        asyncio.run(bank.async_load())

        # Pick a large random pool many times; we should eventually hit
        # at least one custom question.
        found_custom = False
        for _ in range(200):
            picks = bank.pick("adults", "random", "mixed", 30)
            for q in picks:
                if q["id"].startswith("custom-movies-"):
                    found_custom = True
                    break
            if found_custom:
                break
        assert found_custom, "Custom question never appeared in random picks"