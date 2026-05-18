import React from "react";
import { initials } from "../utils/helpers";

export function PlayerList({ players, highlightId }) {
  if (!players || players.length === 0) {
    return (
      <div className="qz-empty">
        Waiting for players to join…
      </div>
    );
  }
  return (
    <div className="qz-player-list">
      {players.map((p) => (
        <div
          key={p.player_id}
          className="qz-player-row"
          style={
            p.player_id === highlightId
              ? { border: "1px solid var(--qz-accent)" }
              : undefined
          }
        >
          <div className="qz-player-avatar">{initials(p.name)}</div>
          <div className="qz-player-name">{p.name}</div>
          <div className="qz-player-score">
            {p.score.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Scoreboard({ players, highlightId }) {
  if (!players || players.length === 0) return null;
  return (
    <div className="qz-scoreboard-list">
      {players.map((p, idx) => (
        <div
          key={p.player_id}
          className={`qz-scoreboard-row ${idx < 3 ? "qz-top" : ""}`}
          style={
            p.player_id === highlightId
              ? { outline: "2px solid var(--qz-accent)" }
              : undefined
          }
        >
          <div className={`qz-rank qz-rank-${idx + 1}`}>{idx + 1}</div>
          <div>
            <strong>{p.name}</strong>
            {p.streak >= 3 && (
              <span className="qz-streak-badge">
                🔥 {p.streak}
              </span>
            )}
          </div>
          <div className="qz-player-score">
            {p.score.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
