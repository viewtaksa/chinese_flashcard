export default function LevelSelector({ onSelect }) {
  const levels = ["HSK1", "HSK2"];

  return (
    <div className="w-full max-w-4xl rounded-[2rem] border border-[#e4d7c8] bg-[linear-gradient(180deg,#fbf7f1_0%,#f6eee4_100%)] p-8 text-center shadow-[0_30px_80px_rgba(93,58,33,0.08)] sm:p-10">
      <p className="text-sm font-semibold tracking-[0.34em] text-[#cf4b37] uppercase">
        Choose a deck
      </p>
      <h1 className="mt-4 font-serif text-4xl text-[#20130d] sm:text-5xl">
        Pick your level
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6d5b4f] sm:text-lg">
        Start with HSK 1 for the essentials or jump into HSK 2 for a stronger vocabulary set.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className="rounded-full border border-[#ccb9a7] bg-white/80 px-7 py-4 text-base font-semibold text-[#3d2c22] shadow-sm transition hover:-translate-y-0.5 hover:border-[#a78b73] hover:bg-white"
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}