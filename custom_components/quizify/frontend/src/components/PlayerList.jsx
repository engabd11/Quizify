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
      {players.map((p) => {
        const className = `qz-player-row${
          p.player_id === highlightId ? " qz-highlight" : ""
        }`;
        return (
          <div key={p.player_id} className={className}>
            <div className="qz-player-avatar">{initials(p.name)}</div>
            <div className="qz-player-name">{p.name}</div>
            <div className="qz-player-score">
              {p.score.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Scoreboard({ players, highlightId }) {
  if (!players || players.length === 0) return null;
  return (
    <div className="qz-scoreboard-list">
      {players.map((p, idx) => {
        const classes = ["qz-scoreboard-row"];
        if (idx < 3) classes.push("qz-top");
        if (p.player_id === highlightId) classes.push("qz-highlight");
        return (
          <div key={p.player_id} className={classes.join(" ")}>
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
        );
      })}
    </div>
  );
}
