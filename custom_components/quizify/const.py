"""Constants for the Quizify integration."""
from __future__ import annotations

from typing import Final

DOMAIN: Final = "quizify"
PANEL_URL: Final = "quizify"  # sidebar url_path (no leading slash)
PANEL_TITLE: Final = "Quizify"
PANEL_ICON: Final = "mdi:head-question"

# The custom element name the admin panel registers as. Must contain a hyphen.
PANEL_COMPONENT: Final = "quizify-panel"

# Public URLs served by the integration.
STATIC_URL: Final = "/quizify-static"
PLAYER_WS_URL: Final = "/api/quizify/player_ws"
# Public guest landing page. Players visit this with ``?code=ABCDEF``.
# This mirrors beatify's ``/beatify/play?game=...`` pattern — a single static
# HTML file served at a fixed path, with the join code read client-side from
# the query string. Path-parameter URLs (``/quizify/join/ABCDEF``) still work
# via a redirect for backward compatibility with previously-printed QR codes.
PLAY_URL: Final = "/quizify/play"
JOIN_URL_PREFIX: Final = "/quizify/join"

# Player session token TTL (seconds) — used by the unauthenticated player socket.
PLAYER_TOKEN_TTL: Final = 60 * 60 * 6  # 6 hours

# Admin WebSocket commands (authenticated via HA's websocket_api).
# Player commands live on a separate unauthenticated socket; see http_views.
WS_TYPE_ADMIN_SUBSCRIBE: Final = "quizify/admin/subscribe"
WS_TYPE_GAME_CREATE: Final = "quizify/game/create"
WS_TYPE_GAME_START: Final = "quizify/game/start"
WS_TYPE_GAME_END: Final = "quizify/game/end"
WS_TYPE_GAME_REMATCH: Final = "quizify/game/rematch"
WS_TYPE_GAME_PAUSE: Final = "quizify/game/pause"
WS_TYPE_GAME_RESUME: Final = "quizify/game/resume"
WS_TYPE_LIST_CATEGORIES: Final = "quizify/categories/list"
WS_TYPE_LIST_SPEAKERS: Final = "quizify/speakers/list"
WS_TYPE_LIST_TTS: Final = "quizify/tts/list"

# Event types (server -> client, in subscriptions)
EVENT_GAME_UPDATED: Final = "game_updated"
EVENT_QUESTION: Final = "question"
EVENT_REVEAL: Final = "reveal"
EVENT_SCOREBOARD: Final = "scoreboard"
EVENT_GAME_ENDED: Final = "game_ended"
EVENT_PLAYER_JOINED: Final = "player_joined"
EVENT_PLAYER_ANSWERED: Final = "player_answered"
EVENT_ANNOUNCING: Final = "announcing"
EVENT_PAUSED: Final = "paused"
EVENT_RESUMED: Final = "resumed"
EVENT_LIFELINE_ARMED: Final = "lifeline_armed"

# Game modes
MODE_ADULTS: Final = "adults"
MODE_KIDS: Final = "kids"
MODES: Final = [MODE_ADULTS, MODE_KIDS]

# Difficulty
DIFFICULTY_EASY: Final = "easy"
DIFFICULTY_MEDIUM: Final = "medium"
DIFFICULTY_HARD: Final = "hard"
DIFFICULTY_MIXED: Final = "mixed"
DIFFICULTIES: Final = [
    DIFFICULTY_EASY,
    DIFFICULTY_MEDIUM,
    DIFFICULTY_HARD,
    DIFFICULTY_MIXED,
]

# Categories (must match question file names under questions/<mode>/)
CATEGORY_GENERAL: Final = "general_knowledge"
CATEGORY_SCIENCE: Final = "science"
CATEGORY_GEOGRAPHY: Final = "geography"
CATEGORY_HISTORY: Final = "history"
CATEGORY_SPORT: Final = "sport"
CATEGORY_FOOD: Final = "food_and_drink"
CATEGORY_LITERATURE: Final = "literature"
CATEGORY_LANGUAGE: Final = "language"
CATEGORY_ART: Final = "art"
CATEGORY_TECHNOLOGY: Final = "technology"
CATEGORY_MYTHOLOGY: Final = "mythology"
CATEGORY_ANIMALS: Final = "animals"
CATEGORY_RANDOM: Final = "random"
CATEGORY_MIXED_FORMAT: Final = "mixed"  # pipe-separated categories like "science|history"

# Adults-mode categories (12 categories, 84 questions each = 1008 total)
CATEGORIES_ADULTS: Final = [
    CATEGORY_GENERAL,
    CATEGORY_SCIENCE,
    CATEGORY_GEOGRAPHY,
    CATEGORY_HISTORY,
    CATEGORY_SPORT,
    CATEGORY_FOOD,
    CATEGORY_LITERATURE,
    CATEGORY_LANGUAGE,
    CATEGORY_ART,
    CATEGORY_TECHNOLOGY,
    CATEGORY_MYTHOLOGY,
    CATEGORY_ANIMALS,
]

