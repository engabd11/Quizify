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
    tts_personality: str = "hype"  # hype | drill | soap | conspiracy | parent | sports

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
            "tts_personality": self.tts_personality,
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
        announcement = self._build_start_announcement()
        await self._announce(announcement)
        self._task = asyncio.create_task(self._run_round())

    def _player_names_str(self, max_names: int = 3) -> tuple[str, int]:
        """Return (names_string, total_count) for use in announcements."""
        players = list(self.players.values())
        count = len(players)
        names = [p.name for p in players[:max_names]]
        names_str = ", ".join(names)
        if count > max_names:
            extra = count - max_names
            names_str += f" and {extra} other{'s' if extra > 1 else ''}"
        return names_str, count

    def _build_start_announcement(self) -> str:
        import random as _r
        names_str, count = self._player_names_str()
        n = self.settings.questions_per_round
        t = self.settings.question_time
        p = self.settings.tts_personality

        lines: dict[str, list[str]] = {
            "hype": [
                f"YOOOO let's GOOO! Quizify is LIVE! {count} absolute legends have shown up tonight — {names_str}! "
                f"We've got {n} questions, {t} seconds each, and zero chill! Let's FIND OUT who's the biggest brain in the room! "
                f"May the best human WIN!",

                f"OH WOW OH WOW OH WOW! The quiz is starting RIGHT NOW! {names_str} — you are all BEAUTIFUL and SMART and only ONE of you will prove it! "
                f"Get ready for {n} spicy questions! Fingers on the buttons, people! HERE WE GO!",
            ],
            "drill": [
                f"ATTENTION! This is NOT a drill — well, actually it IS a drill, a KNOWLEDGE drill! "
                f"Recruits {names_str}, and {count - min(count, 3)} others, fall IN! "
                f"You have {n} questions. You have {t} seconds per question. You will NOT use lifelines as a crutch. NOW MOVE IT!",

                f"LISTEN UP MAGGOTS! {count} of you think you're smart enough for Quizify. Spoiler: most of you are NOT. "
                f"I'm looking at you, {names_str}. {n} questions. {t} seconds each. No excuses. NO WHINING. BEGIN!",
            ],
            "soap": [
                f"*gasps dramatically* Oh... OH! After all these years... after everything we've been through... "
                f"the quiz is finally... BEGINNING. {names_str} — and yes, {count} souls total — gather 'round. "
                f"Someone tonight will be betrayed. Someone will triumph. Someone will cry. This... is Quizify.",

                f"Previously on Quizify... {names_str} dared to believe they were the smartest. Tonight, "
                f"with {n} questions standing between them and glory, only ONE can claim the ultimate prize. "
                f"Will it be love? Will it be revenge? *dramatic sting* It will be... TRIVIA.",
            ],
            "conspiracy": [
                f"They don't want you to know the answers. The elites, the algorithm, the shadow council — "
                f"they've kept this knowledge hidden for CENTURIES. But tonight, {names_str} — "
                f"and let's be honest, ALL {count} of you are being watched — will have {t} seconds "
                f"to prove they've done their research. {n} questions. Trust no one. Begin.",

                f"Wake up, {names_str}! The quiz has ALWAYS been happening — you just weren't allowed to see it. "
                f"Tonight, {count} brave truth-seekers gather to answer {n} questions THEY don't want answered. "
                f"The chips are tracked. The answers are monitored. Play anyway. The truth is out there.",
            ],
            "parent": [
                f"Oh, you finally decided to show up. All {count} of you. That's... fine. That's great. "
                f"{names_str} — I'm not going to say I'm not disappointed, because honestly I had higher hopes. "
                f"But here we are. {n} questions. {t} seconds each. Try your best. Whatever that means to you.",

                f"I just want to say that I love all of you unconditionally. That said — {names_str} — "
                f"I have seen your Google search histories and I am CONCERNED. Tonight you have {n} chances "
                f"to prove me wrong. {t} seconds per question. Don't let me down. Again.",
            ],
            "sports": [
                f"AND WE ARE LIVE from the Quizify arena! {count} competitors on the field tonight — "
                f"{names_str} — and WHAT a roster we've got folks! {n} questions, {t} seconds on the clock each time, "
                f"and the crowd is ABSOLUTELY ELECTRIC! The whistle blows in THREE... TWO... ONE... IT'S GAME TIME!",

                f"FOLKS, I have been commentating quiz shows for thirty years and I have NEVER seen a lineup like this! "
                f"{names_str} — and all {count} of them — coming in with tremendous energy tonight! "
                f"Will we see a repeat champion? Will there be upsets? {n} questions will tell us EVERYTHING! "
                f"The game starts NOW and I for one cannot WAIT!",
            ],
        }
        pool = lines.get(p, lines["hype"])
        return _r.choice(pool)

    def _build_end_announcement(self, winner_name: str, winner_score: int, runner_up_name: str | None) -> str:
        import random as _r
        p = self.settings.tts_personality
        _, count = self._player_names_str()

        lines: dict[str, list[str]] = {
            "hype": [
                f"AND THE WINNER IS... {winner_name}!!! {winner_score:,} POINTS! "
                f"ABSOLUTE SCENES! {winner_name} has done it! They've actually DONE IT! "
                f"{'Runner up ' + runner_up_name + ' gave it everything — respect.' if runner_up_name else ''} "
                f"Someone get this legend a trophy! Or at least a high five! QUIZIFY IS OVER! GOODNIGHT!",

                f"STOP EVERYTHING! {winner_name} IS YOUR QUIZIFY CHAMPION WITH {winner_score:,} POINTS! "
                f"I'm not crying, YOU'RE crying! What a performance! What a HUMAN! "
                f"Everyone else: you were incredible. {winner_name}: you were MORE incredible. Rematch anyone?!",
            ],
            "drill": [
                f"AT EASE! The results are IN! {winner_name} — {winner_score:,} points — you are DISMISSED with HONOURS! "
                f"The rest of you: drop and give me twenty, then report back for remedial reading! "
                f"{'Second place ' + runner_up_name + ' — not bad, soldier. Not good. But not bad.' if runner_up_name else ''} "
                f"FALL OUT!",

                f"GAME OVER, RECRUITS! {winner_name} has shown the most grit, the most knowledge, the most DISCIPLINE — "
                f"{winner_score:,} points does not lie! The others may return to civilian life knowing they gave it their all. "
                f"It just wasn't enough. DISMISSED!",
            ],
            "soap": [
                f"*long pause* ... {winner_name}. *another pause* After everything... after ALL of that... "
                f"it was {winner_name} all along. {winner_score:,} points. "
                f"{'And ' + runner_up_name + '... so close. So heartbreakingly close.' if runner_up_name else ''} "
                f"*swells of orchestral music* This is not the end. This is never the end. Until next time... on Quizify.",

                f"*dramatic whisper* They said it couldn't be done. They said {winner_name} was just a dreamer. "
                f"But here — with {winner_score:,} points burning in their heart — {winner_name} has proven them ALL wrong. "
                f"The trophy is real. The glory is real. The others... must live with their choices.",
            ],
            "conspiracy": [
                f"Interesting. VERY interesting. {winner_name} — {winner_score:,} points. "
                f"Some would say that's too perfect. Some would ask: did {winner_name} know the questions in ADVANCE? "
                f"We're not saying anything. We're just asking questions. Congratulations, {winner_name}. "
                f"They'll be watching you now.",

                f"The results have been... certified. By whom? We cannot say. {winner_name}: {winner_score:,} points. "
                f"{'Runner up ' + runner_up_name + ' — look into it.' if runner_up_name else ''} "
                f"Was this quiz rigged? Were the answers planted? {winner_name} knows. And so do THEY. Goodnight.",
            ],
            "parent": [
                f"Well. {winner_name} won. {winner_score:,} points. "
                f"I mean, I always believed in you, {winner_name}. I just didn't always show it. "
                f"{'And ' + runner_up_name + ' — second place is nothing to be ashamed of. I am a little ashamed. But YOU shouldn\\'t be.' if runner_up_name else ''} "
                f"Are you hungry? I made something.",

                f"Okay so {winner_name} got {winner_score:,} points and technically won. Good. That's good. "
                f"The others tried very hard and I'm sure they'll do better when they study more, which I've mentioned before. "
                f"Anyway. {winner_name}. Well done. Do you want to call your grandmother? She'd love to hear this.",
            ],
            "sports": [
                f"FINAL SCORE! {winner_name} — {winner_score:,} POINTS! WHAT A PERFORMANCE! "
                f"Textbook execution from start to FINISH! "
                f"{'And ' + runner_up_name + ' pushing all the way to the line — what heart! What determination!' if runner_up_name else ''} "
                f"Folks, we have WITNESSED something special tonight in the Quizify arena! "
                f"I'll be talking about {winner_name} for YEARS! Goodnight everyone!",

                f"AND THAT IS THE FINAL BUZZER! {winner_name} takes the trophy with {winner_score:,} points in a DOMINANT display! "
                f"The stats don't lie, the scoreboard doesn't lie — {winner_name} simply wanted it more tonight! "
                f"Back to the studio — this has been Quizify! WHAT a night of sport!",
            ],
        }
        pool = lines.get(p, lines["hype"])
        return _r.choice(pool)

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
        if ranked:
            winner = ranked[0]
            runner_up = ranked[1].name if len(ranked) > 1 else None
            announcement = self._build_end_announcement(winner.name, winner.score, runner_up)
            await self._announce(announcement)
        await self._emit(
            EVENT_GAME_ENDED,
            {
                "players": [p.to_dict() for p in ranked],
                "winner": ranked[0].to_dict() if ranked else None,
                "questions_played": self.current_index + 1,
            },
        )

    async def _announce(self, message: str) -> None:
        """Speak a TTS announcement.

        tts.speak expects:
          entity_id            = the TTS engine entity  (e.g. tts.google_translate)
          media_player_entity_id = the speaker to play on (e.g. media_player.living_room)
          message              = text to speak
        """
        if self._hass is None:
            return
        tts_entity = self.settings.tts_entity      # TTS engine entity
        music_player = self.settings.music_player  # speaker
        if not tts_entity:
            return  # TTS not configured — skip silently
        try:
            service_data: dict[str, Any] = {
                "entity_id": tts_entity,
                "message": message,
                "cache": False,
            }
            if music_player:
                service_data["media_player_entity_id"] = music_player
            await self._hass.services.async_call(
                "tts",
                "speak",
                service_data,
                blocking=False,
            )
        except Exception:
            _LOGGER.warning("TTS announcement failed", exc_info=True)

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
            if self.state in (STATE_REVEAL, STATE_ENDED):
                # During reveal/end, correct answer and explanation go to everyone
                current_question["correct"] = q["correct"]
                current_question["explanation"] = q.get("explanation")
            elif include_correct:
                # Admin-only: also show correct during question phase
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
