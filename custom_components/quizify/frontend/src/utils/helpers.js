/**
 * Small helpers used across components.
 */

export const LETTERS = ["A", "B", "C", "D", "E", "F"];

export const MODE_LABELS = {
  adults: "Adults",
  kids: "Kids",
};

export const MODE_DESCRIPTIONS = {
  adults: "Trickier questions, broader topics",
  kids: "Age-appropriate, simpler wording",
};

export const CATEGORY_LABELS = {
  general_knowledge: "General Knowledge",
  science: "Science",
  geography: "Geography",
  history: "History",
  sport: "Sport",
  food_and_drink: "Food & Drink",
  literature: "Literature",
  language: "Language & Words",
  art: "Art & Architecture",
  technology: "Technology & Inventions",
  mythology: "Mythology & Religion",
  animals: "Animals & Nature",
  random: "Random Mix",
};

// Emoji icons used by category tiles in the lobby.
export const CATEGORY_ICONS = {
  general_knowledge: "🧠",
  science: "🔬",
  geography: "🌍",
  history: "🏛️",
  sport: "⚽",
  food_and_drink: "🍷",
  literature: "📚",
  language: "💬",
  art: "🎨",
  technology: "💻",
  mythology: "⚡",
  animals: "🦁",
  random: "🎲",
};

export const DIFFICULTY_LABELS = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  mixed: "Mixed",
};

export function initials(name) {
  return (name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

export function buildJoinUrl(joinCode) {
  return `${window.location.origin}/quizify/join/${joinCode}`;
}

export function buildQrUrl(data) {
  return `/api/quizify/qr?data=${encodeURIComponent(data)}`;
}

export function nowSeconds() {
  return Date.now() / 1000;
}
