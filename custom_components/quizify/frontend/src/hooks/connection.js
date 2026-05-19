/**
 * Connection helpers for Quizify.
 *
 * Admin: receives Home Assistant's `hass` object as a panel property, and
 *        speaks to admin-only authenticated commands via hass.callWS /
 *        hass.connection.subscribeMessage. No second WebSocket, no auth
 *        handshake, no 401.
 *
 * Player: opens a plain WebSocket to /api/quizify/player_ws and exchanges
 *         JSON frames. The server's player socket is unauthenticated by
 *         design — guests scan a QR code; the join code IS the credential.
 */

// ----- admin (hass) helpers -------------------------------------------------

export function adminCallWS(hass, message) {
  if (!hass) return Promise.reject(new Error("Not connected to Home Assistant"));
  return hass.callWS(message);
}

export function adminSubscribe(hass, message, callback) {
  if (!hass) return Promise.reject(new Error("Not connected to Home Assistant"));
  return hass.connection.subscribeMessage(callback, message);
}

// ----- player (plain WebSocket) ---------------------------------------------

const PLAYER_WS_PATH = "/api/quizify/player_ws";

export function buildPlayerWsUrl() {
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${window.location.host}${PLAYER_WS_PATH}`;
}

/**
 * Minimal reconnecting WebSocket client for the player socket.
 *
 * Usage:
 *   const conn = new PlayerConnection({
 *     onEvent: (evt) => {...},
 *     onStatus: (status) => {...}, // "connecting" | "open" | "closed"
 *   });
 *   conn.connect();
 *   conn.send({ type: "join", join_code: "ABCDEF", name: "Alice" });
 *   conn.close();
 */
export class PlayerConnection {
  constructor({ onEvent, onStatus }) {
    this._onEvent = onEvent || (() => {});
    this._onStatus = onStatus || (() => {});
    this._ws = null;
    this._closedByUser = false;
    this._backoff = 500;
    this._maxBackoff = 10_000;
    this._pingTimer = null;
    this._reconnectTimer = null;
    // Optional resume payload — set after a successful join. Triggers a
    // resume on every reconnect until the player explicitly leaves.
    this._resume = null;
  }

  setResume(resume) {
    // resume = { session_id, player_token }
    this._resume = resume;
  }

  connect() {
    this._closedByUser = false;
    this._open();
  }

  _open() {
    this._onStatus("connecting");
    let ws;
    try {
      ws = new WebSocket(buildPlayerWsUrl());
    } catch (err) {
      this._scheduleReconnect();
      return;
    }
    this._ws = ws;

    ws.addEventListener("open", () => {
      this._backoff = 500;
      this._onStatus("open");
      // Resume an existing identity if we have one.
      if (this._resume) {
        this._send({ type: "resume", ...this._resume });
      }
      this._startPing();
    });

    ws.addEventListener("message", (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      // The server sends pings as { event: "pong" } in reply; ignore here.
      if (data?.event === "pong") return;
      this._onEvent(data);
    });

    ws.addEventListener("close", () => {
      this._stopPing();
      this._ws = null;
      this._onStatus("closed");
      if (!this._closedByUser) this._scheduleReconnect();
    });

    ws.addEventListener("error", () => {
      // Browsers don't give us details; the close event will follow.
    });
  }

  _scheduleReconnect() {
    if (this._closedByUser) return;
    clearTimeout(this._reconnectTimer);
    this._reconnectTimer = setTimeout(() => this._open(), this._backoff);
    this._backoff = Math.min(this._maxBackoff, this._backoff * 2);
  }

  _startPing() {
    this._stopPing();
    this._pingTimer = setInterval(() => {
      this._send({ type: "ping" });
    }, 25_000);
  }

  _stopPing() {
    if (this._pingTimer) {
      clearInterval(this._pingTimer);
      this._pingTimer = null;
    }
  }

  send(message) {
    return this._send(message);
  }

  _send(message) {
    const ws = this._ws;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    try {
      ws.send(JSON.stringify(message));
      return true;
    } catch {
      return false;
    }
  }

  close() {
    this._closedByUser = true;
    clearTimeout(this._reconnectTimer);
    this._stopPing();
    if (this._ws) {
      try {
        this._ws.close();
      } catch {
        // swallow
      }
      this._ws = null;
    }
  }
}
