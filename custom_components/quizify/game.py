"""Game state machine for Quizify.

One ``GameSession`` represents a single quiz from creation through to the
finale. It emits state changes via async callbacks that the WebSocket layer
uses to fan out to admin and player subscribers.

Concurrency: a per-session ``asyncio.Lock`` serializes answer submissions
and state transitions so a late answer cannot be recorded against the next
question's index.
"""
from __future__ import annotations

import asyncio
import logging
import secrets
import time
from collections.abc import Awaitable, Callable
from dataclasses import dataclass, field
from typing import Any

from homeassistant.core import HomeAssistant

from .const import (
    BASE_POINTS,
    DEFAULT_QUESTION_TIME,
    DEFAULT_QUESTIONS_PER_ROUND,
    DEFAULT_REVEAL_TIME,
    EVENT_GAME_ENDED,
    EVENT_PLAYER_ANSWERED,
    EVENT_PLAYER_JOINED,
    EVENT_QUESTION,
    EVENT_REVEAL,
    SPEED_BONUS_MAX,
    STATE_ENDED,
    STATE_LOBBY,
    STATE_QUESTION,
    STATE_REVEAL,
    STREAK_MULTIPLIER_10,
    STREAK_MULTIPLIER_3,
    STREAK_MULTIPLIER_5,
)
from .questions import QuestionBank

_LOGGER = logging.getLogger(__name__)

Listener = Callable[[dict[str, Any]], Awaitable[None]]


@dataclass
class Player:
    """A player in a game session."""

    player_id: str
    name: str
    score: int = 0
    streak: int = 0
    best_streak: int = 0
    correct_count: int = 0
    answers: dict[int, dict[str, Any]] = field(default_factory=dict)
    joined_at: float = field(default_factory=time.time)

    def to_dict(self) -> dict[str, Any]:
        return {
            "player_id": self.player_id,
            "name": self.name,
            "score": self.score,
            "streak": self.streak,
            "best_streak": self.best_streak,
            "correct_count": self.correct_count,
        }


@dataclass
class GameSettings:
    """Settings selected by the admin at game creation."""

    mode: str
    category: str
    difficulty: str
    questions_per_round: int = DEFAULT_QUESTIONS_PER_ROUND
    question_time: int = DEFAULT_QUESTION_TIME
    reveal_time: int = DEFAULT_REVEAL_TIME
    music_player: str | None = None
    music_uri: str | None = None
    tts_entity: str | None = None  # tts.* entity for announcements

    def to_dict(self) -> dict[str, Any]:
        return {
            "mode": self.mode,
            "category": self.category,
            "difficulty": self.difficulty,
            "questions_per_round": self.questions_per_round,
            "question_time": self.question_time,
            "reveal_time": self.reveal_time,
            "music_player": self.music_player,
            "music_uri": self.music_uri,
            "tts_entity": self.tts_entity,
        }


