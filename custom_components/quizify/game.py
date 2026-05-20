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
import re
import secrets
import time
from collections.abc import Awaitable, Callable
from dataclasses import dataclass, field
from typing import Any

from homeassistant.core import HomeAssistant

from .const import (
    ANNOUNCEMENT_MAX_WAIT,
    ANNOUNCEMENT_MIN_WAIT,
    BASE_POINTS,
    DEFAULT_QUESTION_TIME,
    DEFAULT_QUESTIONS_PER_ROUND,
    DEFAULT_REVEAL_TIME,
    DOUBLE_POINTS_MULTIPLIER,
    DOUBLE_POINTS_PENALTY,
    EVENT_ANNOUNCING,
    EVENT_GAME_ENDED,
    EVENT_LIFELINE_ARMED,
    EVENT_PAUSED,
    EVENT_PLAYER_ANSWERED,
    EVENT_PLAYER_JOINED,
    EVENT_QUESTION,
    EVENT_RESUMED,
    EVENT_REVEAL,
    MAX_PLAYER_NAME_LENGTH,
    MAX_PLAYERS_PER_SESSION,
    SPEED_BONUS_MAX,
    STATE_ANNOUNCING,
    STATE_ENDED,
    STATE_LOBBY,
    STATE_PAUSED,
    STATE_QUESTION,
    STATE_REVEAL,
    STREAK_MULTIPLIER_10,
    STREAK_MULTIPLIER_3,
    STREAK_MULTIPLIER_5,
)
from .questions import QuestionBank

_LOGGER = logging.getLogger(__name__)

Listener = Callable[[dict[str, Any]], Awaitable[None]]


class SessionFullError(Exception):
    """Raised when a player tries to join a session at capacity."""


def _sanitize_player_name(name: str) -> str:
    """Strip control chars / zero-width chars and cap length.

    Player names appear in the UI, in the TTS announcement string, and in
    HA sensor attributes. Control characters and zero-width glyphs can
    break TTS pronunciation, make scoreboard rows look mangled, and let a
    determined player impersonate another by appending invisible chars.
    We allow normal printable text (including non-Latin scripts and
    emoji) and strip the dangerous bits.
    """
    if not name:
        return ""
    cleaned_chars: list[str] = []
    for ch in name:
        # Drop ASCII control + line breaks + tab
        if ord(ch) < 0x20 or ord(ch) == 0x7F:
            continue
        # Drop zero-width joiners / non-joiners / BOM-likes that don't
        # render but can be used to spoof identical-looking names.
        if ch in ("\u200b", "\u200c", "\u200d", "\u2060", "\ufeff"):
            continue
        cleaned_chars.append(ch)
    # Collapse internal whitespace runs to a single space.
    cleaned = "".join(cleaned_chars).strip()
    # Re-collapse any double spaces from the strip.
    while "  " in cleaned:
        cleaned = cleaned.replace("  ", " ")
    return cleaned[:MAX_PLAYER_NAME_LENGTH]


# Regex compiled once at import time. Matches anything inside *asterisks*
# (stage directions like *gasps dramatically*) which Piper and similar
# TTS engines read aloud literally otherwise.
_STAGE_DIRECTION_RE = re.compile(r"\*[^*\n]+\*")
# Match ellipses written either as three dots or the … character. Piper
# pauses for an unnatural length on these and the personality templates
# overuse them. We replace with a normal period.
_ELLIPSIS_RE = re.compile(r"\.{2,}|…")


