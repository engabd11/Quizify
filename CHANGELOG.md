# Changelog

All notable changes to Quizify will be documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
and this project uses [Semantic Versioning](https://semver.org/).

## [0.3.1] — Fix 500 on QR-code scan

### Fixed — guest players got a 500 Internal Server Error right after scanning

Scanning the QR code took players to `/quizify/join/ABCDEF`, where Home
Assistant's HTTP layer returned a 500 instead of rendering the player page.
The combination of a path-parameter URL and `cache_headers=True` on the
static asset mount tripped a known rough edge in HA 2025.x's view router.

The fix adopts the same approach the
[beatify](https://github.com/mholzi/beatify) integration uses to serve its
guest player page — and which has been working reliably in production for
months. Concretely:

* The canonical guest landing page is now `/quizify/play?code=ABCDEF`. The
  join code lives in a query string (matching beatify's `/beatify/play?game=...`)
  rather than a URL path parameter.
* `cache_headers=True` has been dropped from the static asset mount; the
  page itself sends explicit `no-cache` headers, matching beatify.
* The React bundle now reads the join code from `window.location.search`
  rather than a server-rendered attribute, again matching beatify's
  player.js.
* The old `/quizify/join/ABCDEF` URL is preserved as a 302 redirect, so
  previously-printed QR codes keep working forever.
* The HTML renderer is wrapped in a try/except so a future template bug
  surfaces as a clear error, not a generic 500 from aiohttp.

## [0.3.0] — Auth, security, and UI overhaul

### Fixed — the 401 Unauthorised on the dashboard

The admin panel used an **iframe panel** pointing at `/quizify/admin`, an
HTTP view that required auth. Home Assistant's iframe panels don't forward
auth credentials into the iframe — HA's bearer token lives in the parent
JS, not in cookies — so the iframe load returned 401 and the dashboard
never appeared. The fix replaces the iframe panel with a proper **custom
panel**: the bundle is dynamically imported inside HA's authenticated frame
and gets the `hass` object as an element property, eliminating the second
auth handshake entirely.

### Fixed — guest players can finally play

The previous releases honestly didn't work for guests. All `quizify/player/*`
WebSocket commands rode HA's built-in `websocket_api`, which mandates
authentication; anonymous QR-code joiners had no way to satisfy it. The
README's workaround was to enable Trusted Networks on the guest Wi-Fi —
fragile and far from "no apps, no accounts".

This release introduces a dedicated unauthenticated WebSocket at
`/api/quizify/player_ws`. It only speaks three message types (`join`,
`resume`, `answer`), is bound to a single session for the lifetime of the
connection, and treats the join code as the credential. Resume tokens are
HMAC-signed with a per-process secret and expire after 6 hours.

### Added

- **HMAC-signed resume tokens** so a player who reloads, disconnects, or
  drops onto cellular for thirty seconds keeps the same identity
- **Auto-reconnect** for guest players with exponential backoff
- **Async lock around game state transitions and answer submissions** —
  prevents late answers from being recorded against the wrong question
  index under load
- **Per-connection rate limiting** on the player socket (20 messages in any
  5-second window) and a 16 KB message-size cap
- **Self-hosted system-font stack** — no more Google Fonts fetch, nothing
  leaves the network
- **`prefers-reduced-motion` support** across all animations
- **Visible focus rings** on every interactive element for keyboard users
- **Stable tie-breaking in the scoreboard** (alphabetical by name when
  scores are equal)
- **Test coverage** for the new token logic and game state machine
  (23 tests up from 9)

### Changed

- **Rematch flow** no longer carries forward broken player IDs. The
  previous behaviour issued new IDs server-side but never told the
  clients, silently breaking every existing tab. Rematch now ends the old
  session and starts a fresh one; players rescan the QR.
- **Admin frontend** speaks to HA via the panel's `hass.callWS()` and
  `hass.connection.subscribeMessage()` rather than opening a second
  WebSocket — half the round-trips on every command
- **Cancel awaits the round task** so a session that's being torn down
  doesn't leak a pending coroutine
- **Speaker dropdown** sorts deterministically (Music Assistant first,
  then alphabetical by friendly name, case-insensitive)
- **Player landing page** ships with `X-Content-Type-Options`,
  `Referrer-Policy: same-origin`, `<meta name="robots" content="noindex">`,
  and a sanitized join code in the DOM
- **Bundled JS** no longer depends on `home-assistant-js-websocket`
  (removed ~30 KB of unused code from the bundle)

### Removed

- `quizify/player/*` WebSocket commands — replaced by the dedicated
  player socket
- `STORAGE_VERSION` / `STORAGE_KEY` dead constants
- `WS_TYPE_GAME_NEXT` / `WS_TYPE_GAME_REVEAL` unused constants
- The Google Fonts `<link>` tag from the player landing page

## [0.2.0] — Expanded adults question bank

### Added

- **8 new adults-mode categories**: Sport, Food & Drink, Literature, Language & Words,
  Art & Architecture, Technology & Inventions, Mythology & Religion, Animals & Nature
- **1,008 adults-mode questions total** (12 categories × 84 questions each), up from 100
- **Category-tile UI** with emoji icons in the lobby, replacing the previous pill row
  (scales naturally as more categories are added)
- **Mode-aware category list**: kids mode and adults mode now expose distinct category
  sets, so each picker only shows what's loaded for that mode
- **Stronger test coverage**: adults-mode total count, naming-convention check, and
  cross-file ID uniqueness are now asserted in CI

### Changed

- `const.CATEGORIES_BY_MODE` is now the canonical per-mode category list; the original
  `CATEGORIES` constant remains as an alias for the union (used by validators)
- `QuestionBank` skips trying to load files for categories that aren't valid for the
  current mode, so kids mode no longer logs "file missing" warnings for adults-only
  categories

### Notes

- Kids mode still ships 100 questions (4 categories × 25); expanding it is a planned
  follow-up
- New question IDs use the convention `ak-<cat>-NNN` (adults) where `<cat>` is the
  two-letter category code: `sp`, `fd`, `li`, `la`, `ar`, `tc`, `my`, `an`

## [0.1.0] — Initial Release

### Added

- **Multiplayer quiz game** with real-time WebSocket sync, hosted entirely inside Home Assistant
- **Two modes**: Adults and Kids, with separate question banks per mode
- **Four categories**: General Knowledge, Science, Geography, History
- **200 seed questions** (25 per category × 4 categories × 2 modes)
- **Sidebar panel** at `/quizify` with the admin UI
- **QR-code join flow** at `/quizify/join/<code>` — no app, no account
- **Scoring with speed bonus and streak multipliers** (×1.25 / ×1.5 / ×2.0)
- **Late-joiner average-score logic** so guests aren't penalised for joining mid-game
- **Music Assistant integration** for optional background music during play
- **Generic `media_player` fallback** for hosts without Music Assistant
- **React frontend** built with esbuild (zero-config) — bundled to a single 169 KB file
- **HACS-compatible** (single config entry, MIT license, GitHub Actions for hassfest validation)
- **JSON-format question banks** for easy community PRs
