import React from "react";
import {
  MODE_LABELS,
  MODE_DESCRIPTIONS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  DIFFICULTY_LABELS,
} from "../utils/helpers";

export function ModePicker({ value, onChange }) {
  return (
    <div className="qz-stack">
      <div className="qz-label">Mode</div>
      <div className="qz-mode-tiles">
        {Object.keys(MODE_LABELS).map((mode) => (
          <button
            key={mode}
            type="button"
            className={`qz-mode-tile ${value === mode ? "qz-active" : ""}`}
            onClick={() => onChange(mode)}
          >
            <div className="qz-mode-tile-emoji">
              {mode === "adults" ? "🧠" : "🎈"}
            </div>
            <div className="qz-mode-tile-title">{MODE_LABELS[mode]}</div>
            <div className="qz-mode-tile-desc">
              {MODE_DESCRIPTIONS[mode]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CategoryPicker({ value, onChange, available }) {
  // available is [{ id, count }] for current mode
  const items = [
    { id: "random", count: available.reduce((s, c) => s + c.count, 0) },
    ...available,
  ];
  return (
    <div className="qz-stack">
      <div className="qz-label">Category</div>
      <div className="qz-category-grid">
        {items.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`qz-category-tile ${value === c.id ? "qz-active" : ""}`}
            onClick={() => onChange(c.id)}
            disabled={c.count === 0}
            title={CATEGORY_LABELS[c.id] || c.id}
          >
            <div className="qz-category-tile-emoji">
              {CATEGORY_ICONS[c.id] || "❓"}
            </div>
            <div className="qz-category-tile-title">
              {CATEGORY_LABELS[c.id] || c.id}
            </div>
            <div className="qz-category-tile-count">{c.count} Qs</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DifficultyPicker({ value, onChange }) {
  return (
    <div className="qz-stack">
      <div className="qz-label">Difficulty</div>
      <div className="qz-pill-row">
        {Object.keys(DIFFICULTY_LABELS).map((d) => (
          <button
            key={d}
            type="button"
            className={`qz-pill ${value === d ? "qz-active" : ""}`}
            onClick={() => onChange(d)}
          >
            {DIFFICULTY_LABELS[d]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function NumberPicker({ label, value, onChange, options }) {
  return (
    <div className="qz-stack">
      <div className="qz-label">{label}</div>
      <div className="qz-pill-row">
        {options.map((n) => (
          <button
            key={n}
            type="button"
            className={`qz-pill ${value === n ? "qz-active" : ""}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SpeakerPicker({ speakers, value, onChange }) {
  return (
    <div className="qz-stack">
      <div className="qz-label">Background music (optional)</div>
      <select
        className="qz-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">No music</option>
        {speakers.map((s) => (
          <option key={s.entity_id} value={s.entity_id}>
            {s.name} {s.supports_mass ? "· Music Assistant" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TtsPicker({ speakers, value, onChange }) {
  return (
    <select
      className="qz-select"
      value={value || ""}
      onChange={(e) => onChange(e.target.value || null)}
    >
      <option value="">No TTS announcements</option>
      {speakers.map((s) => (
        <option key={s.entity_id} value={s.entity_id}>
          {s.name} {s.supports_mass ? "· Music Assistant" : ""}
        </option>
      ))}
    </select>
  );
}
