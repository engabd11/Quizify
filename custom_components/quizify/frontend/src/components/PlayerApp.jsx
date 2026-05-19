import React, { useEffect, useRef, useState, useCallback } from "react";
import { PlayerConnection } from "../hooks/connection";
import { Header } from "./Header";
import { Scoreboard } from "./PlayerList";
import { QuestionStage } from "./QuestionStage";
import { FinaleScreen } from "./FinaleScreen";

// Where we persist the resume token so a quick reload keeps the player in
// the same game (until either the token expires or the server-side game
// session is gone).
const STORAGE_KEY = "quizify_player_v3";

function loadStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveStored(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // private mode etc.
  }
}

function clearStored() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function PlayerApp({ initialJoinCode }) {
  const [status, setStatus] = useState("connecting"); // connecting | open | closed
  const [identity, setIdentity] = useState(null); // {player_id, session_id, name, join_code}
  const [game, setGame] = useState(null);
  const [me, setMe] = useState(null);
  const [joinCode, setJoinCode] = useState(initialJoinCode || "");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const connRef = useRef(null);

  const showToast = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast((t) => (t === text ? null : t)), 2200);
  }, []);

  // Establish the WebSocket exactly once for the lifetime of this mount.
  useEffect(() => {
    const stored = loadStored();
    if (stored?.join_code === (initialJoinCode || "").toUpperCase()) {
      setIdentity(stored);
    } else if (stored && !initialJoinCode) {
      // Falling back to whatever we had stored if we don't know the join code.
      setIdentity(stored);
      setJoinCode(stored.join_code || "");
    }

    const conn = new PlayerConnection({
      onStatus: setStatus,
      onEvent: (event) => {
        // Surface fatal errors gracefully.
        if (event?.event === "error") {
          if (
            event.code === "invalid_token" ||
            event.code === "not_found"
          ) {
            clearStored();
            setIdentity(null);
            setGame(null);
            setMe(null);
            showToast(event.message || "Session ended");
            return;
          }
          showToast(event.message || event.code || "Server error");
          return;
        }
        if (event?.event === "joined" || event?.event === "resumed") {
          const nextIdentity = {
            player_id: event.player_id,
            session_id: event.session_id,
            player_token: event.player_token,
            name: event.name,
            join_code: event.game?.join_code || joinCode.toUpperCase(),
          };
          setIdentity(nextIdentity);
          saveStored(nextIdentity);
          // Persist the resume payload on the connection so reconnects work.
          conn.setResume({
            session_id: nextIdentity.session_id,
            player_token: nextIdentity.player_token,
          });
          if (event.game) setGame(event.game);
          if (event.you) setMe(event.you);
          if (event.event === "joined") setBusy(false);
          return;
        }
        // Snapshots/state updates.
        if (event?.game) setGame(event.game);
        if (event?.you) setMe(event.you);
        if (event?.event === "question") setSelected(null);
      },
    });

    // If we already had a stored identity, prep resume before connecting.
    if (stored?.session_id && stored?.player_token) {
      conn.setResume({
        session_id: stored.session_id,
        player_token: stored.player_token,
      });
    }

    connRef.current = conn;
    conn.connect();
    return () => {
      conn.close();
      connRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const join = useCallback(() => {
    const conn = connRef.current;
    if (!conn || status !== "open") return;
    const code = joinCode.trim().toUpperCase();
    const cleanName = name.trim();
    if (!code || cleanName.length === 0) return;
    setBusy(true);
    setErrorMsg(null);
    conn.send({ type: "join", join_code: code, name: cleanName });
    // Reset busy after a timeout if the server is slow.
    setTimeout(() => setBusy(false), 4000);
  }, [joinCode, name, status]);

  const submitAnswer = useCallback(
    (idx) => {
      const conn = connRef.current;
      if (!conn || !identity || selected !== null) return;
      setSelected(idx);
      const ok = conn.send({ type: "answer", answer: idx });
      if (!ok) {
        // We're disconnected — allow another try when reconnected.
        setSelected(null);
        showToast("Disconnected — try again");
      }
    },
    [identity, selected, showToast]
  );

  const leave = useCallback(() => {
    const conn = connRef.current;
    if (conn) {
      try { conn.send({ type: "leave" }); } catch { /* ignore */ }
      conn.setResume(null);
    }
    clearStored();
    setIdentity(null);
    setGame(null);
    setMe(null);
    setSelected(null);
  }, []);

  const connected = status === "open";

  // --- render ---

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
                  className="qz-input qz-mono qz-input-code"
                  inputMode="text"
                  placeholder="6 letters"
                  value={joinCode}
                  maxLength={6}
                  onChange={(e) =>
                    setJoinCode(
                      e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
                    )
                  }
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") join();
                  }}
                  autoComplete="off"
                />
              </div>
              <button
                type="button"
                className="qz-btn qz-btn-primary"
                onClick={join}
                disabled={
                  busy ||
                  !connected ||
                  joinCode.length < 4 ||
                  !name.trim()
                }
              >
                {busy ? "Joining…" : connected ? "Join Game" : "Connecting…"}
              </button>
              {errorMsg && (
                <div className="qz-error-text">{errorMsg}</div>
              )}
            </div>
          </div>
        </div>
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  if (!game) {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <div className="qz-empty">
          {connected ? "Loading game…" : "Reconnecting…"}
        </div>
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
        <div className="qz-row-wrap qz-center" style={{ marginTop: 16 }}>
          <button type="button" className="qz-btn" onClick={leave}>
            Leave
          </button>
        </div>
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  // Lobby — waiting for host
  if (game.state === "lobby") {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <div className="qz-card qz-center-card">
          <div className="qz-trophy" style={{ fontSize: 64 }}>👋</div>
          <h2 className="qz-display qz-lobby-title">You're in</h2>
          <p className="qz-muted">
            Waiting for the host to start the game…
          </p>
          <div style={{ marginTop: 24 }}>
            <div className="qz-label">Players ({game.players.length})</div>
          </div>
          <Scoreboard
            players={game.players}
            highlightId={identity.player_id}
          />
        </div>
        <div className="qz-row-wrap qz-center" style={{ marginTop: 16 }}>
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
  const myScore = me?.score ?? 0;
  const myStreak = me?.streak ?? 0;

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
        <div className="qz-reveal-banner">
          <div className="qz-label">Why</div>
          <div className="qz-reveal-explanation">{q.explanation}</div>
        </div>
      )}
      {me && (
        <div className="qz-card qz-score-card">
          <div className="qz-label" style={{ marginBottom: 12 }}>
            Your score
          </div>
          <div className="qz-display qz-score-value">
            {myScore.toLocaleString()}
            {myStreak >= 3 && (
              <span className="qz-streak-badge qz-streak-inline">
                🔥 {myStreak} streak
              </span>
            )}
          </div>
        </div>
      )}
      {toast && <div className="qz-toast">{toast}</div>}
    </div>
  );
}
