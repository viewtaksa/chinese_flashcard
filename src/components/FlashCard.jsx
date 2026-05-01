import { useState } from "react";

export default function Flashcard({ words, onBack }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const word = words[index];

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % words.length);
  };

  return (
    <div className="w-full max-w-3xl text-center space-y-6">
      <button
        onClick={onBack}
        className="text-sm font-medium text-[#7b6758] hover:text-[#1f130d]"
      >
        ← Back
      </button>

      <div
        className="mx-auto h-56 w-full max-w-md perspective"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute flex h-full w-full items-center justify-center rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(249,242,234,0.95))] shadow-[0_24px_70px_rgba(92,60,35,0.12)] backface-hidden">
            <span className="font-serif text-7xl text-[#1f130d]">{word.hanzi}</span>
          </div>

          <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-[2rem] border border-[#d8b7aa] bg-[#d64934] text-white shadow-[0_24px_70px_rgba(214,73,52,0.25)] rotate-y-180 backface-hidden">
            <p className="text-2xl font-semibold">{word.pinyin}</p>
            <p className="mt-2 text-lg text-white/85">{word.meaning}</p>
          </div>
        </div>
      </div>

      <button
        onClick={nextCard}
        className="rounded-full bg-[#1f130d] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#342116]"
      >
        Next
      </button>
    </div>
  );
}