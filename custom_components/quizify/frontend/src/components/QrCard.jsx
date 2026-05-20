import React, { useState, useCallback } from "react";
import { buildJoinUrl, buildQrUrl } from "../utils/helpers";

export function QrCard({ joinCode }) {
  const joinUrl = buildJoinUrl(joinCode);
  const [copied, setCopied] = useState(null); // "code" | "url" | null

  const copy = useCallback(async (value, kind) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for browsers without async clipboard (older mobile,
        // non-HTTPS contexts). textarea + execCommand is deprecated but
        // still the most reliable cross-browser path.
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch { /* swallow */ }
        document.body.removeChild(ta);
      }
      setCopied(kind);
      setTimeout(() => setCopied((c) => (c === kind ? null : c)), 1500);
    } catch {
      // Clipboard denied — ignore, user can still long-press to copy.
    }
  }, []);

  return (
    <div className="qz-qr-card">
      <div className="qz-label">Scan to join</div>
      <div className="qz-qr-frame">
        <img src={buildQrUrl(joinUrl)} alt={`QR code for ${joinUrl}`} />
      </div>
      <button
        type="button"
        className="qz-join-code qz-join-code-copy"
        onClick={() => copy(joinCode, "code")}
        title="Click to copy the join code"
      >
        {copied === "code" ? "✓ Copied!" : joinCode}
      </button>
      <button
        type="button"
        className="qz-join-url qz-join-url-copy"
        onClick={() => copy(joinUrl, "url")}
        title="Click to copy the join link"
      >
        {copied === "url" ? "✓ Link copied!" : joinUrl}
      </button>
    </div>
  );
}
