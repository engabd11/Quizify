"""Constants for the Quizify integration."""
from __future__ import annotations

from typing import Final

DOMAIN: Final = "quizify"
PANEL_URL: Final = "/quizify"
PANEL_TITLE: Final = "Quizify"
PANEL_ICON: Final = "mdi:head-question"

# Storage
STORAGE_VERSION: Final = 1
STORAGE_KEY: Final = "quizify.sessions"

# WebSocket commands (server <- client)
WS_TYPE_ADMIN_SUBSCRIBE: Final = "quizify/admin/subscribe"
WS_TYPE_PLAYER_JOIN: Final = "quizify/player/join"
WS_TYPE_PLAYER_SUBSCRIBE: Final = "quizify/player/subscribe"
WS_TYPE_PLAYER_ANSWER: Final = "quizify/player/answer"
WS_TYPE_GAME_CREATE: Final = "quizify/game/create"
WS_TYPE_GAME_START: Final = "quizify/game/start"
WS_TYPE_GAME_NEXT: Final = "quizify/game/next"
WS_TYPE_GAME_REVEAL: Final = "quizify/game/reveal"
WS_TYPE_GAME_END: Final = "quizify/game/end"
WS_TYPE_GAME_REMATCH: Final = "quizify/game/rematch"
WS_TYPE_LIST_CATEGORIES: Final = "quizify/categories/list"
WS_TYPE_LIST_SPEAKERS: Final = "quizify/speakers/list"

# Event types (server -> client, in subscriptions)
EVENT_GAME_UPDATED: Final = "game_updated"
EVENT_QUESTION: Final = "question"
EVENT_REVEAL: Final = "reveal"
EVENT_SCOREBOARD: Final = "scoreboard"
EVENT_GAME_ENDED: Final = "game_ended"
EVENT_PLAYER_JOINED: Final = "player_joined"
EVENT_PLAYER_ANSWERED: Final = "player_answered"

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
CATEGORY_RANDOM: Final = "random"
CATEGORIES: Final = [
    CATEGORY_GENERAL,
    CATEGORY_SCIENCE,
    CATEGORY_GEOGRAPHY,
    CATEGORY_HISTORY,
]

# Scoring
BASE_POINTS: Final = 1000
SPEED_BONUS_MAX: Final = 500  # extra for instant answer
STREAK_MULTIPLIER_3: Final = 1.25
STREAK_MULTIPLIER_5: Final = 1.5
STREAK_MULTIPLIER_10: Final = 2.0

# Timing (seconds)
DEFAULT_QUESTION_TIME: Final = 20
DEFAULT_REVEAL_TIME: Final = 5
DEFAULT_QUESTIONS_PER_ROUND: Final = 10

# Game states
STATE_LOBBY: Final = "lobby"
STATE_QUESTION: Final = "question"
STATE_REVEAL: Final = "reveal"
STATE_SCOREBOARD: Final = "scoreboard"
STATE_ENDED: Final = "ended"

# Config
CONF_MUSIC_PLAYER: Final = "music_player"
CONF_DEFAULT_MODE: Final = "default_mode"
