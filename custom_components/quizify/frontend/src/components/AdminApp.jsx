import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { adminCallWS, adminSubscribe } from "../hooks/connection";
import { Header } from "./Header";
import {
  ModePicker,
  CategoryPicker,
  DifficultyPicker,
  NumberPicker,
  SpeakerPicker,
  TtsPicker,
  PersonalityPicker,
  AiAnnouncerPicker,
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
  tts_entity: null,
  tts_personality: "hype",
  // Optional: id of a HA conversation agent (Ollama, OpenAI, etc.) that
  // generates fresh announcement text. null = use static templates.
  conversation_agent_id: null,
};

export function AdminApp({ hass }) {
  // `hass` is passed in by the HA frontend; it may briefly be null while
  // the panel is still being mounted.
  const [connected, setConnected] = useState(false);
  const [categories, setCategories] = useState(null);
  const [speakers, setSpeakers] = useState([]);
  const [ttsEntities, setTtsEntities] = useState([]);
  // Available conversation agents (Ollama, OpenAI, etc.). Empty array
  // means none configured in HA — the AI picker hides entirely.
  const [conversationAgents, setConversationAgents] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [game, setGame] = useState(null);
  const [toast, setToast] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const unsubRef = useRef(null);
  const subscribingRef = useRef(false);

  useEffect(() => {
    setConnected(Boolean(hass?.connected));
  }, [hass?.connected]);

  // Load categories + speakers + TTS entities when hass becomes available.
  useEffect(() => {
    if (!hass) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const cats = await adminCallWS(hass, { type: "quizify/categories/list" });
        if (!cancelled) setCategories(cats || { adults: [], kids: [] });
      } catch (err) {
        if (!cancelled) {
          setLoadError(err?.message || "Could not load categories");
          setCategories({ adults: [], kids: [] });
        }
      }
      try {
        const r = await adminCallWS(hass, { type: "quizify/speakers/list" });
        if (!cancelled) setSpeakers(r?.speakers || []);
      } catch {
        if (!cancelled) setSpeakers([]);
      }
      try {
        const r = await adminCallWS(hass, { type: "quizify/tts/list" });
        if (!cancelled) setTtsEntities(r?.tts_entities || []);
      } catch {
        if (!cancelled) setTtsEntities([]);
      }
      // Conversation agents are optional; ignore errors silently so an
      // older HA without this command (or no agents at all) just hides
      // the AI picker rather than breaking the setup screen.
      try {
        const r = await adminCallWS(hass, { type: "quizify/conversation/list" });
        if (!cancelled) setConversationAgents(r?.agents || []);
      } catch {
        if (!cancelled) setConversationAgents([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [hass]);

  const availableCategories = useMemo(() => {
    if (!categories) return [];
    return categories[settings.mode] || [];
  }, [categories, settings.mode]);

  // Auto-select a category if the current pick has no questions in the new mode.
  useEffect(() => {
    if (!availableCategories.length) return;
    if (settings.category === "random") return;
    const found = availableCategories.find((c) => c.id === settings.category);
    if (!found || found.count === 0) {
      setSettings((s) => ({ ...s, category: "random" }));
    }
  }, [availableCategories, settings.category]);

  const showToast = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast((t) => (t === text ? null : t)), 2200);
  }, []);

  const subscribeToSession = useCallback(
    async (sessionId) => {
      if (!hass) return;
      if (subscribingRef.current) return;
      subscribingRef.current = true;
      try {
        if (unsubRef.current) {
          try { unsubRef.current(); } catch { /* swallow */ }
          unsubRef.current = null;
        }
        unsubRef.current = await adminSubscribe(
          hass,
          { type: "quizify/admin/subscribe", session_id: sessionId },
          (event) => {
            if (event?.game) setGame(event.game);
          }
        );
      } catch (err) {
        showToast(err?.message || "Could not subscribe");
      } finally {
        subscribingRef.current = false;
      }
    },
    [hass, showToast]
  );

  // --- game lifecycle handlers ---

  const createGame = useCallback(async () => {
    if (!hass) return;
    try {
      const result = await adminCallWS(hass, {
        type: "quizify/game/create",
        mode: settings.mode,
        category: settings.category,
        difficulty: settings.difficulty,
        questions_per_round: settings.questions_per_round,
        question_time: settings.question_time,
        music_player: settings.music_player || null,
        music_uri: settings.music_uri || null,
        tts_entity: settings.tts_entity || null,
        tts_personality: settings.tts_personality || "hype",
        conversation_agent_id: settings.conversation_agent_id || null,
      });
      setGame(result.game);
      await subscribeToSession(result.session_id);
    } catch (err) {
      showToast(err?.message || "Could not create game");
    }
  }, [hass, settings, showToast, subscribeToSession]);

  const startGame = useCallback(async () => {
    if (!hass || !game) return;
    try {
      await adminCallWS(hass, {
        type: "quizify/game/start",
        session_id: game.session_id,
      });
    } catch (err) {
      showToast(err?.message || "Could not start game");
    }
  }, [hass, game, showToast]);

  const endGame = useCallback(async () => {
    if (!hass || !game) return;
    try {
      await adminCallWS(hass, {
        type: "quizify/game/end",
        session_id: game.session_id,
      });
    } catch {
      // already ended? proceed
    }
    if (unsubRef.current) {
      try { unsubRef.current(); } catch { /* swallow */ }
      unsubRef.current = null;
    }
    setGame(null);
  }, [hass, game]);

  const rematch = useCallback(async () => {
    if (!hass || !game) return;
    try {
      const result = await adminCallWS(hass, {
        type: "quizify/game/rematch",
        session_id: game.session_id,
      });
      setGame(result.game);
      await subscribeToSession(result.session_id);
    } catch (err) {
      showToast(err?.message || "Rematch failed");
    }
  }, [hass, game, showToast, subscribeToSession]);

  const togglePause = useCallback(async () => {
    if (!hass || !game) return;
    const cmd = game.is_paused ? "quizify/game/resume" : "quizify/game/pause";
    try {
      await adminCallWS(hass, { type: cmd, session_id: game.session_id });
    } catch (err) {
      showToast(err?.message || "Could not change pause state");
    }
  }, [hass, game, showToast]);

  // Unsubscribe on unmount.
  useEffect(
    () => () => {
      if (unsubRef.current) {
        try { unsubRef.current(); } catch { /* swallow */ }
        unsubRef.current = null;
      }
    },
    []
  );

  // --- render ---

  if (!hass) {
    return (
      <div className="qz-app">
        <Header connected={false} subtitle="Admin" />
        <div className="qz-card">
          <div className="qz-empty">Loading…</div>
        </div>
      </div>
    );
  }

  if (loadError && !categories) {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle="Admin" />
        <div className="qz-card">
          <h2 className="qz-display" style={{ fontSize: 24, marginTop: 0 }}>
            Couldn't load Quizify
          </h2>
          <div className="qz-mono" style={{ marginTop: 12 }}>{loadError}</div>
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
                setSettings((s) => ({ ...s, mode, category: "random" }))
              }
            />
            {categories && (
              <CategoryPicker
                value={settings.category}
                available={availableCategories}
                onChange={(category) => setSettings((s) => ({ ...s, category }))}
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
                <div className="qz-label">Playlist URI (optional)</div>
                <input
                  type="text"
                  className="qz-input"
                  placeholder="e.g. spotify:playlist:..."
                  value={settings.music_uri}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, music_uri: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="qz-stack">
              <div className="qz-label">TTS Announcer entity (optional)</div>
              <TtsPicker
                ttsEntities={ttsEntities}
                value={settings.tts_entity}
                onChange={(v) =>
                  setSettings((s) => ({ ...s, tts_entity: v }))
                }
              />
              <div className="qz-muted" style={{ fontSize: 12 }}>
                If set, funny TTS announcements play before the game and for the winner. Pick your TTS engine (e.g. Google Translate, Nabu Casa Cloud TTS). The background music speaker above is used as the output.
              </div>
            </div>
            {settings.tts_entity && (
              <PersonalityPicker
                value={settings.tts_personality}
                onChange={(v) =>
                  setSettings((s) => ({ ...s, tts_personality: v }))
                }
              />
            )}
            {settings.tts_entity && conversationAgents.length > 0 && (
              <AiAnnouncerPicker
                agents={conversationAgents}
                value={settings.conversation_agent_id}
                onChange={(v) =>
                  setSettings((s) => ({ ...s, conversation_agent_id: v }))
                }
              />
            )}
            <button
              type="button"
              className="qz-btn qz-btn-primary"
              onClick={createGame}
              disabled={!categories || !connected}
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
          highlights={game.highlights}
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
              <div className="qz-display qz-lobby-heading">
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

  // Pre-roll: TTS announcement is playing. Wait it out before showing Q1.
  if (game.state === "announcing") {
    return (
      <div className="qz-app">
        <Header connected={connected} subtitle="Admin · Get ready…" />
        <div className="qz-card qz-center-card qz-announcing">
          <div className="qz-announcing-emoji">🎙️</div>
          <h2 className="qz-display qz-lobby-title">Announcing the game…</h2>
          <p className="qz-muted">
            Players see a "Get ready" screen until the announcement finishes.
          </p>
          <div className="qz-announcing-dots">
            <span></span><span></span><span></span>
          </div>
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

  // In-game: show question + live scoreboard
  const q = game.current_question;
  const isPaused = !!game.is_paused;
  const effectiveState = game.effective_state || game.state;
  return (
    <div className="qz-app">
      <Header
        connected={connected}
        subtitle={`Admin · ${
          isPaused
            ? "Paused"
            : effectiveState === "reveal"
              ? "Reveal"
              : "Question"
        }`}
      />
      {q && (
        <QuestionStage
          question={{
            question: q.question,
            answers: q.answers,
            startedAt: q.deadline - (game.settings?.question_time || 20),
          }}
          index={q.index}
          total={q.total}
          deadline={q.deadline}
          selected={null}
          correct={q.correct !== undefined ? q.correct : null}
          reveal={effectiveState === "reveal"}
          paused={isPaused}
        />
      )}
      {isPaused && (
        <div className="qz-pause-banner">
          <div className="qz-pause-icon">⏸</div>
          <div className="qz-pause-text">
            <div className="qz-pause-title">Game Paused</div>
            <div className="qz-pause-sub">
              {game.paused_by_name
                ? `Paused by ${game.paused_by_name}`
                : "Tap Resume to continue."}
            </div>
          </div>
        </div>
      )}
      {effectiveState === "reveal" && !isPaused && q?.explanation && (
        <div className="qz-reveal-banner">
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
        <button
          type="button"
          className={`qz-btn qz-btn-pause${isPaused ? " qz-btn-pause-resume" : ""}`}
          onClick={togglePause}
        >
          {isPaused ? "▶ Resume" : "⏸ Pause"}
        </button>
        <button type="button" className="qz-btn qz-btn-danger" onClick={endGame}>
          End Game
        </button>
      </div>
      {toast && <div className="qz-toast">{toast}</div>}
    </div>
  );
}
