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
  random: "Random Mix",
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
