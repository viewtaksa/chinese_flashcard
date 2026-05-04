import { useState } from "react";

export default function NavBar({ view, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isQuizActive = view === "quiz" || view.startsWith("quiz-session");
  const isSentenceActive = ["sentences","sentence-translate","sentence-session","sentence-fill","fill-session"].includes(view);

  const handleNav = (v) => {
    onNavigate(v);
    setMenuOpen(false);
  };

  const linkCls = (active) =>
    active ? "text-[#d64934]" : "transition hover:text-[#1f130d]";

  return (
    <header className="sticky top-0 z-20 border-b border-[#e4d7c8] bg-[#fbf7f1]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:gap-6 sm:px-6 lg:px-8">
        {/* Brand */}
        <button
          onClick={() => handleNav("home")}
          type="button"
          className="shrink-0 font-serif text-base font-semibold text-[#d64934] transition hover:text-[#c8412e] sm:text-lg"
        >
          Chinese Vocabulary
        </button>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-[#3d2c22] sm:flex">
          <button className={linkCls(view === "home")} onClick={() => handleNav("home")} type="button">Home</button>
          <button className={linkCls(view === "study" || view === "flashcards")} onClick={() => handleNav("study")} type="button">Flashcards</button>
          <button className={linkCls(isQuizActive)} onClick={() => handleNav("quiz")} type="button">Words</button>
          <button className={linkCls(isSentenceActive)} onClick={() => handleNav("sentences")} type="button">Sentences</button>
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNav("about")}
          type="button"
          className="hidden shrink-0 rounded-full bg-[#d64934] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#d64934]/25 transition hover:-translate-y-0.5 hover:bg-[#c8412e] sm:block"
        >
          About Us
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e4d7c8] bg-white/80 text-[#3d2c22] sm:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-[#e4d7c8] bg-[#fbf7f1] px-4 pb-4 pt-3 sm:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium text-[#3d2c22]">
            {[
              { label: "Home", v: "home", active: view === "home" },
              { label: "Flashcards", v: "study", active: view === "study" || view === "flashcards" },
              { label: "Words Quiz", v: "quiz", active: isQuizActive },
              { label: "Sentences", v: "sentences", active: isSentenceActive },
              { label: "About Us", v: "about", active: view === "about" },
            ].map(({ label, v, active }) => (
              <button
                key={v}
                onClick={() => handleNav(v)}
                type="button"
                className={`rounded-xl px-4 py-3 text-left transition ${active ? "bg-[#f5ece3] text-[#d64934] font-semibold" : "hover:bg-[#f5ece3]"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
