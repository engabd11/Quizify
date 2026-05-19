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

export const PERSONALITIES = [
  { id: "hype",        label: "🎤 Hype Master",          desc: "Pure energy, maximum excitement" },
  { id: "drill",       label: "🪖 Drill Sergeant",        desc: "No mercy, no excuses, MOVE IT" },
  { id: "soap",        label: "🎭 Soap Opera Host",       desc: "Dramatic pauses and swelling music" },
  { id: "conspiracy",  label: "🔍 Conspiracy Theorist",   desc: "They don't want you to know the answers" },
  { id: "parent",      label: "😤 Disappointed Parent",   desc: "I'm not angry, just... disappointed" },
  { id: "sports",      label: "📺 Sports Commentator",    desc: "WHAT a performance, folks!" },
];

export function PersonalityPicker({ value, onChange }) {
  return (
    <div className="qz-stack">
      <div className="qz-label">Announcer Personality</div>
      <div className="qz-personality-grid">
        {PERSONALITIES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`qz-personality-tile${value === p.id ? " qz-active" : ""}`}
            onClick={() => onChange(p.id)}
          >
            <div className="qz-personality-label">{p.label}</div>
            <div className="qz-personality-desc">{p.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TtsPicker({ ttsEntities, value, onChange }) {
  return (
    <select
      className="qz-select"
      value={value || ""}
      onChange={(e) => onChange(e.target.value || null)}
    >
      <option value="">No TTS announcements</option>
      {ttsEntities.length === 0 && (
        <option disabled value="_none">No tts.* entities found in HA</option>
      )}
      {ttsEntities.map((e) => (
        <option key={e.entity_id} value={e.entity_id}>
          {e.name}
        </option>
      ))}
    </select>
  );
}
