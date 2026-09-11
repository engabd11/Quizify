# Quizify Documentation

## Screenshots

*Screenshots will be added here once available.*

## Architecture Diagram

```
Home Assistant
└── Quizify Integration
    ├── Question Bank (JSON loader, validates & shuffles)
    ├── Game State Machine (lobby > question > reveal > scoreboard > end)
    │   └── async lock around state transitions
    ├── Manager (sessions, music control, speaker discovery, player tokens)
    ├── Admin WebSocket API (rides HA's authenticated socket)
    ├── Player WebSocket (dedicated, unauthenticated, rate-limited)
    ├── HTTP Views (QR code, public guest page, static assets)
    └── React Frontend (custom panel for admin + guest page bundle)
```

## Player Flow

1. Host creates a game from the HA sidebar panel
2. QR code is generated and displayed
3. Players scan QR > land on `/quizify/play?code=XXXX`
4. Players enter a name and join via unauthenticated WebSocket
5. Host starts the game - questions appear in real-time on all devices
6. Players tap answers; speed + streaks earn bonus points
7. Finale screen shows winner, highlights, and stats
8. Host can rematch with same settings

## Security Model

- Guest players never need an HA account
- HMAC-signed tokens bind player identity to session (6-hour TTL)
- Unauthenticated WebSocket has: Origin checking, rate limiting, idle timeout, message size cap
- QR endpoint has per-IP rate limiting
- CSP headers on player page prevent injection
- No cloud, no telemetry, no external resources