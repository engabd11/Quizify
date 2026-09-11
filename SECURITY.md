# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Quizify, please **do not** open a public issue.

Instead, email the maintainer directly or open a private security advisory on GitHub:

1. Go to the [Quizify repository](https://github.com/engabd11/Quizify/security/advisories/new)
2. Click "Report a vulnerability"
3. Describe the issue with as much detail as possible

You will receive a response within 48 hours.

## Security Model

Quizify runs entirely inside Home Assistant with no cloud dependencies:

- **Guest players** connect via an unauthenticated WebSocket bound to the HA port
- **Player identity** is protected by HMAC-signed tokens (6-hour TTL, per-process secret)
- **Rate limiting** on QR generation, WebSocket connections, and message frequency
- **CSP headers** on the player page prevent script injection
- **Origin checking** on the player WebSocket blocks cross-site connections
- **No telemetry, no analytics, no external resources** — nothing leaves your network

## Scope

The security model assumes the HA instance is behind a firewall or VPN (Tailscale, WireGuard, etc.). Exposing the player WebSocket directly to the internet without a reverse proxy is not recommended.