def _sanitize_for_tts(text: str) -> str:
    """Make a string safe and natural for a text-to-speech engine.

    Local TTS engines like Piper read every character literally — they
    don't know that ``*gasps dramatically*`` is a stage direction. They
    say it out loud as "asterisk gasps dramatically asterisk", which is
    both unfunny and breaks the immersion the personality is going for.

    We strip:
    - Stage directions in *asterisks* (the most common offender in the
      "soap" personality templates).
    - Long ellipses (``...`` or ``…``) replaced with a single period —
      Piper holds these for an awkward pause.
    - Multiple whitespace runs are collapsed.

    We deliberately do NOT touch:
    - ALL CAPS — this is intentional in the "hype" / "sports" personalities.
      Most TTS engines pronounce normal capitalised words fine; the few
      that spell out caps letter-by-letter are a TTS config issue, not
      something to paper over here.
    - Apostrophes and contractions.
    - Punctuation that affects prosody (commas, exclamation marks).
    """
    if not text:
        return ""
    cleaned = _STAGE_DIRECTION_RE.sub("", text)
    cleaned = _ELLIPSIS_RE.sub(".", cleaned)
    # Collapse runs of whitespace (the asterisk-strip can leave doubles).
    while "  " in cleaned:
        cleaned = cleaned.replace("  ", " ")
    # Stage-direction removal can leave dangling " ." or " ," — tidy.
    cleaned = re.sub(r"\s+([.,!?])", r"\1", cleaned)
    return cleaned.strip()


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
    # Lifeline tracking — armed for the CURRENT question only.
    double_points_armed: bool = False
    # Reveal lifeline — usable once per entire game.
    peek_answer_used: bool = False
    # Stats across the game
    fastest_answer: float | None = None  # seconds; correct answers only
    total_elapsed: float = 0.0
    answered_count: int = 0
    double_points_wins: int = 0
    double_points_losses: int = 0

    def to_dict(self) -> dict[str, Any]:
        return {
            "player_id": self.player_id,
            "name": self.name,
            "score": self.score,
            "streak": self.streak,
            "best_streak": self.best_streak,
            "correct_count": self.correct_count,
            "double_points_armed": self.double_points_armed,
            "peek_answer_used": self.peek_answer_used,
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
    # Optional conversation agent (Ollama, OpenAI, etc.) used to
    # generate fresh announcement text instead of using static templates.
    # When None, the static personality-themed templates are used.
    conversation_agent_id: str | None = None

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
            "conversation_agent_id": self.conversation_agent_id,
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
        # Pause tracking. When ``_pause_event`` is *clear* the game is
        # paused; ``_run_round`` and ``_next_question`` block on it. When set,
        # the game runs normally. We start "running" (event set).
        self._pause_event: asyncio.Event = asyncio.Event()
        self._pause_event.set()
        self._paused_at: float = 0.0
        self._total_paused: float = 0.0  # accumulated paused-time for current Q
        # The player who initiated the current pause (for display).
        self._paused_by: str | None = None
        # Allows the manager to issue side effects (music/duck) on pause.
        self._music_paused_cb: Callable[[], Awaitable[None]] | None = None
        self._music_resumed_cb: Callable[[], Awaitable[None]] | None = None
        # Filled in at end-of-game so to_dict() can replay highlights to
        # late-subscribing clients (e.g. a player who reconnects after the
        # finale event has already been fanned out).
        self._highlights: dict[str, Any] = {}
        self._ended_players: list[dict[str, Any]] = []

    # --- player management -------------------------------------------------

    def add_player(self, name: str) -> Player:
        """Add a new player, returning the Player object.

        Raises:
            SessionFullError: if the session has hit ``MAX_PLAYERS_PER_SESSION``.
        """
        if len(self.players) >= MAX_PLAYERS_PER_SESSION:
            raise SessionFullError(
                f"Session is full ({MAX_PLAYERS_PER_SESSION} players max)"
            )
        player_id = secrets.token_urlsafe(8)
        existing_names = {p.name.lower() for p in self.players.values()}
        # Strip control chars / zero-width glyphs before length capping so
        # invisible-character collisions can't be smuggled past the dedup.
        base_name = _sanitize_player_name(name) or "Player"
        final_name = base_name
        n = 2
        while final_name.lower() in existing_names:
            final_name = f"{base_name} {n}"
            # Re-cap in case the " 2"/" 12"/etc. suffix overshoots.
            final_name = final_name[:MAX_PLAYER_NAME_LENGTH]
            n += 1
            if n > MAX_PLAYERS_PER_SESSION + 2:
                # Defensive: should be unreachable thanks to the cap, but
                # never let this loop forever.
                final_name = f"{base_name} {player_id[:4]}"
                break
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
        """Start the game (transitions from lobby to first question).

        We first move into an ``announcing`` state, speak the intro
        announcement, and wait for the speaker to finish playing it before
        flipping into the first question. That way players don't see Q1 pop
        up on their phones while the room is still hearing the intro.

        If a conversation agent (Ollama, etc.) is configured, we generate
        a fresh announcement here, before the TTS call. The generation
        happens inside the announcing window the user sees — which is
        natural-feeling anyway — so the game itself never waits on the
        LLM during the audio path.
        """
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
        # Pre-roll: announce, wait for it to finish, THEN start questions.
        self.state = STATE_ANNOUNCING
        await self._emit(EVENT_ANNOUNCING, {"message": "Get ready…"})
        # If there's no TTS configured, fall through immediately (no wait).
        if self.settings.tts_entity:
            announcement = await self._resolve_start_announcement()
            await self._announce(announcement)
            # `blocking=True` in _announce already waits for playback to
            # finish; the polling fallback is here for TTS providers
            # that ignore blocking (rare, but seen in the wild).
            await self._wait_for_announcement_to_finish()
        self._task = asyncio.create_task(self._run_round())

    async def _resolve_start_announcement(self) -> str:
        """Get the start announcement text — AI-generated or static.

        If a conversation agent is configured, try it first with a hard
        timeout. On any failure (timeout, model errors, empty response,
        agent not found) we silently fall back to the static template.
        The game never blocks longer than ``CONVERSATION_TIMEOUT`` on
        this path because the helper applies the timeout internally.
        """
        agent_id = self.settings.conversation_agent_id
        if agent_id and self._hass is not None:
            # Local import to avoid pulling the helper (and its homeassistant
            # dependency) when the integration runs in the test environment.
            from .conversation_helper import generate_announcement
            text = await generate_announcement(
                self._hass,
                agent_id=agent_id,
                kind="start",
                personality=self.settings.tts_personality,
                context={
                    "player_names": [p.name for p in self.players.values()],
                    "questions": self.settings.questions_per_round,
                    "seconds": self.settings.question_time,
                },
            )
            if text:
                return text
        return self._build_start_announcement()

    async def _wait_for_announcement_to_finish(self) -> None:
        """Block until the speaker is no longer playing the announcement.

        ``tts.speak`` is fire-and-forget; the audio plays on the configured
        media_player asynchronously. We watch the media_player's state and
        wait until it leaves the ``playing`` state (or we exceed a hard
        cap). A short floor ensures we still pause briefly even on speakers
        that report state transitions oddly.
        """
        if self._hass is None or not self.settings.music_player:
            # No speaker to watch — just sleep a short floor.
            await asyncio.sleep(ANNOUNCEMENT_MIN_WAIT)
            return
        speaker = self.settings.music_player
        deadline = time.time() + ANNOUNCEMENT_MAX_WAIT
        floor = time.time() + ANNOUNCEMENT_MIN_WAIT
        # Wait until the media_player enters "playing" (TTS started). Some
        # services queue the announcement, others start synchronously; cap
        # the look-up window short so we don't hang on misconfigured rigs.
        started_playing = False
        while time.time() < deadline:
            if self._cancelled:
                return
            state = self._hass.states.get(speaker)
            if state is not None and state.state == "playing":
                started_playing = True
                break
            await asyncio.sleep(0.2)
        if not started_playing:
            # Couldn't detect playback at all (mute speaker? TTS failed?).
            # Wait the floor and give up so the game doesn't stall.
            remaining = max(0.0, floor - time.time())
            if remaining > 0:
                await asyncio.sleep(remaining)
            return
        # Now wait for it to stop playing.
        while time.time() < deadline:
            if self._cancelled:
                return
            state = self._hass.states.get(speaker)
            if state is None or state.state != "playing":
                break
            await asyncio.sleep(0.3)
        # Ensure at least the floor elapses overall — gives a tiny breath
        # between the speaker finishing and the first question appearing.
        remaining = max(0.0, floor - time.time())
        if remaining > 0:
            await asyncio.sleep(remaining)

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
                f"Oh. OH! After all these years, after everything we've been through, "
                f"the quiz is finally beginning. {names_str}, and yes, {count} souls in total, gather 'round. "
                f"Someone tonight will be betrayed. Someone will triumph. Someone will cry. This is Quizify.",

                f"Previously on Quizify: {names_str} dared to believe they were the smartest. Tonight, "
                f"with {n} questions standing between them and glory, only one can claim the ultimate prize. "
                f"Will it be love? Will it be revenge? It will be trivia.",
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

        # Pre-build runner-up phrases per personality to avoid apostrophes inside f-string {}
        ru_hype     = f"Runner up {runner_up_name} gave it everything — respect." if runner_up_name else ""
        ru_drill    = f"Second place {runner_up_name} — not bad, soldier. Not good. But not bad." if runner_up_name else ""
        ru_soap     = f"And {runner_up_name}, so close. So heartbreakingly close." if runner_up_name else ""
        ru_conspi   = f"Runner up {runner_up_name} — look into it." if runner_up_name else ""
        ru_parent   = f"And {runner_up_name} — second place is nothing to be ashamed of. I am a little ashamed. But you should not be." if runner_up_name else ""
        ru_sports   = f"And {runner_up_name} pushing all the way to the line — what heart! What determination!" if runner_up_name else ""

        lines: dict[str, list[str]] = {
            "hype": [
                f"AND THE WINNER IS... {winner_name}!!! {winner_score:,} POINTS! "
                f"ABSOLUTE SCENES! {winner_name} has done it! They've actually DONE IT! "
                f"{ru_hype} "
                f"Someone get this legend a trophy! Or at least a high five! QUIZIFY IS OVER! GOODNIGHT!",

                f"STOP EVERYTHING! {winner_name} IS YOUR QUIZIFY CHAMPION WITH {winner_score:,} POINTS! "
                f"I'm not crying, YOU'RE crying! What a performance! What a HUMAN! "
                f"Everyone else: you were incredible. {winner_name}: you were MORE incredible. Rematch anyone?!",
            ],
            "drill": [
                f"AT EASE! The results are IN! {winner_name} — {winner_score:,} points — you are DISMISSED with HONOURS! "
                f"The rest of you: drop and give me twenty, then report back for remedial reading! "
                f"{ru_drill} "
                f"FALL OUT!",

                f"GAME OVER, RECRUITS! {winner_name} has shown the most grit, the most knowledge, the most DISCIPLINE — "
                f"{winner_score:,} points does not lie! The others may return to civilian life knowing they gave it their all. "
                f"It just was not enough. DISMISSED!",
            ],
            "soap": [
                f"{winner_name}. After everything, after all of that, "
                f"it was {winner_name} all along. {winner_score:,} points. "
                f"{ru_soap} "
                f"This is not the end. This is never the end. Until next time, on Quizify.",

                f"They said it could not be done. They said {winner_name} was just a dreamer. "
                f"But here, with {winner_score:,} points burning in their heart, {winner_name} has proven them all wrong. "
                f"The trophy is real. The glory is real. The others must live with their choices.",
            ],
            "conspiracy": [
                f"Interesting. VERY interesting. {winner_name} — {winner_score:,} points. "
                f"Some would say that is too perfect. Some would ask: did {winner_name} know the questions in ADVANCE? "
                f"We are not saying anything. We are just asking questions. Congratulations, {winner_name}. "
                f"They will be watching you now.",

                f"The results have been... certified. By whom? We cannot say. {winner_name}: {winner_score:,} points. "
                f"{ru_conspi} "
                f"Was this quiz rigged? Were the answers planted? {winner_name} knows. And so do THEY. Goodnight.",
            ],
            "parent": [
                f"Well. {winner_name} won. {winner_score:,} points. "
                f"I mean, I always believed in you, {winner_name}. I just did not always show it. "
                f"{ru_parent} "
                f"Are you hungry? I made something.",

                f"Okay so {winner_name} got {winner_score:,} points and technically won. Good. That is good. "
                f"The others tried very hard and I am sure they will do better when they study more, which I have mentioned before. "
                f"Anyway. {winner_name}. Well done. Do you want to call your grandmother? She would love to hear this.",
            ],
            "sports": [
                f"FINAL SCORE! {winner_name} — {winner_score:,} POINTS! WHAT A PERFORMANCE! "
                f"Textbook execution from start to FINISH! "
                f"{ru_sports} "
                f"Folks, we have WITNESSED something special tonight in the Quizify arena! "
                f"I will be talking about {winner_name} for YEARS! Goodnight everyone!",

                f"AND THAT IS THE FINAL BUZZER! {winner_name} takes the trophy with {winner_score:,} points in a DOMINANT display! "
                f"The stats do not lie, the scoreboard does not lie — {winner_name} simply wanted it more tonight! "
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
        # Wait here if the game is currently paused (in case the previous
        # question's reveal ended while paused).
        await self._pause_event.wait()
        if self._cancelled:
            return
        async with self._answer_lock:
            self.current_index += 1
            self.state = STATE_QUESTION
            self.question_started_at = time.time()
            self._total_paused = 0.0
            self._all_answered.clear()
            question = self.questions[self.current_index]
            # Clear any leftover lifeline arms from the previous question.
            for p in self.players.values():
                p.double_points_armed = False
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
        # Loop so that if we get paused mid-question, the wait extends.
        while True:
            timeout = self._remaining_question_time()
            if timeout <= 0:
                break
            try:
                await asyncio.wait_for(
                    self._all_answered.wait(),
                    timeout=timeout,
                )
                break  # all answered
            except asyncio.TimeoutError:
                # Either real timeout, or we entered pause. If paused, wait
                # for resume and recompute remaining time.
                if not self._pause_event.is_set():
                    await self._pause_event.wait()
                    if self._cancelled:
                        return
                    continue
                break  # actually ran out
        await self._reveal()

    def _remaining_question_time(self) -> float:
        """How much active question time is left, accounting for pauses."""
        elapsed = time.time() - self.question_started_at - self._total_paused
        return max(0.0, float(self.settings.question_time) - elapsed)

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
        # Pause-aware sleep — accumulate sleeps in small chunks and pause
        # the countdown while ``_pause_event`` is clear.
        deadline = time.time() + self.settings.reveal_time
        while not self._cancelled and time.time() < deadline:
            await self._pause_event.wait()
            if self._cancelled:
                return
            remaining = deadline - time.time()
            if remaining <= 0:
                break
            # Sleep in short slices so a pause request interrupts promptly.
            await asyncio.sleep(min(0.5, remaining))

    async def _end_game(self) -> None:
        self.state = STATE_ENDED
        ranked = self._ranked_players()
        highlights = self._compute_highlights(ranked)
        # Stash on the session so to_dict() can expose it to late subscribers
        # and reconnecting players.
        self._highlights = highlights
        self._ended_players = [self._player_with_stats(p) for p in ranked]
        if ranked:
            winner = ranked[0]
            runner_up = ranked[1].name if len(ranked) > 1 else None
            announcement = await self._resolve_end_announcement(
                winner.name, winner.score, runner_up
            )
            await self._announce(announcement)
        await self._emit(
            EVENT_GAME_ENDED,
            {
                "players": self._ended_players,
                "winner": ranked[0].to_dict() if ranked else None,
                "questions_played": self.current_index + 1,
                "highlights": highlights,
            },
        )

    async def _resolve_end_announcement(
        self,
        winner_name: str,
        winner_score: int,
        runner_up_name: str | None,
    ) -> str:
        """Get the end announcement text — AI-generated or static.

        Same fallback logic as ``_resolve_start_announcement``: if an
        agent is configured we try it first with a hard timeout; on any
        failure we fall back to the static template. The end-of-game
        screen is already showing on player phones by the time this
        runs, so a 30s LLM call here is invisible to the UX.
        """
        agent_id = self.settings.conversation_agent_id
        if agent_id and self._hass is not None:
            from .conversation_helper import generate_announcement
            text = await generate_announcement(
                self._hass,
                agent_id=agent_id,
                kind="end",
                personality=self.settings.tts_personality,
                context={
                    "winner_name": winner_name,
                    "winner_score": winner_score,
                    "runner_up_name": runner_up_name,
                },
            )
            if text:
                return text
        return self._build_end_announcement(winner_name, winner_score, runner_up_name)

    def _player_with_stats(self, player: Player) -> dict[str, Any]:
        """Serialize a player with extended stats for the finale screen."""
        total_qs = max(1, self.current_index + 1)
        accuracy = round(100 * player.correct_count / total_qs)
        avg_time = (
            round(player.total_elapsed / player.answered_count, 2)
            if player.answered_count else None
        )
        return {
            **player.to_dict(),
            "accuracy": accuracy,
            "answered_count": player.answered_count,
            "avg_response_time": avg_time,
            "fastest_answer": (
                round(player.fastest_answer, 2)
                if player.fastest_answer is not None else None
            ),
            "double_points_wins": player.double_points_wins,
            "double_points_losses": player.double_points_losses,
        }

    def _compute_highlights(self, ranked: list[Player]) -> dict[str, Any]:
        """Build a 'badges' dict for the finale: who is fastest, sharpest, etc.

        Each entry is either ``None`` (nobody qualifies) or a dict with
        ``player_id``, ``name``, and a ``value`` string suitable for direct
        display. We compute these defensively — every metric guards against
        empty data and ties.
        """
        if not ranked:
            return {}
        total_qs = max(1, self.current_index + 1)

        def best(key, accept=lambda v: v is not None, prefer_low=False):
            scored = [(getattr(p, key), p) for p in ranked]
            scored = [(v, p) for v, p in scored if accept(v)]
            if not scored:
                return None
            scored.sort(key=lambda t: t[0], reverse=not prefer_low)
            v, p = scored[0]
            # Reject zero / ties on the bottom value.
            return {"player_id": p.player_id, "name": p.name, "raw": v}

        winner = ranked[0]
        result: dict[str, Any] = {
            "winner": {
                "player_id": winner.player_id,
                "name": winner.name,
                "value": f"{winner.score:,} points",
            }
        }

        # Speedster — lowest average response time among players who answered.
        speedster = best(
            "total_elapsed",
            accept=lambda v: v is not None,
            prefer_low=True,
        )
        # We want average, not total — recompute properly.
        avg_candidates = [
            (p.total_elapsed / p.answered_count, p)
            for p in ranked if p.answered_count > 0
        ]
        if avg_candidates:
            avg_candidates.sort(key=lambda t: t[0])
            avg, p = avg_candidates[0]
            result["speedster"] = {
                "player_id": p.player_id,
                "name": p.name,
                "value": f"{avg:.1f}s avg",
            }

        # Sharpshooter — highest accuracy (must have answered ≥ half the qs).
        threshold = max(1, total_qs // 2)
        acc_candidates = [
            (p.correct_count / total_qs, p)
            for p in ranked if p.answered_count >= threshold
        ]
        if acc_candidates:
            acc_candidates.sort(key=lambda t: t[0], reverse=True)
            acc, p = acc_candidates[0]
            if p.correct_count > 0:
                result["sharpshooter"] = {
                    "player_id": p.player_id,
                    "name": p.name,
                    "value": f"{round(acc * 100)}% accuracy",
                }

        # On Fire — longest streak (≥3).
        streak_candidates = [p for p in ranked if p.best_streak >= 3]
        if streak_candidates:
            streak_candidates.sort(key=lambda p: p.best_streak, reverse=True)
            p = streak_candidates[0]
            result["on_fire"] = {
                "player_id": p.player_id,
                "name": p.name,
                "value": f"🔥 {p.best_streak} in a row",
            }

        # Lightning — fastest single correct answer.
        fast_candidates = [
            (p.fastest_answer, p) for p in ranked
            if p.fastest_answer is not None
        ]
        if fast_candidates:
            fast_candidates.sort(key=lambda t: t[0])
            t, p = fast_candidates[0]
            result["lightning"] = {
                "player_id": p.player_id,
                "name": p.name,
                "value": f"{t:.1f}s on Q",
            }

        # High Roller — most successful double-point bets won.
        roller_candidates = [
            (p.double_points_wins, p) for p in ranked
            if p.double_points_wins > 0
        ]
        if roller_candidates:
            roller_candidates.sort(key=lambda t: t[0], reverse=True)
            n, p = roller_candidates[0]
            result["high_roller"] = {
                "player_id": p.player_id,
                "name": p.name,
                "value": f"{n} double-or-nothing win{'s' if n != 1 else ''}",
            }

        # Brave Soul — most losses on double-or-nothing bets (consolation).
        loser_candidates = [
            (p.double_points_losses, p) for p in ranked
            if p.double_points_losses > 0
        ]
        if loser_candidates:
            loser_candidates.sort(key=lambda t: t[0], reverse=True)
            n, p = loser_candidates[0]
            # Only award if they actually lost more than they won
            if p.double_points_losses > p.double_points_wins:
                result["brave_soul"] = {
                    "player_id": p.player_id,
                    "name": p.name,
                    "value": f"{n} risky bet{'s' if n != 1 else ''} (oof)",
                }
        return result

    # --- lifelines / pause -------------------------------------------------

    async def arm_lifeline(self, player_id: str, lifeline: str) -> bool:
        """Arm a per-question lifeline for the given player.

        Currently supports ``double_points`` only. Returns True if the
        lifeline was successfully armed.
        """
        async with self._answer_lock:
            if self.state != STATE_QUESTION:
                return False
            player = self.players.get(player_id)
            if player is None:
                return False
            # Already answered? too late.
            if self.current_index in player.answers:
                return False
            if lifeline == "double_points":
                if player.double_points_armed:
                    return False
                player.double_points_armed = True
                armed = True
            else:
                return False
        if armed:
            await self._emit(
                EVENT_LIFELINE_ARMED,
                {
                    "player_id": player_id,
                    "lifeline": lifeline,
                    "question_index": self.current_index,
                },
            )
        return armed

    async def pause(self, initiated_by: str | None = None) -> bool:
        """Pause the game. Returns True if it transitioned to paused.

        Can be invoked from a player (their player_id) or admin (None). When
        we pause during a question, we freeze the question deadline by
        starting a paused-period clock; on resume, we add the elapsed paused
        time to ``_total_paused`` so ``_remaining_question_time`` skips it.
        """
        if self.state not in (STATE_QUESTION, STATE_REVEAL):
            return False
        if not self._pause_event.is_set():
            return False  # already paused
        self._pause_event.clear()
        self._paused_at = time.time()
        # Stash the running state so we can return to it on resume.
        self._state_before_pause = self.state
        self.state = STATE_PAUSED
        self._paused_by = initiated_by
        paused_by_name = (
            self.players[initiated_by].name
            if initiated_by and initiated_by in self.players else None
        )
        # Side-effect: pause music if a callback was registered.
        if self._music_paused_cb is not None:
            try:
                await self._music_paused_cb()
            except Exception:  # pragma: no cover
                _LOGGER.debug("Music pause callback raised", exc_info=True)
        await self._emit(
            EVENT_PAUSED,
            {
                "paused_by": initiated_by,
                "paused_by_name": paused_by_name,
            },
        )
        return True

    async def resume_game(self, initiated_by: str | None = None) -> bool:
        """Resume from pause. Returns True if it transitioned out of paused."""
        if self.state != STATE_PAUSED:
            return False
        if self._pause_event.is_set():
            return False
        now = time.time()
        if self._paused_at:
            self._total_paused += now - self._paused_at
            self._paused_at = 0.0
        prev = getattr(self, "_state_before_pause", STATE_QUESTION)
        self.state = prev
        self._paused_by = None
        self._pause_event.set()
        if self._music_resumed_cb is not None:
            try:
                await self._music_resumed_cb()
            except Exception:  # pragma: no cover
                _LOGGER.debug("Music resume callback raised", exc_info=True)
        await self._emit(
            EVENT_RESUMED,
            {
                "resumed_by": initiated_by,
            },
        )
        return True

    def set_music_callbacks(
        self,
        on_pause: Callable[[], Awaitable[None]] | None,
        on_resume: Callable[[], Awaitable[None]] | None,
    ) -> None:
        """Wire in async side-effects for pause/resume (music control)."""
        self._music_paused_cb = on_pause
        self._music_resumed_cb = on_resume

    # --- TTS ---------------------------------------------------------------

    async def _announce(self, message: str) -> None:
        """Speak a TTS announcement and wait for it to finish.

        tts.speak expects:
          entity_id            = the TTS engine entity  (e.g. tts.piper)
          media_player_entity_id = the speaker to play on
          message              = text to speak

        We pass ``blocking=True`` so HA returns from this call only after
        the audio has actually finished playing. That's the cleanest way
        to gate the next game state on the announcement being done —
        much more reliable than polling the media_player's state, which
        is racy when the speaker is also playing background music and
        only briefly transitions through the TTS clip.

        The message is run through ``_sanitize_for_tts`` first: stage
        directions in ``*asterisks*`` and long ellipses are stripped so
        engines like Piper don't read them out literally.
        """
        if self._hass is None:
            return
        tts_entity = self.settings.tts_entity      # TTS engine entity
        music_player = self.settings.music_player  # speaker
        if not tts_entity:
            return  # TTS not configured — skip silently
        sanitized = _sanitize_for_tts(message)
        if not sanitized:
            return
        try:
            service_data: dict[str, Any] = {
                "entity_id": tts_entity,
                "message": sanitized,
                "cache": False,
            }
            if music_player:
                service_data["media_player_entity_id"] = music_player
            # blocking=True: HA waits until TTS finishes playing on the
            # configured media player before returning. This is the
            # *primary* mechanism that prevents Q1 from appearing while
            # the intro is still being spoken. The polling fallback in
            # _wait_for_announcement_to_finish is now belt-and-braces
            # for the rare TTS provider that ignores blocking.
            await self._hass.services.async_call(
                "tts",
                "speak",
                service_data,
                blocking=True,
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
            # Elapsed for scoring: total time spent *unpaused* on this question.
            elapsed = time.time() - self.question_started_at - self._total_paused
            elapsed = max(0.0, min(elapsed, float(self.settings.question_time)))
            is_correct = answer_index == question["correct"]
            doubled = player.double_points_armed

            points = 0
            penalty = 0
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
                if doubled:
                    points = points * DOUBLE_POINTS_MULTIPLIER
                    player.double_points_wins += 1
                player.score += points
                # Track fastest correct answer time for highlight badges.
                if player.fastest_answer is None or elapsed < player.fastest_answer:
                    player.fastest_answer = elapsed
            else:
                player.streak = 0
                if doubled:
                    penalty = DOUBLE_POINTS_PENALTY
                    player.score -= penalty
                    player.double_points_losses += 1

            # Stats — counted on every submission, regardless of correctness.
            player.answered_count += 1
            player.total_elapsed += elapsed
            # Lifeline was a one-shot bet for this question only — disarm
            # whether they won or lost.
            player.double_points_armed = False

            player.answers[self.current_index] = {
                "answer": answer_index,
                "correct": is_correct,
                "points": points,
                "penalty": penalty,
                "elapsed": elapsed,
                "doubled": doubled,
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
        # Release the pause gate so any waiting coroutine can exit cleanly.
        self._pause_event.set()
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
        # When paused, expose the state the game will return to so the client
        # can keep rendering the right surface (question vs reveal).
        effective_state = (
            getattr(self, "_state_before_pause", self.state)
            if self.state == STATE_PAUSED else self.state
        )
        if 0 <= self.current_index < len(self.questions):
            q = self.questions[self.current_index]
            # Bake accumulated paused time into the deadline so client timers
            # don't tick down while we're paused. When *currently* paused we
            # also add the in-progress paused interval, freezing the clock.
            pause_offset = self._total_paused
            if self.state == STATE_PAUSED and self._paused_at:
                pause_offset += time.time() - self._paused_at
            current_question = {
                "id": q["id"],
                "question": q["question"],
                "answers": q["answers"],
                "difficulty": q["difficulty"],
                "index": self.current_index,
                "total": len(self.questions),
                "deadline": (
                    self.question_started_at
                    + self.settings.question_time
                    + pause_offset
                ),
            }
            if effective_state in (STATE_REVEAL, STATE_ENDED):
                # During reveal/end, correct answer and explanation go to everyone
                current_question["correct"] = q["correct"]
                current_question["explanation"] = q.get("explanation")
            elif include_correct:
                # Admin-only: also show correct during question phase
                current_question["correct"] = q["correct"]
                current_question["explanation"] = q.get("explanation")

        paused_by_name = None
        if self._paused_by and self._paused_by in self.players:
            paused_by_name = self.players[self._paused_by].name

        # When the game is over, hand clients the stats-rich roster computed
        # at end-of-game; otherwise serve the live, lighter-weight roster.
        if self.state == STATE_ENDED and self._ended_players:
            players_payload = self._ended_players
        else:
            players_payload = [p.to_dict() for p in self._ranked_players()]

        return {
            "session_id": self.session_id,
            "join_code": self.join_code,
            "state": self.state,
            "effective_state": effective_state,
            "is_paused": self.state == STATE_PAUSED,
            "paused_by": self._paused_by,
            "paused_by_name": paused_by_name,
            "settings": self.settings.to_dict(),
            "players": players_payload,
            "current_question": current_question,
            "created_at": self.created_at,
            "highlights": self._highlights if self.state == STATE_ENDED else None,
        }

    @staticmethod
    def _generate_join_code() -> str:
        """Short, human-friendly join code (no ambiguous chars)."""
        alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        return "".join(secrets.choice(alphabet) for _ in range(6))
