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


def test_all_question_files_valid_json():
    """Every shipped question file should be valid JSON."""
    for path in (_QZ / "questions").rglob("*.json"):
        json.loads(path.read_text())


def test_bank_loads_all_categories():
    mod = _load_questions_module()
    bank = mod["QuestionBank"](_QZ / "questions")
    asyncio.run(bank.async_load())
    # Adults: 12 categories
    adult_cats = bank.categories("adults")
    assert {c["id"] for c in adult_cats} == set(_ADULTS_CATS)
    for cat in adult_cats:
        assert cat["count"] >= 10, f"adults/{cat['id']} has < 10 questions"
    # Kids: 4 categories
    kids_cats = bank.categories("kids")
    assert {c["id"] for c in kids_cats} == set(_KIDS_CATS)


def test_adults_mode_has_full_question_count():
    """Adults mode should have 12 × 84 = 1008 questions."""
    mod = _load_questions_module()
    bank = mod["QuestionBank"](_QZ / "questions")
    asyncio.run(bank.async_load())
    total = sum(c["count"] for c in bank.categories("adults"))
    assert total == 1008, f"Adults total = {total}, expected 1008"
    for cat in bank.categories("adults"):
        assert cat["count"] == 84, f"adults/{cat['id']} has {cat['count']} questions (expected 84)"


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


def test_no_duplicate_ids_across_adults_files():
    """All adults-mode IDs should be globally unique."""
    all_ids = []
    for path in (_QZ / "questions" / "adults").glob("*.json"):
        data = json.loads(path.read_text())
        all_ids.extend(q["id"] for q in data)
    assert len(all_ids) == len(set(all_ids)), "Duplicate IDs across adults question files"


def test_correct_index_always_zero_in_source():
    """We rely on `correct: 0` in source files (runtime shuffles)."""
    for path in (_QZ / "questions").rglob("*.json"):
        data = json.loads(path.read_text())
        for q in data:
            assert q["correct"] == 0, (
                f"{path}: question {q['id']} has correct != 0. "
                "Source files must keep the correct answer first; runtime shuffles."
            )


def test_question_ids_follow_naming_convention():
    """Adult IDs are `ak-<cat>-NNN`, kid IDs are `kd-<cat>-NNN`."""
    for mode_prefix, mode_dir in [("ak", "adults"), ("kd", "kids")]:
        for path in (_QZ / "questions" / mode_dir).glob("*.json"):
            data = json.loads(path.read_text())
            for q in data:
                assert q["id"].startswith(f"{mode_prefix}-"), (
                    f"{path}: id {q['id']} should start with {mode_prefix}-"
                )
