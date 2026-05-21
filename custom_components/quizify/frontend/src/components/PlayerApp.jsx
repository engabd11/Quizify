import React, { useEffect, useRef, useState, useCallback } from "react";
import { PlayerConnection } from "../hooks/connection";
import { Header } from "./Header";
import { Scoreboard } from "./PlayerList";
import { QuestionStage } from "./QuestionStage";
import { FinaleScreen } from "./FinaleScreen";

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

// Lifeline state — doublePointsActive resets each question, revealAnswer is once per game
const DEFAULT_LIFELINES = {
  doublePointsActive: false, // bet is active for THIS question (server-confirmed)
  doublePointsRequested: false, // user clicked, server not yet ack'd
  revealAnswer: false,       // used the reveal lifeline (once per game)
  revealedIndex: null,       // which answer was revealed
};

export function PlayerApp({ initialJoinCode }) {
  const [status, setStatus] = useState("connecting");
  const [identity, setIdentity] = useState(null);
  const [game, setGame] = useState(null);
  const [me, setMe] = useState(null);
  const [joinCode, setJoinCode] = useState(initialJoinCode || "");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lifelines, setLifelines] = useState({ ...DEFAULT_LIFELINES });
  const connRef = useRef(null);
  // Track the correct answer as soon as we submit (optimistic feedback)
  const [localCorrect, setLocalCorrect] = useState(null);

  const showToast = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast((t) => (t === text ? null : t)), 2200);
  }, []);

  useEffect(() => {
    const stored = loadStored();
    if (stored?.join_code === (initialJoinCode || "").toUpperCase()) {
      setIdentity(stored);
    } else if (stored && !initialJoinCode) {
      setIdentity(stored);
      setJoinCode(stored.join_code || "");
    }

    const conn = new PlayerConnection({
      onStatus: setStatus,
      onEvent: (event) => {
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
        // Handle peek_result from lifeline reveal
        if (event?.event === "peek_result") {
          if (event.correct !== null && event.correct !== undefined) {
            setLifelines((prev) => ({
              ...prev,
              revealedIndex: event.correct,
            }));
          }
          return;
        }
        // Server confirms (or rejects) a lifeline arm.
        if (event?.event === "lifeline_result") {
          if (event.lifeline === "double_points") {
            setLifelines((prev) => ({
              ...prev,
              doublePointsActive: !!event.armed,
              doublePointsRequested: false,
            }));
            if (event.armed) {
              showToast("⚡ Double or nothing — you brave soul!");
            } else {
              showToast("Couldn't arm that — too late?");
            }
          }
          return;
        }
        // The game was paused (by us, another player, or the admin).
        if (event?.event === "paused") {
          const who = event.paused_by_name;
          showToast(who ? `⏸ Paused by ${who}` : "⏸ Game paused");
        }
        if (event?.event === "resumed") {
          showToast("▶ Resumed");
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
          conn.setResume({
            session_id: nextIdentity.session_id,
            player_token: nextIdentity.player_token,
          });
          if (event.game) setGame(event.game);
          if (event.you) setMe(event.you);
          // Sync once-per-game lifeline state from the server so a refresh
          // doesn't grant the reveal lifeline again.
          if (event.you?.peek_answer_used) {
            setLifelines((prev) => ({ ...prev, revealAnswer: true }));
          }
          if (event.event === "joined") setBusy(false);
          return;
        }
        if (event?.game) setGame(event.game);
        if (event?.you) setMe(event.you);
        if (event?.event === "question") {
          setSelected(null);
          setLocalCorrect(null);
          // Reset per-question lifelines, but PRESERVE revealAnswer —
          // it's once per game, not once per question.
          setLifelines((prev) => ({
            doublePointsActive: false,
            doublePointsRequested: false,
            revealAnswer: prev.revealAnswer, // keep used flag across questions
            revealedIndex: null,
          }));
        }
      },
    });

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
    setTimeout(() => setBusy(false), 4000);
  }, [joinCode, name, status]);

  const submitAnswer = useCallback(
    (idx) => {
      const conn = connRef.current;
      if (!conn || !identity || selected !== null) return;
      setSelected(idx);

      // If double points lifeline is active, we need to track it
      // The score adjustment happens server-side via the lifeline_active flag
      // For now we just track it locally for UX
      const ok = conn.send({ type: "answer", answer: idx });
      if (!ok) {
        setSelected(null);
        showToast("Disconnected — try again");
      }
    },
    [identity, selected, showToast]
  );

  const handleLifeline = useCallback(
    (type) => {
      if (type === "doublePoints") {
        if (lifelines.doublePointsActive || lifelines.doublePointsRequested) {
          return; // already pending or armed
        }
        const conn = connRef.current;
        if (!conn) return;
        // Optimistically show as requested; the server's lifeline_result
        // event will flip doublePointsActive on (or back off if rejected).
        setLifelines((prev) => ({ ...prev, doublePointsRequested: true }));
        conn.send({ type: "lifeline", lifeline: "double_points" });
      } else if (type === "revealAnswer") {
        if (lifelines.revealAnswer) return; // once per game
        const conn = connRef.current;
        if (conn) conn.send({ type: "peek_answer" });
        setLifelines((prev) => ({ ...prev, revealAnswer: true }));
        showToast("👁️ The answer has been revealed — don't tell anyone!");
      }
    },
    [lifelines, showToast]
  );

  const togglePause = useCallback(() => {
    const conn = connRef.current;
    if (!conn || !game) return;
    if (game.is_paused) {
      conn.send({ type: "resume_game" });
    } else {
      conn.send({ type: "pause" });
    }
  }, [game]);

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
    setLifelines({ ...DEFAULT_LIFELINES });
  }, []);

  const connected = status === "open";

  // --- render ---

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

  if (game.state === "ended") {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <FinaleScreen
          players={game.players}
          highlights={game.highlights}
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

  // Pre-roll: TTS announcement is playing. Wait it out before showing Q1.
  if (game.state === "announcing") {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <div className="qz-card qz-center-card qz-announcing">
          <div className="qz-announcing-emoji">🎙️</div>
          <h2 className="qz-display qz-lobby-title">Get ready…</h2>
          <p className="qz-muted">
            Your host is announcing the game. Sit tight!
          </p>
          <div className="qz-announcing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  const q = game.current_question;
  if (!q) {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle={identity.name} />
        <div className="qz-empty">Waiting for next question…</div>
      </div>
    );
  }
  const isPaused = !!game.is_paused;
  const effectiveState = game.effective_state || game.state;
  const reveal = effectiveState === "reveal";
  const myScore = me?.score ?? 0;
  const myStreak = me?.streak ?? 0;

  // Did the player answer correctly? (only knowable during reveal)
  const answeredCorrectly = reveal && selected !== null && selected === q.correct;
  const answeredWrong = reveal && selected !== null && selected !== q.correct;

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
        onAnswer={isPaused ? null : submitAnswer}
        reveal={reveal}
        paused={isPaused}
        lifelines={lifelines}
        onLifeline={!reveal && !isPaused && selected === null ? handleLifeline : null}
      />

      {/* Pause / Resume button — visible during question or reveal */}
      <div className="qz-row-wrap qz-center" style={{ marginTop: 12 }}>
        <button
          type="button"
          className={`qz-btn qz-btn-pause${isPaused ? " qz-btn-pause-resume" : ""}`}
          onClick={togglePause}
          title={isPaused ? "Resume the game for everyone" : "Pause the game for everyone"}
        >
          {isPaused ? "▶ Resume" : "⏸ Pause"}
        </button>
      </div>

      {/* Pause overlay */}
      {isPaused && (
        <div className="qz-pause-banner">
          <div className="qz-pause-icon">⏸</div>
          <div className="qz-pause-text">
            <div className="qz-pause-title">Game Paused</div>
            <div className="qz-pause-sub">
              {game.paused_by_name
                ? `Paused by ${game.paused_by_name}`
                : "Anyone can resume from their phone."}
            </div>
          </div>
        </div>
      )}

      {/* Result feedback banner — shown immediately on reveal */}
      {reveal && !isPaused && selected !== null && (
        <div className={`qz-result-banner ${answeredCorrectly ? "qz-result-correct" : "qz-result-wrong"}`}>
          <span className="qz-result-icon">{answeredCorrectly ? "🎉" : "💀"}</span>
          <span className="qz-result-text">
            {answeredCorrectly
              ? lifelines.doublePointsActive ? "Correct! Double points!" : "Correct!"
              : lifelines.doublePointsActive ? "Wrong… −1000 points!" : "Wrong!"}
          </span>
        </div>
      )}
      {reveal && !isPaused && selected === null && (
        <div className="qz-result-banner qz-result-timeout">
          <span className="qz-result-icon">⏰</span>
          <span className="qz-result-text">Time's up!</span>
        </div>
      )}

      {/* Explanation fact — shown during reveal */}
      {reveal && !isPaused && q.explanation && (
        <div className="qz-reveal-banner">
          <div className="qz-label">💡 Did you know?</div>
          <div className="qz-reveal-explanation">{q.explanation}</div>
        </div>
      )}

      {/* Waiting card — shown after answering, before reveal */}
      {selected !== null && !reveal && !isPaused && (
        <div className="qz-card qz-answer-feedback-card">
          <div className="qz-feedback-waiting">
            <span className="qz-feedback-spinner">⏳</span>
            <span>Answer locked in! Waiting for reveal…</span>
            {lifelines.doublePointsActive && (
              <div className="qz-feedback-lifeline-note">⚡ Double points gamble active!</div>
            )}
          </div>
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
