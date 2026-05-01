import { useState } from "react";
import LevelSelector from "./components/LevelSelector";
import Flashcard from "./components/FlashCard";
import NavBar from "./components/NavBar";
import { words } from "./data";

export default function App() {
  const [view, setView] = useState("home");
  const [level, setLevel] = useState(null);

  const filteredWords = words.filter(w => w.level === level);

  const beginStudy = () => {
    setView("study");
    setLevel(null);
  };

  const openLevel = (selectedLevel) => {
    setLevel(selectedLevel);
    setView("flashcards");
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] text-[#1f140f]">
      <NavBar
        view={view}
        onNavigate={setView}
        onHome={() => {
          setView("home");
          setLevel(null);
        }}
      />

      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        {view === "home" ? (
          <section className="relative overflow-hidden rounded-[2rem] border border-[#e4d7c8] bg-[linear-gradient(180deg,#fbf7f1_0%,#f6eee4_100%)] px-6 py-10 shadow-[0_30px_80px_rgba(93,58,33,0.08)] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="absolute inset-0 opacity-40" aria-hidden="true">
              <div className="absolute -right-20 top-8 h-72 w-72 rounded-full bg-[#ead9c7] blur-3xl" />
              <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-[#f4dccd] blur-3xl" />
              <div className="absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-[#efe4d4] blur-3xl" />
              <div className="absolute inset-y-0 right-0 w-[420px] bg-[radial-gradient(circle_at_center,rgba(223,209,193,0.45)_0,rgba(223,209,193,0.02)_60%,transparent_70%)]" />
            </div>

            <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
              <div className="max-w-2xl">
                <p className="mb-6 flex items-center gap-3 text-sm font-semibold tracking-[0.34em] text-[#cf4b37] uppercase">
                  <span className="h-px w-8 bg-[#cf4b37]" />
                  Chinese vocabulary mastery
                </p>

                <h1 className="max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#20130d] sm:text-6xl lg:text-7xl">
                  Learn characters that <span className="italic text-[#d85a43]">actually</span> stay with you
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6d5b4f] sm:text-xl">
                  Spaced-repetition flashcards designed for Mandarin learners.
                  From stroke to sound to meaning, everything is built for fast recall and long-term retention.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={beginStudy}
                    className="inline-flex items-center justify-center rounded-full bg-[#d64934] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#d64934]/25 transition hover:-translate-y-0.5 hover:bg-[#c8412e]"
                    type="button"
                  >
                    Begin a session
                  </button>
                  <button
                    onClick={beginStudy}
                    className="inline-flex items-center justify-center rounded-full border border-[#b9aa9a] bg-white/70 px-8 py-4 text-base font-semibold text-[#48352b] shadow-sm transition hover:border-[#9f8d7a] hover:bg-white"
                    type="button"
                  >
                    Browse decks
                  </button>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="font-serif text-4xl text-[#20130d]">6,000+</div>
                    <div className="mt-1 text-sm uppercase tracking-[0.24em] text-[#8a7767]">vocabulary cards</div>
                  </div>
                  <div>
                    <div className="font-serif text-4xl text-[#20130d]">HSK 1-6</div>
                    <div className="mt-1 text-sm uppercase tracking-[0.24em] text-[#8a7767]">level coverage</div>
                  </div>
                </div>
              </div>

              <div className="relative flex min-h-[480px] items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,191,165,0.35)_0%,rgba(216,191,165,0.08)_42%,transparent_70%)]" aria-hidden="true" />

                <div className="absolute left-[4%] top-[18%] w-44 rounded-[1.8rem] border border-white/70 bg-white/85 p-5 text-center shadow-[0_20px_45px_rgba(92,60,35,0.12)] backdrop-blur-sm sm:w-48">
                  <div className="font-serif text-5xl text-[#6d6259]">美</div>
                  <div className="mt-2 text-sm text-[#8b7a6b]">beautiful</div>
                </div>

                <div className="absolute right-[4%] top-[34%] w-56 rounded-[1.8rem] border border-white/70 bg-white/90 p-6 text-center shadow-[0_24px_55px_rgba(92,60,35,0.14)] backdrop-blur-sm sm:w-60">
                  <div className="font-serif text-6xl text-[#1f130d]">爱</div>
                  <div className="mt-3 text-sm font-semibold text-[#d64934]">ài</div>
                  <div className="text-sm text-[#8b7a6b]">love</div>
                </div>

                <div className="absolute bottom-[6%] left-[18%] right-[18%] h-64 rounded-[2.5rem] border border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(250,243,235,0.85))] shadow-[0_24px_70px_rgba(92,60,35,0.1)]" />
              </div>
            </div>
          </section>
        ) : view === "study" ? (
          <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl items-center justify-center">
            <LevelSelector onSelect={openLevel} />
          </section>
        ) : (
          <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl items-center justify-center">
            <Flashcard words={filteredWords} onBack={() => setView("study")} />
          </section>
        )}
      </main>
    </div>
  );
}