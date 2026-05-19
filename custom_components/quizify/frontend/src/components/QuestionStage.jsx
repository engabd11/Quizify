import React, { useEffect, useRef, useState } from "react";
import { LETTERS, nowSeconds } from "../utils/helpers";

// Create audio context for timer chimes
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function playChime(freq = 880, duration = 0.08, volume = 0.18) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // ignore audio errors
  }
}

export function QuestionStage({
  question,
  index,
  total,
  deadline,
  selected,
  correct,
  onAnswer,
  reveal,
  lifelines,
  onLifeline,
}) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, (deadline || 0) - nowSeconds())
  );
  const lastChimeRef = useRef(-1);
  const userInteractedRef = useRef(false);

  // unlock audio on first user interaction
  useEffect(() => {
    const unlock = () => {
      userInteractedRef.current = true;
      getAudioCtx();
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
    };
    document.addEventListener("click", unlock);
    document.addEventListener("touchstart", unlock);
    return () => {
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
    };
  }, []);

  useEffect(() => {
    lastChimeRef.current = -1;
  }, [index]);

  useEffect(() => {
    if (!deadline) return undefined;
    const tick = () => {
      const rem = Math.max(0, deadline - nowSeconds());
      setRemaining(rem);

      // Play chime for last 5 seconds (only during question, not reveal)
      if (!reveal && rem > 0 && rem <= 5) {
        const secLeft = Math.ceil(rem);
        if (secLeft !== lastChimeRef.current) {
          lastChimeRef.current = secLeft;
          // Escalating chime: higher pitch and louder as time runs out
          const freq = secLeft <= 2 ? 1200 : secLeft <= 3 ? 1000 : 880;
          const vol = secLeft <= 2 ? 0.28 : secLeft <= 3 ? 0.22 : 0.16;
          playChime(freq, 0.1, vol);
        }
      }
    };
    tick();
    const handle = setInterval(tick, 100);
    return () => clearInterval(handle);
  }, [deadline, reveal]);

  const totalTime = Math.max(
    1,
    (deadline || 0) - (question?.startedAt || nowSeconds())
  );
  const percent = deadline
    ? Math.max(0, Math.min(100, (remaining / totalTime) * 100))
    : 100;

  const low = remaining < 5 && !reveal;

  return (
    <div className="qz-question-stage">
      <div className="qz-progress">
        <div className="qz-label">
          Q{index + 1} / {total}
        </div>
        <div className="qz-progress-bar">
          <div
            className={`qz-progress-fill${low ? " qz-progress-fill-low" : ""}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className={`qz-timer ${low ? "qz-timer-low" : ""}`}>
          {Math.ceil(remaining)}s
        </div>
      </div>
      <div className="qz-question-text">{question.question}</div>

      {/* Lifeline buttons — only shown during question phase, before answering */}
      {!reveal && onLifeline && (
        <div className="qz-lifelines">
          <button
            type="button"
            className={`qz-lifeline-btn${lifelines?.doublePoints ? " qz-lifeline-used" : ""}${lifelines?.doublePointsActive ? " qz-lifeline-active" : ""}`}
            onClick={() => onLifeline("doublePoints")}
            disabled={lifelines?.doublePoints || selected !== null}
            title="Double points — or lose 1000 if you're wrong!"
          >
            <span className="qz-lifeline-icon">⚡</span>
            <span className="qz-lifeline-label">
              {lifelines?.doublePointsActive ? "2× ON!" : "2× or −1000"}
            </span>
          </button>
          <button
            type="button"
            className={`qz-lifeline-btn${lifelines?.revealAnswer ? " qz-lifeline-used" : ""}`}
            onClick={() => onLifeline("revealAnswer")}
            disabled={lifelines?.revealAnswer || selected !== null}
            title="Peek at the correct answer — once per game!"
          >
            <span className="qz-lifeline-icon">👁️</span>
            <span className="qz-lifeline-label">
              {lifelines?.revealAnswer ? "Used" : "Reveal"}
            </span>
          </button>
        </div>
      )}

      <div className="qz-answers">
        {question.answers.map((answer, i) => {
          const isSelected = selected === i;
          const isCorrect = correct !== null && correct === i;
          const isWrong = isSelected && correct !== null && correct !== i;

          // Show the peeked answer highlight (only if lifeline reveal is active and not yet answered)
          const isPeeked = lifelines?.revealedIndex === i && selected === null && !reveal;

          let className = "qz-answer";
          if (isPeeked) className += " qz-peeked";
          if (isSelected && !reveal && correct === null) className += " qz-selected";
          // During reveal: show correct in green, wrong selection in red
          if (reveal || correct !== null) {
            if (isCorrect) className += " qz-correct";
            if (isWrong) className += " qz-wrong";
            // If we selected correct: also add selected styling on top of correct
            if (isSelected && isCorrect) className += " qz-selected-correct";
          }

          return (
            <button
              key={i}
              type="button"
              className={className}
              onClick={() => !reveal && onAnswer && onAnswer(i)}
              disabled={reveal || selected !== null || !onAnswer}
              aria-pressed={isSelected}
            >
              <div className="qz-answer-letter" aria-hidden="true">{LETTERS[i]}</div>
              <div>{answer}</div>
              {isPeeked && <span className="qz-peeked-badge">✓ correct</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
