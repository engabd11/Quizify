import React, { useEffect, useMemo, useRef, useState } from "react";
import { connectAdmin, sendCommand, subscribe } from "../hooks/connection";
import { Header } from "./Header";
import {
  ModePicker,
  CategoryPicker,
  DifficultyPicker,
  NumberPicker,
  SpeakerPicker,
} from "./Pickers";
import { QrCard } from "./QrCard";
import { PlayerList, Scoreboard } from "./PlayerList";
import { QuestionStage } from "./QuestionStage";
import { FinaleScreen } from "./FinaleScreen";

const DEFAULT_SETTINGS = {
  mode: "adults",
  category: "random",
  difficulty: "mixed",
  questions_per_round: 10,
  question_time: 20,
  music_player: null,
  music_uri: "",
};

export function AdminApp() {
  const [connection, setConnection] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);
  const [speakers, setSpeakers] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [game, setGame] = useState(null);
  const [toast, setToast] = useState(null);
  const subRef = useRef(null);

  // Connect on mount
  useEffect(() => {
    let cancelled = false;
    connectAdmin()
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

  // Load categories + speakers once connected
  useEffect(() => {
    if (!connection) return;
    sendCommand(connection, { type: "quizify/categories/list" })
      .then(setCategories)
      .catch(() => setCategories({ adults: [], kids: [] }));
    sendCommand(connection, { type: "quizify/speakers/list" })
      .then((r) => setSpeakers(r.speakers || []))
      .catch(() => setSpeakers([]));
  }, [connection]);

  const availableCategories = useMemo(() => {
    if (!categories) return [];
    return categories[settings.mode] || [];
  }, [categories, settings.mode]);

  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(null), 2000);
  }

  // --- game lifecycle handlers ---

  async function createGame() {
    if (!connection) return;
    try {
      const result = await sendCommand(connection, {
        type: "quizify/game/create",
        mode: settings.mode,
        category: settings.category,
        difficulty: settings.difficulty,
        questions_per_round: settings.questions_per_round,
        question_time: settings.question_time,
        music_player: settings.music_player || null,
        music_uri: settings.music_uri || null,
      });
      setGame(result.game);
      // Subscribe to updates
      if (subRef.current) subRef.current();
      subRef.current = await subscribe(
        connection,
        {
          type: "quizify/admin/subscribe",
          session_id: result.session_id,
        },
        (event) => {
          if (event?.game) setGame(event.game);
        }
      );
    } catch (err) {
      showToast(err?.message || "Could not create game");
    }
  }

  async function startGame() {
    if (!connection || !game) return;
    try {
      await sendCommand(connection, {
        type: "quizify/game/start",
        session_id: game.session_id,
      });
    } catch (err) {
      showToast(err?.message || "Could not start game");
    }
  }

  async function endGame() {
    if (!connection || !game) return;
    try {
      await sendCommand(connection, {
        type: "quizify/game/end",
        session_id: game.session_id,
      });
    } catch (err) {
      /* ignore */
    }
    if (subRef.current) {
      subRef.current();
      subRef.current = null;
    }
    setGame(null);
  }

  async function rematch() {
    if (!connection || !game) return;
    try {
      const result = await sendCommand(connection, {
        type: "quizify/game/rematch",
        session_id: game.session_id,
      });
      if (subRef.current) subRef.current();
      setGame(result.game);
      subRef.current = await subscribe(
        connection,
        {
          type: "quizify/admin/subscribe",
          session_id: result.session_id,
        },
        (event) => {
          if (event?.game) setGame(event.game);
        }
      );
    } catch (err) {
      showToast(err?.message || "Rematch failed");
    }
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
        <Header connected={false} subtitle="Admin" />
        <div className="qz-card">
          <h2>Couldn't connect</h2>
          <div className="qz-mono" style={{ marginTop: 12 }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  // No active game → setup screen
  if (!game) {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle="Admin · Setup" />
        <div className="qz-card">
          <div className="qz-stack">
            <ModePicker
              value={settings.mode}
              onChange={(mode) =>
                setSettings((s) => ({
                  ...s,
                  mode,
                  category: "random",
                }))
              }
            />
            {categories && (
              <CategoryPicker
                value={settings.category}
                available={availableCategories}
                onChange={(category) =>
                  setSettings((s) => ({ ...s, category }))
                }
              />
            )}
            <DifficultyPicker
              value={settings.difficulty}
              onChange={(difficulty) =>
                setSettings((s) => ({ ...s, difficulty }))
              }
            />
            <div className="qz-setup-grid">
              <NumberPicker
                label="Questions"
                value={settings.questions_per_round}
                onChange={(n) =>
                  setSettings((s) => ({ ...s, questions_per_round: n }))
                }
                options={[5, 10, 15, 20]}
              />
              <NumberPicker
                label="Seconds per question"
                value={settings.question_time}
                onChange={(n) =>
                  setSettings((s) => ({ ...s, question_time: n }))
                }
                options={[15, 20, 30, 45]}
              />
            </div>
            <div className="qz-setup-grid">
              <SpeakerPicker
                speakers={speakers}
                value={settings.music_player}
                onChange={(v) =>
                  setSettings((s) => ({ ...s, music_player: v }))
                }
              />
              <div className="qz-stack">
                <div className="qz-label">
                  Playlist URI (optional)
                </div>
                <input
                  type="text"
                  className="qz-input"
                  placeholder="e.g. spotify:playlist:..."
                  value={settings.music_uri}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      music_uri: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <button
              type="button"
              className="qz-btn qz-btn-primary"
              onClick={createGame}
              disabled={!categories}
              style={{ alignSelf: "flex-start", marginTop: 8 }}
            >
              Create Game →
            </button>
          </div>
        </div>
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  // Game ended
  if (game.state === "ended") {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle="Admin · Game Over" />
        <FinaleScreen
          players={game.players}
          onRematch={rematch}
          onEnd={endGame}
        />
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  // Lobby state → show QR + players
  if (game.state === "lobby") {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle="Admin · Lobby" />
        <div className="qz-lobby">
          <QrCard joinCode={game.join_code} />
          <div className="qz-stack">
            <div className="qz-card">
              <div
                className="qz-display"
                style={{ fontSize: 22, marginBottom: 16 }}
              >
                Players ({game.players.length})
              </div>
              <PlayerList players={game.players} />
            </div>
            <div className="qz-row-wrap">
              <button
                type="button"
                className="qz-btn qz-btn-primary"
                onClick={startGame}
                disabled={game.players.length === 0}
              >
                Start Game
              </button>
              <button
                type="button"
                className="qz-btn qz-btn-danger"
                onClick={endGame}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {toast && <div className="qz-toast">{toast}</div>}
      </div>
    );
  }

  // In-game: show question + live scoreboard
  const q = game.current_question;
  return (
    <div className="qz-app">
      <Header
        connected={connected}
        subtitle={`Admin · ${
          game.state === "reveal" ? "Reveal" : "Question"
        }`}
      />
      {q && (
        <QuestionStage
          question={{
            question: q.question,
            answers: q.answers,
            startedAt: q.deadline - settings.question_time,
          }}
          index={q.index}
          total={q.total}
          deadline={q.deadline}
          selected={null}
          correct={q.correct !== undefined ? q.correct : null}
          reveal={game.state === "reveal"}
        />
      )}
      {game.state === "reveal" && q?.explanation && (
        <div className="qz-reveal-banner" style={{ marginTop: 12 }}>
          <div className="qz-label">Why</div>
          <div className="qz-reveal-explanation">{q.explanation}</div>
        </div>
      )}
      <div className="qz-card" style={{ marginTop: 20 }}>
        <div className="qz-label" style={{ marginBottom: 12 }}>
          Live Scoreboard
        </div>
        <Scoreboard players={game.players} />
      </div>
      <div className="qz-row-wrap" style={{ marginTop: 16 }}>
        <button type="button" className="qz-btn qz-btn-danger" onClick={endGame}>
          End Game
        </button>
      </div>
      {toast && <div className="qz-toast">{toast}</div>}
    </div>
  );
}
