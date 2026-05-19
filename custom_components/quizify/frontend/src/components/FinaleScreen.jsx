import React from "react";
import { Scoreboard } from "./PlayerList";

export function FinaleScreen({ players, onRematch, onEnd, highlightId }) {
  const winner = players?.[0];
  return (
    <div>
      <div className="qz-finale">
        <div className="qz-trophy">🏆</div>
        <h1 className="qz-winner-name">{winner?.name || "—"}</h1>
        <div className="qz-winner-score">
          {(winner?.score || 0).toLocaleString()} points
        </div>
        <div className="qz-row-wrap" style={{ justifyContent: "center" }}>
          {onRematch && (
            <button
              type="button"
              className="qz-btn qz-btn-primary"
              onClick={onRematch}
            >
              Rematch
            </button>
          )}
          {onEnd && (
            <button
              type="button"
              className="qz-btn qz-btn-danger"
              onClick={onEnd}
            >
              End Game
            </button>
          )}
        </div>
      </div>
      <div className="qz-card">
        <div className="qz-label" style={{ marginBottom: 12 }}>
          Final standings
        </div>
        <Scoreboard players={players} highlightId={highlightId} />
      </div>
    </div>
  );
}