class GameSession:
    """A single quiz game from creation to end."""

    def __init__(
        self,
        session_id: str,
        settings: GameSettings,
        bank: QuestionBank,
        hass: HomeAssistant | None = None,
    ) -> None:
        self.session_id = session_id
        self.join_code = self._generate_join_code()
        self.settings = settings
        self._bank = bank
        self._hass = hass
        self.state: str = STATE_LOBBY
        self.players: dict[str, Player] = {}
        self.questions: list[dict[str, Any]] = []
        self.current_index: int = -1
        self.question_started_at: float = 0.0
        self.created_at: float = time.time()
        self._listeners: set[Listener] = set()
        self._task: asyncio.Task[None] | None = None
        self._cancelled = False
        self._all_answered: asyncio.Event = asyncio.Event()
        self._answer_lock = asyncio.Lock()

    # --- player management -------------------------------------------------

    def add_player(self, name: str) -> Player:
        """Add a new player, returning the Player object."""
        player_id = secrets.token_urlsafe(8)
        existing_names = {p.name.lower() for p in self.players.values()}
        base_name = (name or "").strip()[:20] or "Player"
        final_name = base_name
        n = 2
        while final_name.lower() in existing_names:
            final_name = f"{base_name} {n}"
            n += 1
        player = Player(player_id=player_id, name=final_name)
        # Late joiners inherit the average score so they aren't out of contention.
        if self.players and self.state != STATE_LOBBY:
            avg = sum(p.score for p in self.players.values()) // max(
                1, len(self.players)
            )
            player.score = avg
        self.players[player_id] = player
        if self._hass is not None:
            # Fire-and-forget broadcast that a player joined.
            self._hass.async_create_task(
                self._emit(EVENT_PLAYER_JOINED, {"player": player.to_dict()})
            )
        return player

    def remove_player(self, player_id: str) -> None:
        self.players.pop(player_id, None)

    # --- listeners ---------------------------------------------------------

    def subscribe(self, listener: Listener) -> Callable[[], None]:
        """Register a listener; returns an unsubscribe callable."""
        self._listeners.add(listener)

        def unsubscribe() -> None:
            self._listeners.discard(listener)

        return unsubscribe

    async def _emit(self, event_type: str, payload: dict[str, Any]) -> None:
        msg = {"event": event_type, **payload}
        for listener in list(self._listeners):
            try:
                await listener(msg)
            except Exception:  # pragma: no cover - defensive
                _LOGGER.exception("Listener raised; continuing")

    # --- game flow ---------------------------------------------------------

    async def start(self) -> None:
        """Start the game (transitions from lobby to first question)."""
        if self.state != STATE_LOBBY:
            return
        self.questions = self._bank.pick(
            mode=self.settings.mode,
            category=self.settings.category,
            difficulty=self.settings.difficulty,
            count=self.settings.questions_per_round,
        )
        if not self.questions:
            _LOGGER.error("No questions available for game %s", self.session_id)
            self.state = STATE_ENDED
            await self._emit(EVENT_GAME_ENDED, {"reason": "no_questions"})
            return
        self.current_index = -1
        # Announce game start via TTS
        player_count = len(self.players)
        names = [p.name for p in list(self.players.values())[:3]]
        names_str = ", ".join(names)
        if player_count > 3:
            names_str += f" and {player_count - 3} others who probably shouldn't be trusted"
        start_lines = [
            f"ATTENTION HUMANS! Quizify is about to BEGIN! {player_count} brave souls have entered the arena — {names_str}. "
            f"Only one shall emerge victorious, and the rest will need to seriously reconsider their life choices. "
            f"There are {self.settings.questions_per_round} questions. You have {self.settings.question_time} seconds each. GO!",

            f"Ladies and gentlemen and everyone in between — welcome to Quizify! "
            f"We have {player_count} contestants today: {names_str}. "
            f"Fun fact: statistically, most of you will get at least one question embarrassingly wrong. Good luck!",

            f"QUIZ TIME! Put down your phones — yes, you — no cheating! "
            f"Competing today: {names_str}, plus {player_count - min(player_count, 3)} more magnificent specimens of humanity. "
            f"May the smartest brain win. And if that's not you, may you at least lose with dignity!",
        ]
        import random as _random
        announcement = _random.choice(start_lines)
        await self._announce(announcement)
        self._task = asyncio.create_task(self._run_round())

    async def _run_round(self) -> None:
        try:
            while (
                self.current_index + 1 < len(self.questions)
                and not self._cancelled
            ):
                await self._next_question()
            if not self._cancelled:
                await self._end_game()
        except asyncio.CancelledError:
            raise
        except Exception:
            _LOGGER.exception("Round loop failed; ending game")
            await self._end_game()

    async def _next_question(self) -> None:
        async with self._answer_lock:
            self.current_index += 1
            self.state = STATE_QUESTION
            self.question_started_at = time.time()
            self._all_answered.clear()
            question = self.questions[self.current_index]
        # Emit a player-safe view (no correct answer).
        await self._emit(
            EVENT_QUESTION,
            {
                "index": self.current_index,
                "total": len(self.questions),
                "question": {
                    "id": question["id"],
                    "question": question["question"],
                    "answers": question["answers"],
                    "difficulty": question["difficulty"],
                },
                "deadline": self.question_started_at + self.settings.question_time,
            },
        )
        try:
            await asyncio.wait_for(
                self._all_answered.wait(),
                timeout=self.settings.question_time,
            )
        except asyncio.TimeoutError:
            pass
        await self._reveal()

    async def _reveal(self) -> None:
        async with self._answer_lock:
            self.state = STATE_REVEAL
            question = self.questions[self.current_index]
        await self._emit(
            EVENT_REVEAL,
            {
                "index": self.current_index,
                "correct": question["correct"],
                "explanation": question.get("explanation"),
                "players": [p.to_dict() for p in self._ranked_players()],
            },
        )
        await asyncio.sleep(self.settings.reveal_time)

    async def _end_game(self) -> None:
        self.state = STATE_ENDED
        ranked = self._ranked_players()
        # Announce the winner via TTS
        if ranked:
            winner = ranked[0]
            import random as _random
            end_lines = [
                f"AND THE WINNER IS... {winner.name}! With a jaw-dropping {winner.score:,} points! "
                f"Everyone else: better luck next time. {winner.name}, please accept your imaginary trophy "
                f"and bragging rights that will last approximately until someone challenges you to a rematch.",

                f"GAME OVER! {winner.name} has DESTROYED the competition with {winner.score:,} points! "
                f"The rest of you put up a valiant effort — truly, it was almost impressive. "
                f"Almost. Congratulations {winner.name}, you magnificent know-it-all!",

                f"The quiz has spoken! {winner.name} is our CHAMPION with {winner.score:,} points! "
                f"Fun fact: {winner.name} answered more questions correctly than anyone here. "
                f"Less fun fact: everyone else will be thinking about this for at least a week.",
            ]
            await self._announce(_random.choice(end_lines))
        await self._emit(
            EVENT_GAME_ENDED,
            {
                "players": [p.to_dict() for p in ranked],
                "winner": ranked[0].to_dict() if ranked else None,
                "questions_played": self.current_index + 1,
            },
        )

    async def _announce(self, message: str) -> None:
        """Speak a TTS announcement on the music player entity."""
        if self._hass is None:
            return
        music_player = self.settings.music_player
        tts_entity = self.settings.tts_entity
        if not music_player and not tts_entity:
            return
        # Target: prefer explicit tts_entity, fall back to music_player
        target = tts_entity or music_player
        if not target:
            return
        try:
            await self._hass.services.async_call(
                "tts",
                "speak",
                {
                    "entity_id": target,
                    "message": message,
                    "cache": False,
                },
                blocking=False,
            )
        except Exception:
            _LOGGER.debug("TTS announcement failed", exc_info=True)

    def _ranked_players(self) -> list[Player]:
        return sorted(
            self.players.values(),
            key=lambda p: (-p.score, p.name.lower()),
        )

    async def submit_answer(self, player_id: str, answer_index: int) -> None:
        """Record a player's answer for the current question."""
        async with self._answer_lock:
            if self.state != STATE_QUESTION:
                return
            if player_id not in self.players:
                return
            if self.current_index < 0 or self.current_index >= len(self.questions):
                return
            player = self.players[player_id]
            if self.current_index in player.answers:
                return

            question = self.questions[self.current_index]
            elapsed = time.time() - self.question_started_at
            elapsed = max(0.0, min(elapsed, float(self.settings.question_time)))
            is_correct = answer_index == question["correct"]

            points = 0
            if is_correct:
                speed_ratio = 1.0 - (elapsed / max(1, self.settings.question_time))
                points = int(BASE_POINTS + SPEED_BONUS_MAX * speed_ratio)
                player.streak += 1
                player.best_streak = max(player.best_streak, player.streak)
                player.correct_count += 1
                if player.streak >= 10:
                    points = int(points * STREAK_MULTIPLIER_10)
                elif player.streak >= 5:
                    points = int(points * STREAK_MULTIPLIER_5)
                elif player.streak >= 3:
                    points = int(points * STREAK_MULTIPLIER_3)
                player.score += points
            else:
                player.streak = 0

            player.answers[self.current_index] = {
                "answer": answer_index,
                "correct": is_correct,
                "points": points,
                "elapsed": elapsed,
            }

            current_index = self.current_index
            answered_count = sum(
                1
                for p in self.players.values()
                if current_index in p.answers
            )
            total_players = len(self.players)
            all_answered = answered_count >= total_players and total_players > 0

        await self._emit(
            EVENT_PLAYER_ANSWERED,
            {
                "player_id": player.player_id,
                "name": player.name,
                "answered_count": answered_count,
                "total_players": total_players,
            },
        )
        if all_answered:
            self._all_answered.set()

    async def cancel(self) -> None:
        """Cancel the game from outside."""
        self._cancelled = True
        if self._task and not self._task.done():
            self._task.cancel()
            try:
                await self._task
            except (asyncio.CancelledError, Exception):
                pass
        self.state = STATE_ENDED
        await self._emit(EVENT_GAME_ENDED, {"reason": "cancelled"})

    # --- serialization -----------------------------------------------------

    def to_dict(self, include_correct: bool = False) -> dict[str, Any]:
        """Render the game state for transmission to a client."""
        current_question: dict[str, Any] | None = None
        if 0 <= self.current_index < len(self.questions):
            q = self.questions[self.current_index]
            current_question = {
                "id": q["id"],
                "question": q["question"],
                "answers": q["answers"],
                "difficulty": q["difficulty"],
                "index": self.current_index,
                "total": len(self.questions),
                "deadline": self.question_started_at + self.settings.question_time,
            }
            if include_correct and self.state in (STATE_REVEAL, STATE_ENDED):
                current_question["correct"] = q["correct"]
                current_question["explanation"] = q.get("explanation")

        return {
            "session_id": self.session_id,
            "join_code": self.join_code,
            "state": self.state,
            "settings": self.settings.to_dict(),
            "players": [p.to_dict() for p in self._ranked_players()],
            "current_question": current_question,
            "created_at": self.created_at,
        }

    @staticmethod
    def _generate_join_code() -> str:
        """Short, human-friendly join code (no ambiguous chars)."""
        alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        return "".join(secrets.choice(alphabet) for _ in range(6))
