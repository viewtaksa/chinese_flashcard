export default function SentenceLevelSelector({ onSelect, mode }) {
  const levels = ["HSK1", "HSK2", "HSK3", "HSK4"];
  const displayNames = { HSK1: "HSK 1", HSK2: "HSK 2", HSK3: "HSK 3", HSK4: "HSK 4" };
  const isTranslate = mode === "translate";

  return (
    <div className="w-full max-w-4xl rounded-[2rem] border border-[#e4d7c8] bg-[linear-gradient(180deg,#fbf7f1_0%,#f6eee4_100%)] p-6 text-center shadow-[0_30px_80px_rgba(93,58,33,0.08)] sm:p-10">
      <p className="text-sm font-semibold tracking-[0.34em] text-[#cf4b37] uppercase">
        {isTranslate ? "Translate Sentences" : "Fill in the Blank"}
      </p>
      <h1 className="mt-4 font-serif text-3xl text-[#20130d] sm:text-5xl">
        Pick your level
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#6d5b4f]">
        {isTranslate
          ? "Read the Thai sentence and choose the correct Chinese translation from four options."
          : "Read a sentence with a missing word and choose the correct answer."}
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className="rounded-2xl border border-[#ccb9a7] bg-white/80 px-6 py-4 text-base font-semibold text-[#3d2c22] shadow-sm transition hover:-translate-y-0.5 hover:border-[#a78b73] hover:bg-white hover:shadow-md sm:px-10 sm:py-5"
          >
            {displayNames[level]}
          </button>
        ))}
      </div>
    </div>
  );
}
