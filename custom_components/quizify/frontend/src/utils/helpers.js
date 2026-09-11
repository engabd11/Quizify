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

// Humanise a raw category id that doesn't have a built-in label.
// e.g. "pop_culture" -> "Pop Culture", "movies_and_tv" -> "Movies & TV"
export function humaniseCategoryId(id) {
  return id
    .replace(/_/g, " ")
    .replace(/\band\b/gi, "&")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Get a label for a category, using the built-in label if available,
// otherwise humanising the id. This lets custom question packs show
// up with readable names without the frontend needing to know about
// them in advance.
export function categoryLabel(id) {
  return CATEGORY_LABELS[id] || humaniseCategoryId(id);
}

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
  // Query-string form mirrors beatify's /beatify/play?game=... pattern,
  // which is more robust than path-parameter routing in Home Assistant's
  // HTTP layer. Older path-param URLs (/quizify/join/ABCDEF) still work via
  // a server-side 302 redirect, so QR codes printed before this change keep
  // working.
  return `${window.location.origin}/quizify/play?code=${encodeURIComponent(joinCode)}`;
}

export function buildQrUrl(data) {
  return `/api/quizify/qr?data=${encodeURIComponent(data)}`;
}

export function nowSeconds() {
  return Date.now() / 1000;
}
