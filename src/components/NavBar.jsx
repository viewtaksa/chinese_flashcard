export default function NavBar({ view, onNavigate, onHome }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e4d7c8] bg-[#fbf7f1]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onHome}
          className="group flex items-center gap-3 text-left"
          type="button"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d64934] text-lg font-black text-white shadow-lg shadow-[#d64934]/20 transition group-hover:scale-105">
            字
          </span>
          <span>
            <span className="block font-serif text-2xl text-[#1f130d]">
              HanziFlow
            </span>
            <span className="block text-xs tracking-[0.28em] text-[#8b7a6b] uppercase">
              Mandarin study studio
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-10 text-sm font-medium text-[#8c7867] md:flex">
          <button className={view === "home" ? "text-[#d64934]" : "transition hover:text-[#1f130d]"} onClick={() => onNavigate("home")} type="button">Home</button>
          <button className={view !== "home" ? "text-[#d64934]" : "transition hover:text-[#1f130d]"} onClick={() => onNavigate("study")} type="button">Study</button>
          <button className="transition hover:text-[#1f130d]" onClick={() => onNavigate("study")} type="button">Decks</button>
          <button className="transition hover:text-[#1f130d]" onClick={() => onNavigate("study")} type="button">Progress</button>
        </div>

        <button
          onClick={() => onNavigate("study")}
          type="button"
          className="rounded-full bg-[#d64934] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#d64934]/25 transition hover:-translate-y-0.5 hover:bg-[#c8412e]"
        >
          Start studying
        </button>
      </div>
    </header>
  );
}