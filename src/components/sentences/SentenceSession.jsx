import { useState, useMemo } from "react";
import { sentences } from "../../sentences";

const LETTERS = ["A", "B", "C", "D"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getMotivation(score, total) {
  const pct = score / total;
  if (pct >= 0.9) return { zh: "太棒了！", en: "Outstanding!" };
  if (pct >= 0.7) return { zh: "很好！", en: "Great job!" };
  if (pct >= 0.5) return { zh: "继续！", en: "Keep it up!" };
  return { zh: "加油！", en: "Don't give up!" };
}

export default function SentenceSession({ level, onBack }) {
  const levelSentences = useMemo(
    () => sentences.filter((s) => s.level === level),
    [level]
  );

  const questions = useMemo(() => {
    const pool = shuffle(levelSentences).slice(0, 20);
    return pool.map((correct) => {
      const distractors = shuffle(
        levelSentences.filter((s) => s.hanzi !== correct.hanzi)
      ).slice(0, 3);
      const choices = shuffle([correct, ...distractors]);
      return { correct, choices };
    });
  }, [levelSentences]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const isAnswered = selected !== null;
  const correctIdx = isAnswered
    ? q.choices.findIndex((c) => c.hanzi === q.correct.hanzi)
    : -1;
  const isCorrect =
    isAnswered && q.choices[selected].hanzi === q.correct.hanzi;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
    if (q.choices[idx].hanzi === q.correct.hanzi) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  // ── Summary screen ────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const { zh, en } = getMotivation(score, questions.length);

    return (
      <div className="w-full max-w-2xl rounded-[2rem] border border-[#e4d7c8] bg-[linear-gradient(180deg,#fbf7f1_0%,#f6eee4_100%)] px-10 py-12 text-center shadow-[0_30px_80px_rgba(93,58,33,0.08)]">
        <p className="text-sm font-semibold tracking-[0.34em] text-[#cf4b37] uppercase">
          Practice Complete
        </p>

        <h2 className="mt-4 font-serif text-4xl text-[#20130d] sm:text-5xl">
          <span className="mr-2">{zh}</span>
          {en}
        </h2>

        <div className="mt-6 font-serif text-8xl font-bold text-[#d64934]">
          {score}
        </div>
        <p className="mt-1 text-base text-[#8a7767]">
          out of {questions.length} correct
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-[#eee8e0] px-4 py-5">
            <div className="font-serif text-3xl text-[#4a8c5c]">{score}</div>
            <div className="mt-1 text-xs font-semibold tracking-widest uppercase text-[#8a7767]">
              Correct
            </div>
          </div>
          <div className="rounded-2xl bg-[#eee8e0] px-4 py-5">
            <div className="font-serif text-3xl text-[#d64934]">
              {questions.length - score}
            </div>
            <div className="mt-1 text-xs font-semibold tracking-widest uppercase text-[#8a7767]">
              Incorrect
            </div>
          </div>
          <div className="rounded-2xl bg-[#eee8e0] px-4 py-5">
            <div className="font-serif text-3xl text-[#20130d]">{pct}%</div>
            <div className="mt-1 text-xs font-semibold tracking-widest uppercase text-[#8a7767]">
              Accuracy
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-xs text-base italic leading-7 text-[#6d5b4f]">
          Reading sentences in context builds lasting memory. Try again to
          strengthen your recognition.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleRetry}
            className="rounded-full border border-[#ccb9a7] bg-white/80 px-8 py-3 font-semibold text-[#3d2c22] transition hover:bg-white"
          >
            Try again
          </button>
          <button
            onClick={onBack}
            className="rounded-full bg-[#d64934] px-8 py-3 font-semibold text-white shadow-lg shadow-[#d64934]/25 transition hover:bg-[#c8412e]"
          >
            Change level
          </button>
        </div>
      </div>
    );
  }

  // ── Practice screen ───────────────────────────────────────────────────────
  const progress = (current / questions.length) * 100;
  const levelNum = level.replace("HSK", "");

  return (
    <div className="w-full max-w-3xl">
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8a7767]">
          HSK {levelNum} Sentence Quiz
        </span>
        <div className="rounded-full border border-[#e4d7c8] bg-white px-5 py-2 text-sm font-semibold text-[#20130d]">
          Score{" "}
          <span className="text-[#d64934] tabular-nums">{score}</span> /{" "}
          {questions.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-[3px] w-full overflow-hidden rounded-full bg-[#e4d7c8]">
        <div
          className="h-full rounded-full bg-[#d64934] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card — Thai sentence */}
      <div className="relative mb-6 flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#e4d7c8] bg-[linear-gradient(180deg,#fbf7f1_0%,#f6eee4_100%)] px-8 py-10 text-center shadow-[0_20px_50px_rgba(93,58,33,0.08)]">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#d64934]">
          Question {String(current + 1).padStart(2, "0")}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#8a7767]">
          ภาษาไทย → 中文
        </p>
        <p className="relative mt-5 text-2xl leading-relaxed text-[#20130d] sm:text-3xl">
          {q.correct.thai}
        </p>
        <p className="mt-4 text-sm italic text-[#8a7767]">
          Choose the correct Chinese sentence
        </p>
      </div>

      {/* Answer choices — hanzi sentences */}
      <div className="mb-5 grid grid-cols-1 gap-3">
        {q.choices.map((choice, idx) => {
          let cardCls =
            "flex w-full items-start gap-4 rounded-2xl border border-[#e4d7c8] bg-white p-5 text-left transition hover:border-[#ccb9a7] hover:shadow-sm cursor-pointer";
          let badgeCls =
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0ebe4] text-sm font-semibold text-[#8a7767]";

          if (isAnswered) {
            if (idx === correctIdx) {
              cardCls =
                "flex w-full items-start gap-4 rounded-2xl border-2 border-[#4a8c5c] bg-[#f0faf4] p-5 text-left";
              badgeCls =
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4a8c5c] text-sm font-semibold text-white";
            } else if (idx === selected) {
              cardCls =
                "flex w-full items-start gap-4 rounded-2xl border-2 border-[#d64934] bg-[#fdf4f2] p-5 text-left";
              badgeCls =
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d64934] text-sm font-semibold text-white";
            } else {
              cardCls =
                "flex w-full items-start gap-4 rounded-2xl border border-[#e4d7c8] bg-white/50 p-5 text-left opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={cardCls}
            >
              <span className={badgeCls}>{LETTERS[idx]}</span>
              <span className="font-serif text-xl leading-snug text-[#20130d]">
                {choice.hanzi}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback banner + Next button */}
      {isAnswered && (
        <div className="flex items-center gap-4">
          <div
            className={`flex-1 rounded-2xl px-6 py-4 text-sm font-medium ${
              isCorrect
                ? "bg-[#f0faf4] text-[#4a8c5c]"
                : "bg-[#fdf4f2] text-[#d64934]"
            }`}
          >
            {isCorrect ? (
              <>✓ Correct! <span className="font-serif">{q.correct.hanzi}</span> — {q.correct.pinyin}</>
            ) : (
              <>✗ Not quite. <span className="font-serif">{q.correct.hanzi}</span> — {q.correct.pinyin}</>
            )}
          </div>
          <button
            onClick={handleNext}
            className="shrink-0 rounded-full bg-[#d64934] px-8 py-3 font-semibold text-white shadow-lg shadow-[#d64934]/25 transition hover:-translate-y-0.5 hover:bg-[#c8412e]"
          >
            {current + 1 >= questions.length ? "See results" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}
