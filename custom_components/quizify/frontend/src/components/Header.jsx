import React from "react";

export function Header({ connected, subtitle }) {
  return (
    <div className="qz-header">
      <div>
        <div className="qz-brand">Quizify</div>
        {subtitle && (
          <div className="qz-label" style={{ marginTop: 4 }}>
            {subtitle}
          </div>
        )}
      </div>
      <div className="qz-header-status">
        <span
          className={`qz-status-dot ${connected ? "" : "qz-status-off"}`}
        />
        {connected ? "Connected" : "Offline"}
      </div>
    </div>
  );
}
