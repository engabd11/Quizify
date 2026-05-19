import React, { useEffect, useState } from "react";
import { LETTERS, nowSeconds } from "../utils/helpers";

export function QuestionStage({
  question,
  index,
  total,
  deadline,
  selected,
  correct,
  onAnswer,
  reveal,
}) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, (deadline || 0) - nowSeconds())
  );

  useEffect(() => {
    if (!deadline) return undefined;
    const tick = () => {
      setRemaining(Math.max(0, deadline - nowSeconds()));
    };
    tick();
    const handle = setInterval(tick, 250);
    return () => clearInterval(handle);
  }, [deadline]);

  // The total time for this question, derived from the deadline and the
  // question's startedAt. Clamped to a minimum of 1 so the percentage math
  // can't divide by zero even if the server clock skews.
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
            className="qz-progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className={`qz-timer ${low ? "qz-timer-low" : ""}`}>
          {Math.ceil(remaining)}s
        </div>
      </div>
      <div className="qz-question-text">{question.question}</div>
      <div className="qz-answers">
        {question.answers.map((answer, i) => {
          const isSelected = selected === i;
          const isCorrect = reveal && correct === i;
          const isWrong = reveal && isSelected && correct !== i;
          let className = "qz-answer";
          if (isSelected && !reveal) className += " qz-selected";
          if (isCorrect) className += " qz-correct";
          if (isWrong) className += " qz-wrong";
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
