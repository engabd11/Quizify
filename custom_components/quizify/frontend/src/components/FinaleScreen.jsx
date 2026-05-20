import React from "react";
import { Scoreboard } from "./PlayerList";

// Definitions for each badge. Order = display order on the finale screen.
// Each badge corresponds to a key the server emits in `game.highlights`.
const BADGE_DEFS = [
  { key: "winner",        emoji: "🏆", title: "Champion",       blurb: "Highest score" },
  { key: "speedster",     emoji: "🚀", title: "Speedster",      blurb: "Fastest average answer" },
  { key: "sharpshooter",  emoji: "🎯", title: "Sharpshooter",   blurb: "Highest accuracy" },
  { key: "on_fire",       emoji: "🔥", title: "On Fire",        blurb: "Longest streak" },
  { key: "lightning",     emoji: "⚡", title: "Lightning",      blurb: "Fastest single answer" },
  { key: "high_roller",   emoji: "🎰", title: "High Roller",    blurb: "Most double-or-nothing wins" },
  { key: "brave_soul",    emoji: "💀", title: "Brave Soul",     blurb: "Most risky bets gone wrong" },
];

function Badge({ def, entry, highlightId }) {
  if (!entry) return null;
  const isMe = highlightId && entry.player_id === highlightId;
  return (
    <div className={`qz-badge${isMe ? " qz-badge-mine" : ""}`}>
      <div className="qz-badge-emoji">{def.emoji}</div>
      <div className="qz-badge-body">
        <div className="qz-badge-title">{def.title}</div>
        <div className="qz-badge-name">{entry.name}</div>
        <div className="qz-badge-value">{entry.value}</div>
        <div className="qz-badge-blurb">{def.blurb}</div>
      </div>
    </div>
  );
}

function StatRow({ label, value }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="qz-stat-row">
      <span className="qz-stat-label">{label}</span>
      <span className="qz-stat-value">{value}</span>
    </div>
  );
}

function MyStatsCard({ player }) {
  if (!player) return null;
  return (
    <div className="qz-card qz-my-stats-card">
      <div className="qz-label" style={{ marginBottom: 12 }}>
        Your stats
      </div>
      <div className="qz-stats-grid">
        <StatRow label="Score" value={player.score?.toLocaleString?.() ?? player.score} />
        <StatRow label="Correct" value={`${player.correct_count ?? 0} / ${player.answered_count ?? 0}`} />
        <StatRow label="Accuracy" value={player.accuracy != null ? `${player.accuracy}%` : null} />
        <StatRow label="Avg time" value={player.avg_response_time != null ? `${player.avg_response_time}s` : null} />
        <StatRow label="Fastest answer" value={player.fastest_answer != null ? `${player.fastest_answer}s` : null} />
        <StatRow label="Best streak" value={player.best_streak ?? 0} />
        <StatRow label="Risky bets won" value={player.double_points_wins ?? 0} />
        <StatRow label="Risky bets lost" value={player.double_points_losses ?? 0} />
      </div>
    </div>
  );
}

export function FinaleScreen({
  players,
  highlights,
  onRematch,
  onEnd,
  highlightId,
}) {
  const winner = players?.[0];
  // Pick out only the badges the server actually awarded.
  const badges = BADGE_DEFS
    .map((def) => ({ def, entry: highlights?.[def.key] }))
    .filter((b) => !!b.entry);

  // If we're showing this to a player, find their own row for the stats card.
  const me = highlightId
    ? players?.find((p) => p.player_id === highlightId)
    : null;

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

      {badges.length > 0 && (
        <div className="qz-card">
          <div className="qz-label" style={{ marginBottom: 12 }}>
            Game highlights
          </div>
          <div className="qz-badges-grid">
            {badges.map(({ def, entry }) => (
              <Badge
                key={def.key}
                def={def}
                entry={entry}
                highlightId={highlightId}
              />
            ))}
          </div>
        </div>
      )}

      {me && <MyStatsCard player={me} />}

      <div className="qz-card">
        <div className="qz-label" style={{ marginBottom: 12 }}>
          Final standings
        </div>
        <Scoreboard players={players} highlightId={highlightId} />
      </div>
    </div>
  );
}
