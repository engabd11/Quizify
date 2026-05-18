# Changelog

All notable changes to Quizify will be documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/),
and this project uses [Semantic Versioning](https://semver.org/).

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

### Known limitations

- Player WebSocket auth currently requires an HA session (use Trusted Networks or a guest user)
- Single-language UI (English only)
- No AI-generated infinite mode yet (architecture ready for it)
- No power-ups or special abilities (planned for later versions)
