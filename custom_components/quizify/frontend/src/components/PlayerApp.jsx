import React, { useEffect, useRef, useState } from "react";
import { connectPlayer, sendCommand, subscribe } from "../hooks/connection";
import { Header } from "./Header";
import { Scoreboard } from "./PlayerList";
import { QuestionStage } from "./QuestionStage";
import { FinaleScreen } from "./FinaleScreen";

const STORAGE_KEY = "quizify_player";

export function PlayerApp({ initialJoinCode }) {
  const [connection, setConnection] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [joinCode, setJoinCode] = useState(initialJoinCode || "");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState(null); // {player_id, session_id, name}
  const [game, setGame] = useState(null);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const subRef = useRef(null);

  // Restore identity if same join code
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved && saved.join_code === initialJoinCode) {
        setIdentity(saved);
        setName(saved.name);
      }
    } catch (e) {
      /* ignore */
    }
  }, [initialJoinCode]);

  // Connect on mount
  useEffect(() => {
    let cancelled = false;
    connectPlayer()
      .then((conn) => {
        if (cancelled) {
          conn.close();
          return;
        }
        setConnection(conn);
        setConnected(true);
        conn.addEventListener("disconnected", () => setConnected(false));
        conn.addEventListener("ready", () => setConnected(true));
      })
      .catch((err) => {
        setError(err?.message || String(err));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // If we have a stored identity, resubscribe automatically.
  useEffect(() => {
    if (!connection || !identity || subRef.current) return;
    (async () => {
      try {
        subRef.current = await subscribe(
          connection,
          {
            type: "quizify/player/subscribe",
            session_id: identity.session_id,
            player_id: identity.player_id,
          },
          (event) => {
            if (event?.game) setGame(event.game);
            if (event?.event === "question") setSelected(null);
          }
        );
      } catch (err) {
        // Session is gone (server restarted, game ended). Clear identity.
        window.localStorage.removeItem(STORAGE_KEY);
        setIdentity(null);
      }
    })();
  }, [connection, identity]);

  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(null), 2000);
  }

  async function join() {
    if (!connection || !joinCode || !name) return;
    setBusy(true);
    try {
      const result = await sendCommand(connection, {
        type: "quizify/player/join",
        join_code: joinCode.toUpperCase(),
        name: name.trim(),
      });
      const newIdentity = {
        player_id: result.player_id,
        session_id: result.session_id,
        name: result.name,
        join_code: joinCode.toUpperCase(),
      };
      setIdentity(newIdentity);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newIdentity));
      } catch (e) {}
      setGame(result.game);
      subRef.current = await subscribe(
        connection,
        {
          type: "quizify/player/subscribe",
          session_id: result.session_id,
          player_id: result.player_id,
        },
        (event) => {
          if (event?.game) setGame(event.game);
          if (event?.event === "question") setSelected(null);
        }
      );
    } catch (err) {
      showToast(err?.message || "Could not join");
    } finally {
      setBusy(false);
    }
  }

  async function submitAnswer(idx) {
    if (!connection || !identity || selected !== null) return;
    setSelected(idx);
    try {
      await sendCommand(connection, {
        type: "quizify/player/answer",
        session_id: identity.session_id,
        player_id: identity.player_id,
        answer: idx,
      });
    } catch (err) {
      showToast(err?.message || "Could not submit");
    }
  }

  function leave() {
    if (subRef.current) {
      subRef.current();
      subRef.current = null;
    }
    window.localStorage.removeItem(STORAGE_KEY);
    setIdentity(null);
    setGame(null);
    setSelected(null);
  }

  useEffect(
    () => () => {
      if (subRef.current) subRef.current();
    },
    []
  );

  // --- render ---

  if (error) {
    return (
      <div className="qz-app">
        <Header connected={false} />
        <div className="qz-card">
          <h2>Couldn't connect</h2>
          <div className="qz-mono" style={{ marginTop: 12 }}>
            {error}
          </div>
          <p style={{ marginTop: 16, color: "var(--qz-text-dim)" }}>
            Quizify needs you to sign in to Home Assistant. Once you're
            signed in here, return to the join URL.
          </p>
        </div>
      </div>
    );
  }

  // Join screen
  if (!identity) {
    return (
      <div className="qz-app">
        <Header connected={connected} />
        <div className="qz-join-screen">
          <div className="qz-join-hero">
            <h1>Quizify</h1>
            <p>Get in. Get smart. Win.</p>
          </div>
          <div className="qz-card">
            <div className="qz-stack">
              <div>
                <div className="qz-label" style={{ marginBottom: 8 }}>
                  Join code
                </div>
                <input
                  type="text"
                  className="qz-input qz-mono"
                  placeholder="6 letters"
                  value={joinCode}
                  maxLength={6}
                  onChange={(e) =>
                    setJoinCode(
                      e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "")
                    )
                  }
                  autoCapitalize="characters"
                  style={{ letterSpacing: "0.2em", fontSize: 20 }}
                />
              </div>
              <div>
                <div className="qz-label" style={{ marginBottom: 8 }}>
                  Your name
                </div>
                <input
                  type="text"
                  className="qz-input"
                  placeholder="Enter a name"
                  value={name}
                  maxLength={20}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="qz-btn qz-btn-primary"
                onClick={join}
                disabled={
                  busy ||
                  !joinCode ||
                  joinCode.length < 4 ||
                  !name.trim()
                }
              >
                {busy ? "Joining…" : "Join Game"}
              </button>
            </div>
          </div>
        </div>
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  // Identity set but no game data yet
  if (!game) {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <div className="qz-empty">Loading game…</div>
      </div>
    );
  }

  // Game ended
  if (game.state === "ended") {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <FinaleScreen
          players={game.players}
          highlightId={identity.player_id}
        />
        <div className="qz-row-wrap" style={{ marginTop: 16, justifyContent: "center" }}>
          <button type="button" className="qz-btn" onClick={leave}>
            Leave
          </button>
        </div>
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  // Lobby — waiting for host to start
  if (game.state === "lobby") {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <div className="qz-card" style={{ textAlign: "center" }}>
          <div className="qz-trophy" style={{ fontSize: 64 }}>👋</div>
          <h2 className="qz-display" style={{ fontSize: 28, margin: 0 }}>
            You're in
          </h2>
          <p style={{ color: "var(--qz-text-dim)" }}>
            Waiting for the host to start the game…
          </p>
          <div style={{ marginTop: 24 }}>
            <div className="qz-label">Players ({game.players.length})</div>
          </div>
          <Scoreboard players={game.players} highlightId={identity.player_id} />
        </div>
        <div className="qz-row-wrap" style={{ marginTop: 16, justifyContent: "center" }}>
          <button type="button" className="qz-btn" onClick={leave}>
            Leave
          </button>
        </div>
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  // Question / reveal
  const q = game.current_question;
  if (!q) {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <div className="qz-empty">Waiting for next question…</div>
      </div>
    );
  }
  const reveal = game.state === "reveal";
  const me = game.players.find((p) => p.player_id === identity.player_id);

  return (
    <div className="qz-app">
      <Header connected={connected} subtitle={identity.name} />
      <QuestionStage
        question={{
          question: q.question,
          answers: q.answers,
          startedAt: q.deadline - (game.settings?.question_time || 20),
        }}
        index={q.index}
        total={q.total}
        deadline={q.deadline}
        selected={selected}
        correct={reveal ? q.correct : null}
        onAnswer={submitAnswer}
        reveal={reveal}
      />
      {reveal && q.explanation && (
        <div className="qz-reveal-banner" style={{ marginTop: 12 }}>
          <div className="qz-label">Why</div>
          <div className="qz-reveal-explanation">{q.explanation}</div>
        </div>
      )}
      {me && (
        <div className="qz-card" style={{ marginTop: 20 }}>
          <div className="qz-label" style={{ marginBottom: 12 }}>
            Your score
          </div>
          <div
            className="qz-display"
            style={{ fontSize: 36, color: "var(--qz-accent)" }}
          >
            {me.score.toLocaleString()}
            {me.streak >= 3 && (
              <span className="qz-streak-badge" style={{ marginLeft: 12 }}>
                🔥 {me.streak} streak
              </span>
            )}
          </div>
        </div>
      )}
      {toast && <div className="qz-toast">{toast}</div>}
    </div>
  );
}
