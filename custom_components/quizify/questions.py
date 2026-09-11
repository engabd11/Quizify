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

## Custom question packs

Users can drop additional JSON files into `<config_dir>/quizify_packs/`
using the same directory structure:

    quizify_packs/
    ├── adults/
    │   ├── movies.json
    │   └── music.json
    └── kids/
        └── dinosaurs.json

These are loaded alongside the built-in questions and merged into the
same category lists. A custom pack can either add a new category or
extend an existing one (e.g. more `general_knowledge` questions). The
`categories()` method includes a `pack` field so the frontend can
distinguish built-in from custom categories.
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
    """In-memory question bank loaded from JSON files.

    Built-in questions are loaded from the ``questions/`` directory inside
    the integration. Optional custom packs are loaded from
    ``custom_packs_path`` if provided — typically ``<config>/quizify_packs/``.

    Custom packs can introduce new categories or extend existing ones.
    Both built-in and custom questions share the same ``_questions`` dict;
    the ``categories()`` method annotates each category with its source
    (``"builtin"`` or ``"custom"``) so the frontend can label them.
    """

    def __init__(
        self,
        base_path: Path,
        custom_packs_path: Path | None = None,
    ) -> None:
        self._base_path = base_path
        self._custom_packs_path = custom_packs_path
        # {mode: {category: [questions]}}
        self._questions: dict[str, dict[str, list[dict[str, Any]]]] = {
            mode: {} for mode in MODES
        }
        # Track which categories came from custom packs.
        # {mode: {category: "builtin" | "custom"}}
        self._category_sources: dict[str, dict[str, str]] = {
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
        """Load built-in questions, then merge custom packs on top."""
        # --- built-in questions ---
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
                    self._category_sources[mode][category] = "builtin"
                    continue
                try:
                    with path.open("r", encoding="utf-8") as fh:
                        data = json.load(fh)
                except (OSError, json.JSONDecodeError) as err:
                    _LOGGER.error("Failed to parse %s: %s", path, err)
                    self._questions[mode][category] = []
                    self._category_sources[mode][category] = "builtin"
                    continue
                self._questions[mode][category] = self._validate(data, path)
                self._category_sources[mode][category] = "builtin"

        # --- custom question packs ---
        if self._custom_packs_path and self._custom_packs_path.is_dir():
            self._load_custom_packs()

    def _load_custom_packs(self) -> None:
        """Load custom question packs from the user's config directory.

        Expected structure:
            quizify_packs/
            ├── adults/
            │   ├── movies.json
            │   └── general_knowledge.json  (extends built-in)
            └── kids/
                └── dinosaurs.json

        Custom categories (ones not in the built-in list) are added as
        new entries. Custom files that share a name with a built-in
        category *extend* that category — their questions are appended
        to the existing pool, with duplicate IDs filtered out.
        """
        assert self._custom_packs_path is not None  # guarded by caller
        custom_root = self._custom_packs_path
        for mode in MODES:
            mode_dir = custom_root / mode
            if not mode_dir.is_dir():
                continue
            for json_path in sorted(mode_dir.glob("*.json")):
                category = json_path.stem
                try:
                    with json_path.open("r", encoding="utf-8") as fh:
                        data = json.load(fh)
                except (OSError, json.JSONDecodeError) as err:
                    _LOGGER.error(
                        "Failed to parse custom pack %s: %s", json_path, err
                    )
                    continue

                validated = self._validate(data, json_path)
                if not validated:
                    continue

                existing = self._questions[mode].get(category, [])
                # Filter out questions whose ID already exists (prevents
                # duplicates when a custom pack extends a built-in category).
                existing_ids = {q["id"] for q in existing}
                merged = list(existing)
                added = 0
                for q in validated:
                    if q["id"] not in existing_ids:
                        merged.append(q)
                        existing_ids.add(q["id"])
                        added += 1

                self._questions[mode][category] = merged
                self._category_sources[mode][category] = "custom"
                _LOGGER.info(
                    "Loaded custom pack %s: %d questions (added %d new, "
                    "merged with %d existing)",
                    json_path,
                    len(validated),
                    added,
                    len(existing),
                )

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
        """Return categories available for a mode with counts and source.

        Each entry is::

            {"id": "science", "count": 84, "pack": "builtin"}

        The ``pack`` field is ``"builtin"`` for built-in categories and
        ``"custom"`` for categories loaded from custom question packs.
        """
        if mode not in self._questions:
            return []
        result: list[dict[str, Any]] = []
        # Preserve built-in category order, then append custom categories
        # in alphabetical order so the UI is stable.
        builtin_cats = CATEGORIES_BY_MODE.get(mode, [])
        seen = set()
        for cat in builtin_cats:
            if cat in self._questions[mode]:
                result.append({
                    "id": cat,
                    "count": len(self._questions[mode][cat]),
                    "pack": self._category_sources[mode].get(cat, "builtin"),
                })
                seen.add(cat)
        # Append custom-only categories (not in the built-in list).
        custom_cats = sorted(
            c for c in self._questions[mode] if c not in seen
        )
        for cat in custom_cats:
            result.append({
                "id": cat,
                "count": len(self._questions[mode][cat]),
                "pack": self._category_sources[mode].get(cat, "custom"),
            })
        return result

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
