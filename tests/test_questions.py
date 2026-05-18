"""Tests for the Quizify question bank."""
from __future__ import annotations

import asyncio
import json
from pathlib import Path

import pytest

# Patch out the .const relative import so we can load questions.py
# without booting Home Assistant.
import importlib.util
import sys
import types

_QZ = Path(__file__).resolve().parent.parent / "custom_components" / "quizify"


def _load_questions_module():
    src = (_QZ / "questions.py").read_text()
    src = src.replace(
        "from .const import (\n    CATEGORIES,\n    DIFFICULTY_MIXED,\n    MODES,\n)",
        (
            'CATEGORIES = ["general_knowledge", "science", "geography", "history"]\n'
            'DIFFICULTY_MIXED = "mixed"\n'
            'MODES = ["adults", "kids"]'
        ),
    )
    ns: dict = {}
    exec(compile(src, str(_QZ / "questions.py"), "exec"), ns)
    return ns


def test_all_question_files_valid_json():
    """Every shipped question file should be valid JSON."""
    for path in (_QZ / "questions").rglob("*.json"):
        json.loads(path.read_text())


def test_bank_loads_all_categories():
    mod = _load_questions_module()
    bank = mod["QuestionBank"](_QZ / "questions")
    asyncio.run(bank.async_load())
    for mode in ("adults", "kids"):
        cats = bank.categories(mode)
        ids = {c["id"] for c in cats}
        assert ids == {"general_knowledge", "science", "geography", "history"}
        for cat in cats:
            assert cat["count"] >= 10, f"{mode}/{cat['id']} has < 10 questions"


def test_pick_returns_requested_count():
    mod = _load_questions_module()
    bank = mod["QuestionBank"](_QZ / "questions")
    asyncio.run(bank.async_load())
    picks = bank.pick("adults", "general_knowledge", "mixed", 5)
    assert len(picks) == 5
    for q in picks:
        assert "question" in q
        assert "answers" in q
        assert 0 <= q["correct"] < len(q["answers"])


def test_pick_shuffles_correct_answer():
    """The correct index should re-map to the new shuffled position."""
    mod = _load_questions_module()
    bank = mod["QuestionBank"](_QZ / "questions")
    asyncio.run(bank.async_load())
    # Pick the same question many times; it should land in different
    # positions at least sometimes.
    seen_positions = set()
    for _ in range(50):
        picks = bank.pick("adults", "general_knowledge", "easy", 1)
        if picks:
            seen_positions.add(picks[0]["correct"])
    assert len(seen_positions) > 1, "Shuffle never moved the correct answer"


def test_no_duplicate_ids_within_a_file():
    for path in (_QZ / "questions").rglob("*.json"):
        data = json.loads(path.read_text())
        ids = [q["id"] for q in data]
        assert len(ids) == len(set(ids)), f"Duplicate IDs in {path}"


def test_correct_index_always_zero_in_source():
    """We rely on `correct: 0` in source files (runtime shuffles)."""
    for path in (_QZ / "questions").rglob("*.json"):
        data = json.loads(path.read_text())
        for q in data:
            assert q["correct"] == 0, (
                f"{path}: question {q['id']} has correct != 0. "
                "Source files must keep the correct answer first; runtime shuffles."
            )
