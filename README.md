# Quizify (Experimental)

> **Multiplayer trivia quiz for Home Assistant** — scan a QR code, answer questions, see who's smartest in the room. Inspired by [Beatify](https://github.com/mholzi/beatify).

[![Home Assistant 2024.1+](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-41BDF5?style=flat-square&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![Version 1.1.0](https://img.shields.io/badge/Version-1.1.2-ff5cf0?style=flat-square)](#)
[![License MIT](https://img.shields.io/badge/License-MIT-5cf0d4?style=flat-square)](LICENSE)

---

## What is Quizify?

Quizify turns Home Assistant into a multiplayer trivia game show. Guests scan a QR code on your phone, tablet, or TV, pick a name, and play together in real time. **No apps. No accounts. No cloud.** Everything runs locally on your HA instance.

### Highlights

- **🎯 Two modes** — Adults and Kids, each with age-appropriate questions
- **📚 12 adults categories + 4 kids categories** with over 1,100 seed questions
- **⚡ Real-time multiplayer** — WebSocket-driven, instant updates for every player
- **📱 QR-code join** — No accounts, no app install, just scan and play
- **🎵 Music Assistant integration** — Background music while you play (optional)
- **🔥 Streak scoring** — Speed bonus + streak multipliers create real drama
- **🏆 Live scoreboard** — Watch the leaderboard shift after every question
- **🌐 Fully local** — Runs entirely inside Home Assistant. No Google Fonts,
  no CDN, no telemetry. Nothing leaves your network.
- **🔐 Guest auth done properly** — Players are anonymous by design; HMAC-signed
  resume tokens keep their identity across reloads without an HA account
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

1. Open **Quizify** from the HA sidebar
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

The player page works without a Home Assistant account; the join code is
the only credential needed. A short-lived signed token is stored in
`localStorage` so a reload or a brief disconnect keeps the same identity.

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
    │   └── async lock around state transitions
    ├── Manager (sessions, music control, speaker discovery, player tokens)
    ├── Admin WebSocket API (rides HA's authenticated socket)
    ├── Player WebSocket (dedicated, unauthenticated, rate-limited)
    ├── HTTP Views (QR code, public guest page, static assets)
    └── React Frontend (custom panel for admin + guest page bundle)
```

- Single HA port — no extra services
- Local-first: no cloud, no telemetry, no analytics, no web fonts
- 1,008 adults questions (12 categories × 84) + 100 kids questions

---

## Known limitations / roadmap

Things that don't exist yet:

- **AI-generated infinite mode** (hooked up to a local LLM like Ollama)
- **Power-ups** (steal, double-or-nothing)
- **Multi-language UI** — structure is ready, only English shipped
- **Per-player avatars & customisation**
- **Persistent leaderboards across sessions**

If you'd like to help on any of these, open an issue first to discuss the approach.

---

## FAQ

**Do guests need a Home Assistant account?**
No. The player page is served unauthenticated, and players connect via a
dedicated WebSocket that uses the join code as the credential. Guests need
to be able to reach your HA at port 8123 (or wherever HA listens), but
they don't need to sign in.

**How many players can join?**
Tested with 10+. WebSocket overhead is minimal. The real limit is your WiFi.

**Can someone join mid-game?**
Yes — late joiners get the current average score so they aren't shut out.

**Will it work without Music Assistant?**
Yes. Music is entirely optional. Without it you just get the quiz with no soundtrack.

**Can I run more than one game at a time?**
Yes — each game has its own session ID and join code. Useful for multi-room parties.

**Does anything leave my network?**
No. There's no Google Fonts fetch, no CDN, no telemetry. The bundle is
self-contained and uses system fonts.

**What happens if a player reloads the join page?**
They keep their identity. A short-lived HMAC-signed token in localStorage
lets the server recognise them on reconnect.

---

## License

[MIT](LICENSE) — fork it, ship it, party with it.

Made with affection for the Home Assistant community.
