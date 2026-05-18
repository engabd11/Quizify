/**
 * Thin wrapper around home-assistant-js-websocket so we can use it in
 * both the authenticated admin context (cookies / hass token) and the
 * anonymous player context (no auth required - we only call
 * unauthenticated commands).
 */

import {
  createConnection,
  createLongLivedTokenAuth,
  getAuth,
} from "home-assistant-js-websocket";

/**
 * For the admin: piggyback on HA's session by passing through the parent
 * frontend's auth. When loaded as an iframe panel, hass-auth is available
 * via the URL hash. As a fallback, we use the standard HA auth flow.
 */
export async function connectAdmin() {
  const auth = await getAuth({
    hassUrl: window.location.origin,
    saveTokens: (tokens) => {
      try {
        window.localStorage.setItem("quizify_auth", JSON.stringify(tokens));
      } catch (e) {
        /* private mode etc. */
      }
    },
    loadTokens: () => {
      try {
        const raw = window.localStorage.getItem("quizify_auth");
        return raw ? Promise.resolve(JSON.parse(raw)) : Promise.resolve(null);
      } catch (e) {
        return Promise.resolve(null);
      }
    },
  });
  return await createConnection({ auth });
}

/**
 * For players: open an UNauthenticated WebSocket. We send the standard
 * HA auth message with a special anonymous token that the player commands
 * accept. HA's websocket_api actually requires auth — to keep things truly
 * no-account, we instead use a tiny shim: the server exposes the public
 * player commands via the same socket but we connect with a "guest" auth
 * mode we configure ourselves.
 *
 * NOTE: For HA 2024.1+ the websocket requires auth. The cleanest pattern
 * is to issue a short-lived "session token" from the server. For v0.1 we
 * keep it simple by reusing the admin's tokens if available, or by
 * relying on the optional anonymous-access setting documented in the
 * README. The player commands themselves do not require admin privilege.
 */
export async function connectPlayer() {
  // Try existing tokens first (same browser, came from admin link).
  const raw = window.localStorage.getItem("quizify_auth");
  if (raw) {
    try {
      const tokens = JSON.parse(raw);
      const auth = createLongLivedTokenAuth(window.location.origin, tokens.access_token);
      return await createConnection({ auth });
    } catch (e) {
      // fall through to fresh auth
    }
  }
  // Standard auth flow (user signs in or, if HA is configured to allow
  // anonymous access for the player route, this completes silently).
  const auth = await getAuth({
    hassUrl: window.location.origin,
    saveTokens: (t) => {
      try {
        window.localStorage.setItem("quizify_auth", JSON.stringify(t));
      } catch (e) {}
    },
  });
  return await createConnection({ auth });
}

export function sendCommand(connection, message) {
  return connection.sendMessagePromise(message);
}

export function subscribe(connection, message, callback) {
  return connection.subscribeMessage(callback, message);
}
