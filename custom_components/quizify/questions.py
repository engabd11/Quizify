"""Question bank loader for Quizify.

Questions live in `questions/<mode>/<category>.json`. Each file is a list of:
    {
        "id": "unique-stable-id",
        "question": "What is the capital of France?",
        "answers": ["Paris", "London", "Berlin", "Madrid"],
        "correct": 0,
        "difficulty": "easy" | "medium" | "hard",
        "explanation": "Optional short fact for the reveal screen."
    }

Keep IDs stable so that contributors can update wording without losing
history. The first answer in `answers` is the correct one only if
`correct: 0` — shuffle is applied per-game so order doesn't leak.
"""
from __future__ import annotations

import asyncio
import json
import logging
import random
from pathlib import Path
from typing import Any

from .const import (
    CATEGORIES_BY_MODE,
    DIFFICULTY_MIXED,
    MODES,
)

_LOGGER = logging.getLogger(__name__)

_REQUIRED_FIELDS = {"id", "question", "answers", "correct", "difficulty"}
_VALID_DIFFICULTIES = {"easy", "medium", "hard"}


class QuestionBankError(Exception):
    """Raised on malformed question banks."""


class QuestionBank:
    """In-memory question bank loaded from JSON files."""

    def __init__(self, base_path: Path) -> None:
        self._base_path = base_path
        # {mode: {category: [questions]}}
        self._questions: dict[str, dict[str, list[dict[str, Any]]]] = {
            mode: {} for mode in MODES
        }
        self._loaded = False

    async def async_load(self) -> None:
        """Load all question files from disk (off the event loop)."""
        if self._loaded:
            return
        await asyncio.get_running_loop().run_in_executor(None, self._load)
        self._loaded = True

    def _load(self) -> None:
        for mode in MODES:
            mode_dir = self._base_path / mode
            if not mode_dir.is_dir():
                _LOGGER.warning("Question directory missing: %s", mode_dir)
                continue
            for category in CATEGORIES_BY_MODE.get(mode, []):
                path = mode_dir / f"{category}.json"
                if not path.exists():
                    _LOGGER.warning("Question file missing: %s", path)
                    self._questions[mode][category] = []
                    continue
                try:
                    with path.open("r", encoding="utf-8") as fh:
                        data = json.load(fh)
                except (OSError, json.JSONDecodeError) as err:
                    _LOGGER.error("Failed to parse %s: %s", path, err)
                    self._questions[mode][category] = []
                    continue
                self._questions[mode][category] = self._validate(data, path)

    @staticmethod
    def _validate(data: Any, path: Path) -> list[dict[str, Any]]:
        if not isinstance(data, list):
            _LOGGER.error("%s: expected a list, got %s", path, type(data))
            return []
        valid: list[dict[str, Any]] = []
        seen_ids: set[str] = set()
        for idx, item in enumerate(data):
            if not isinstance(item, dict):
                _LOGGER.warning("%s[%d]: not an object", path, idx)
                continue
            missing = _REQUIRED_FIELDS - set(item.keys())
            if missing:
                _LOGGER.warning("%s[%d]: missing fields %s", path, idx, missing)
                continue
            if item["difficulty"] not in _VALID_DIFFICULTIES:
                _LOGGER.warning(
                    "%s[%d]: invalid difficulty %r", path, idx, item["difficulty"]
                )
                continue
            answers = item["answers"]
            if not isinstance(answers, list) or len(answers) < 2 or len(answers) > 6:
                _LOGGER.warning("%s[%d]: needs 2-6 answers", path, idx)
                continue
            if not isinstance(item["correct"], int) or not (
                0 <= item["correct"] < len(answers)
            ):
                _LOGGER.warning("%s[%d]: invalid 'correct' index", path, idx)
                continue
            qid = str(item["id"])
            if qid in seen_ids:
                _LOGGER.warning("%s[%d]: duplicate id %r", path, idx, qid)
                continue
            seen_ids.add(qid)
            valid.append(item)
        return valid

    def categories(self, mode: str) -> list[dict[str, Any]]:
        """Return categories available for a mode with counts."""
        if mode not in self._questions:
            return []
        return [
            {"id": cat, "count": len(self._questions[mode].get(cat, []))}
            for cat in CATEGORIES_BY_MODE.get(mode, [])
        ]

    def pick(
        self,
        mode: str,
        category: str,
        difficulty: str,
        count: int,
        exclude_ids: set[str] | None = None,
    ) -> list[dict[str, Any]]:
        """Pick `count` questions for a round.

        Returns shuffled questions with shuffled answer order. Each question
        in the result has `answers` reordered randomly and `correct` updated
        to point at the new index of the correct answer.
        """
        exclude_ids = exclude_ids or set()
        if mode not in self._questions:
            return []

        # Build pool
        pool: list[dict[str, Any]] = []
        if category == "random":
            for cat_questions in self._questions[mode].values():
                pool.extend(cat_questions)
        else:
            pool = list(self._questions[mode].get(category, []))

        if difficulty != DIFFICULTY_MIXED:
            pool = [q for q in pool if q["difficulty"] == difficulty]

        pool = [q for q in pool if q["id"] not in exclude_ids]

        if not pool:
            _LOGGER.warning(
                "No questions available for mode=%s category=%s difficulty=%s",
                mode,
                category,
                difficulty,
            )
            return []

        random.shuffle(pool)
        selected = pool[:count]

        return [self._shuffle_answers(q) for q in selected]

    @staticmethod
    def _shuffle_answers(question: dict[str, Any]) -> dict[str, Any]:
        """Return a copy with answers shuffled and `correct` updated."""
        original_correct = question["answers"][question["correct"]]
        shuffled = list(question["answers"])
        random.shuffle(shuffled)
        new_correct = shuffled.index(original_correct)
        return {
            **question,
            "answers": shuffled,
            "correct": new_correct,
        }
