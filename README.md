# Quizify

> **Multiplayer trivia quiz for Home Assistant** — scan a QR code, answer questions, see who's smartest in the room. Inspired by [Beatify](https://github.com/mholzi/beatify).

[![Home Assistant 2024.1+](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-41BDF5?style=flat-square&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![Version 0.1.0](https://img.shields.io/badge/Version-0.1.0-ff5cf0?style=flat-square)](#)
[![License MIT](https://img.shields.io/badge/License-MIT-5cf0d4?style=flat-square)](LICENSE)

---

## What is Quizify?

Quizify turns Home Assistant into a multiplayer trivia game show. Guests scan a QR code on your phone, tablet, or TV, pick a name, and play together in real time. **No apps. No accounts. No cloud.** Everything runs locally on your HA instance.

### Highlights

- **🎯 Two modes** — Adults and Kids, each with age-appropriate questions
- **📚 Four categories** — General Knowledge, Science, Geography, History
- **⚡ Real-time multiplayer** — WebSocket-driven, instant updates for every player
- **📱 QR-code join** — No accounts, no app install, just scan and play
- **🎵 Music Assistant integration** — Background music while you play (optional)
- **🔥 Streak scoring** — Speed bonus + streak multipliers create real drama
- **🏆 Live scoreboard** — Watch the leaderboard shift after every question
- **🌐 Fully local** — Runs entirely inside Home Assistant. Nothing leaves your network.
- **📝 Community-friendly question banks** — Plain JSON files. PR a new question pack in minutes.

---

## Install via HACS

1. Open HACS → ⋮ Menu → **Custom Repositories**
2. URL: `https://github.com/YOUR_GITHUB/quizify`
3. Category: **Integration**
4. Install **Quizify**, then restart Home Assistant
5. Go to **Settings → Devices & Services → Add Integration → Quizify**
6. Open **Quizify** from the sidebar and start a game

### Manual install

```bash
cd /config/custom_components
git clone https://github.com/YOUR_GITHUB/quizify.git quizify
# Restart Home Assistant
```

---

## How to play

### As a host (admin)

1. Open **Quizify** from the HA sidebar (or visit `/quizify/admin`)
2. Pick:
   - Mode (Adults or Kids)
   - Category (or Random Mix)
   - Difficulty (Easy / Medium / Hard / Mixed)
   - Number of questions (5–20)
   - Seconds per question (15–45)
   - *(Optional)* a background-music speaker + playlist URI
3. Hit **Create Game** → the QR code appears
4. Share the QR on a TV/phone/printed poster
5. Once players have joined, hit **Start Game**

### As a player (guest)

1. Scan the QR code (or visit `http://YOUR-HA-IP:8123/quizify/join/CODE`)
2. Enter a name
3. Wait in the lobby for the host
4. Tap A/B/C/D as questions appear — fast answers earn bonus points

---

## Scoring

| Element | Effect |
| --- | --- |
| Correct answer | 1,000 base points |
| Speed bonus | Up to +500 (linear: instant = full bonus, last-second = 0) |
| 3-answer streak | × 1.25 multiplier |
| 5-answer streak | × 1.5 multiplier |
| 10-answer streak | × 2.0 multiplier |
| Wrong answer | 0 points, streak resets |

Late joiners inherit the average score so they aren't out of contention.

---

## Music Assistant integration

If you have [Music Assistant](https://music-assistant.io/) installed, Quizify will list its players first in the speaker dropdown. Provide a playlist URI (Spotify, Apple Music, YouTube Music, Tidal) and Quizify will play it as background music during the game.

Without Music Assistant, Quizify falls back to standard `media_player.play_media` — works with most cast-style speakers but URI compatibility varies.

---

## Contributing questions

The question banks live in `custom_components/quizify/questions/<mode>/<category>.json`. Each file is a plain list:

```json
[
  {
    "id": "ak-gk-026",
    "question": "What is the capital of Belgium?",
    "answers": ["Brussels", "Antwerp", "Ghent", "Liège"],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "Brussels is also the headquarters of the EU."
  }
]
```

**Rules:**
- `id`: stable, unique. Prefix `ak-` for adults, `kd-` for kids, then category code (`gk`, `sc`, `ge`, `hi`), then a number.
- `answers`: 2–6 options. The **first** entry must be the correct one; the runtime shuffles answer order so this never leaks.
- `correct`: always `0` in the source file. (Yes — keep it 0.)
- `difficulty`: one of `easy`, `medium`, `hard`.
- `explanation`: shown on the reveal screen. Keep it punchy.
- For Kids questions, keep the vocabulary simple and the topic age-appropriate.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## Architecture

```
Home Assistant
└── Quizify Integration
    ├── Question Bank (JSON loader, validates & shuffles)
    ├── Game State Machine (lobby → question → reveal → scoreboard → end)
    ├── Manager (sessions, music control, speaker discovery)
    ├── WebSocket API (admin + player commands, subscriptions)
    ├── HTTP Views (QR code, SPA shell, static assets)
    └── React Frontend (admin panel + player join page)
```

- Single HA port (8123) — no extra services
- Local-first: no cloud, no telemetry, no analytics
- ~25 questions per category × 4 categories × 2 modes = **200 seed questions**

---

## Known limitations / roadmap

This is v0.1. Things that don't exist yet:

- **AI-generated infinite mode** (hooked up to a local LLM like Ollama) — planned for v0.2
- **Power-ups** (steal, double-or-nothing) — planned for v0.3
- **Multi-language UI** — structure is ready, only English shipped initially
- **Per-player avatars & customisation**
- **Persistent leaderboards across sessions**

If you'd like to help on any of these, open an issue first to discuss the approach.

---

## FAQ

**Do guests need a Home Assistant account?**
They need to be able to reach your HA at port 8123. Quizify uses HA's existing auth for the WebSocket connection; the simplest setup is to enable HA's *Trusted Networks* auth provider for your guest WiFi range, so anyone on the LAN connects without typing a password.

**How many players can join?**
Tested with 10+. WebSocket overhead is minimal. The real limit is your WiFi.

**Can someone join mid-game?**
Yes — late joiners get the current average score so they aren't shut out.

**Will it work without Music Assistant?**
Yes. Music is entirely optional. Without it you just get the quiz with no soundtrack.

**Can I run more than one game at a time?**
Yes — each game has its own session ID and join code. Useful for multi-room parties.

---

## License

[MIT](LICENSE) — fork it, ship it, party with it.

Made with affection for the Home Assistant community.
