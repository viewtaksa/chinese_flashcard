import { useState } from "react";

function CardInner({ word, flipped, onFlip, noTransition = false }) {
  return (
    <div className="h-full w-full perspective" onClick={onFlip}>
      <div
        className={`relative h-full w-full transform-style preserve-3d ${
          noTransition ? "" : "transition-transform duration-500"
        } ${flipped ? "rotate-y-180" : ""}`}
      >
        {/* Front — hanzi */}
        <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(180deg,#ffffff,#f9f2ea)] shadow-[0_24px_70px_rgba(92,60,35,0.12)] backface-hidden">
          <span className="font-serif text-5xl text-[#1f130d] sm:text-7xl">{word.hanzi}</span>
        </div>
        {/* Back — pinyin + meaning */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] border border-[#d8b7aa] bg-[#d64934] text-white shadow-[0_24px_70px_rgba(214,73,52,0.25)] rotate-y-180 backface-hidden">
          <p className="text-xl font-semibold sm:text-2xl">{word.pinyin}</p>
          <p className="mt-2 text-base text-white/85 sm:text-lg">{word.meaning}</p>
        </div>
      </div>
    </div>
  );
}

export default function Flashcard({ words, level, onBack }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  // outgoing: null | { wordIndex, flipped, phase: 'left' | 'back' | 'right' }
  const [outgoing, setOutgoing] = useState(null);

  const word = words[index];
  const isAnimating = outgoing !== null;

  const nextCard = () => {
    if (isAnimating) return;

    // Last card — go back to level selector
    if (index + 1 >= words.length) {
      onBack();
      return;
    }

    const snap = { wordIndex: index, flipped };

    setFlipped(false);
    setIndex(index + 1);
    setOutgoing({ ...snap, phase: "left" });

    setTimeout(() => {
      setOutgoing((prev) => ({ ...prev, phase: "back" }));
      setTimeout(() => setOutgoing(null), 380);
    }, 280);
  };

  const prevCard = () => {
    if (isAnimating || index === 0) return;

    const snap = { wordIndex: index, flipped };

    setFlipped(false);
    setIndex(index - 1);
    setOutgoing({ ...snap, phase: "right" });

    setTimeout(() => setOutgoing(null), 280);
  };

  const getOutgoingAnimation = () => {
    if (outgoing.phase === "left") return "cardShuffleLeft 280ms ease-in forwards";
    if (outgoing.phase === "back") return "cardShuffleBack 380ms ease-out forwards";
    return "cardSlideOutRight 280ms ease-in forwards";
  };

  return (
    <div className="w-full max-w-3xl px-4 text-center space-y-4 sm:px-10 sm:space-y-6 lg:px-20">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-[#7b6758] hover:text-[#1f130d]"
        >
          ← Back
        </button>
        {level && (
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8a7767]">
            {level.replace("HSK", "HSK ")}
          </span>
        )}
      </div>

      <div className="relative h-48 w-full sm:h-64">
        {/* Incoming card — always sits at z-index 1 */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <CardInner
            word={word}
            flipped={flipped}
            onFlip={() => !isAnimating && setFlipped((f) => !f)}
            noTransition={isAnimating}
          />
        </div>

        {/* Outgoing card */}
        {outgoing && (
          <div
            className="absolute inset-0"
            style={{
              zIndex: outgoing.phase === "back" ? 0 : 2,
              opacity: 1,
              animation: getOutgoingAnimation(),
            }}
          >
            <CardInner
              word={words[outgoing.wordIndex]}
              flipped={outgoing.flipped}
              onFlip={null}
            />
          </div>
        )}
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevCard}
          disabled={index === 0 || isAnimating}
          className="rounded-full border border-[#ccb9a7] bg-white/80 px-4 py-2 text-xs font-semibold text-[#3d2c22] shadow-sm transition hover:-translate-y-0.5 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 sm:px-6 sm:py-3 sm:text-sm"
        >
          ← Previous
        </button>

        <span className="text-sm text-[#8a7767] tabular-nums">
          {index + 1} / {words.length}
        </span>

        <button
          onClick={nextCard}
          disabled={isAnimating}
          className="rounded-full bg-[#1f130d] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#342116] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 sm:px-6 sm:py-3 sm:text-sm"
        >
          {index + 1 >= words.length ? "Finish" : "Next →"}
        </button>
      </div>
    </div>
  );
}