# Kids-mode categories (kept the original 4 for now)
CATEGORIES_KIDS: Final = [
    CATEGORY_GENERAL,
    CATEGORY_SCIENCE,
    CATEGORY_GEOGRAPHY,
    CATEGORY_HISTORY,
]

# Backwards-compatibility: the union of all categories
CATEGORIES: Final = CATEGORIES_ADULTS

# Categories available per mode
CATEGORIES_BY_MODE: Final = {
    MODE_ADULTS: CATEGORIES_ADULTS,
    MODE_KIDS: CATEGORIES_KIDS,
}

# Scoring
BASE_POINTS: Final = 1000
SPEED_BONUS_MAX: Final = 500  # extra for instant answer
STREAK_MULTIPLIER_3: Final = 1.25
STREAK_MULTIPLIER_5: Final = 1.5
STREAK_MULTIPLIER_10: Final = 2.0

# Lifelines
DOUBLE_POINTS_PENALTY: Final = 1000  # subtracted on wrong answer when active
DOUBLE_POINTS_MULTIPLIER: Final = 2  # multiplied on correct answer when active

# Timing (seconds)
DEFAULT_QUESTION_TIME: Final = 20
DEFAULT_REVEAL_TIME: Final = 5
DEFAULT_QUESTIONS_PER_ROUND: Final = 10
# Cap on time to wait for the start-of-game TTS announcement to finish
# before we proceed regardless. Generous to cover ~30s personality intros.
ANNOUNCEMENT_MAX_WAIT: Final = 35.0
ANNOUNCEMENT_MIN_WAIT: Final = 4.0

# Game states
STATE_LOBBY: Final = "lobby"
STATE_ANNOUNCING: Final = "announcing"
STATE_QUESTION: Final = "question"
STATE_REVEAL: Final = "reveal"
STATE_SCOREBOARD: Final = "scoreboard"
STATE_PAUSED: Final = "paused"
STATE_ENDED: Final = "ended"

# Config
CONF_MUSIC_PLAYER: Final = "music_player"
CONF_DEFAULT_MODE: Final = "default_mode"

# --- Safety / resource limits (v1.0) ----------------------------------------
# Cap how many concurrent games a single HA instance will run. Each session
# is cheap, but unbounded creation by a runaway automation could exhaust
# memory. 16 simultaneous games in one house is well past reasonable.
MAX_CONCURRENT_SESSIONS: Final = 16

# Cap players per session. Each player holds a small Player dataclass +
# their answers; the real bottleneck is event fan-out, which is O(players).
# 25 keeps the game responsive even on a Raspberry Pi.
MAX_PLAYERS_PER_SESSION: Final = 25

# Player name length cap (also enforced client-side via the input maxLength).
MAX_PLAYER_NAME_LENGTH: Final = 20

# Cap how large a player_token / session_id we'll even try to parse on the
# unauthenticated player socket. Anything longer is malformed by definition
# and we want to reject it before doing any string work on it.
MAX_TOKEN_LENGTH: Final = 256
MAX_SESSION_ID_LENGTH: Final = 64

# Per-IP rate limit for the public QR endpoint. PIL renders QRs on a
# background thread; flooding it could starve the executor pool.
QR_RATE_LIMIT_REQUESTS: Final = 30  # per window
QR_RATE_LIMIT_WINDOW: Final = 60.0  # seconds

# Player-socket connection idle timeout. If a socket connects but doesn't
# send a join/resume within this window, we drop it. Heartbeats keep
# joined sockets alive past this.
PLAYER_WS_JOIN_TIMEOUT: Final = 30.0  # seconds

# Origin policy for the unauthenticated player WebSocket. By default we
# accept connections only from the same Origin as the HA instance, plus
# missing Origin headers (which native apps and some QR-launchers send).
# Set to False to disable Origin checking entirely (not recommended).
PLAYER_WS_STRICT_ORIGIN: Final = True

# --- AI announcement generation (optional) ---------------------------------
# If the admin picks a conversation agent (Ollama, OpenAI, etc.) the START
# and END announcements are generated fresh by the LLM instead of using the
# static templates. Generation happens AHEAD of the moment we need to
# speak, so there's never an LLM call in the audio path during the game.
#
# Timeout for one LLM call. 30s tolerates slow local models running on
# CPU; if exceeded we silently fall back to the static template so the
# game never stalls.
CONVERSATION_TIMEOUT: Final = 30.0
# Cap how many characters of LLM output we'll send to TTS. Some models
# love to ramble; this keeps announcements snappy and predictable.
CONVERSATION_MAX_CHARS: Final = 1200

WS_TYPE_LIST_CONVERSATION: Final = "quizify/conversation/list"
