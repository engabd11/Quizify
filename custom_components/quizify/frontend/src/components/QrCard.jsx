import React from "react";
import { buildJoinUrl, buildQrUrl } from "../utils/helpers";

export function QrCard({ joinCode }) {
  const joinUrl = buildJoinUrl(joinCode);
  return (
    <div className="qz-qr-card">
      <div className="qz-label">Scan to join</div>
      <div className="qz-qr-frame">
        <img src={buildQrUrl(joinUrl)} alt={`QR code for ${joinUrl}`} />
      </div>
      <div className="qz-join-code">{joinCode}</div>
      <div className="qz-join-url">{joinUrl}</div>
    </div>
  );
}
