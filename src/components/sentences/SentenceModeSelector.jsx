export default function SentenceModeSelector({ onSelect }) {
  return (
    <div className="w-full max-w-4xl rounded-[2rem] border border-[#e4d7c8] bg-[linear-gradient(180deg,#fbf7f1_0%,#f6eee4_100%)] p-6 text-center shadow-[0_30px_80px_rgba(93,58,33,0.08)] sm:p-10">
      <p className="text-sm font-semibold tracking-[0.34em] text-[#cf4b37] uppercase">
        Sentence practice
      </p>
      <h1 className="mt-4 font-serif text-3xl text-[#20130d] sm:text-5xl">
        Choose your mode
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#6d5b4f]">
        Practice reading full sentences or fill in the missing word.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => onSelect("translate")}
          className="flex flex-col items-center gap-3 rounded-2xl border border-[#ccb9a7] bg-white/80 px-6 py-8 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#a78b73] hover:bg-white hover:shadow-md"
        >
          <span className="font-serif text-4xl text-[#d64934]">译</span>
          <div>
            <div className="text-base font-semibold text-[#20130d]">Translate Sentences</div>
            <div className="mt-1 text-sm text-[#8a7767]">Read a Thai sentence and pick the correct Chinese translation.</div>
          </div>
        </button>

        <button
          onClick={() => onSelect("fill")}
          className="flex flex-col items-center gap-3 rounded-2xl border border-[#ccb9a7] bg-white/80 px-6 py-8 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#a78b73] hover:bg-white hover:shadow-md"
        >
          <span className="font-serif text-4xl text-[#d64934]">填</span>
          <div>
            <div className="text-base font-semibold text-[#20130d]">Fill in the Blank</div>
            <div className="mt-1 text-sm text-[#8a7767]">Read a sentence with a missing word and choose the correct answer.</div>
          </div>
        </button>
      </div>
    </div>
  );
}
