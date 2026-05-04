import prunto from "../assets/Prunto.jpeg";
import Mendon from "../assets/Mendon.jpeg";

const creators = [
  {
    name: "Mellow",
    age: 04,
    bio: "love human food",
    responsibilities: "Eat and Bark at food",
    photo: Mendon,
  },
  {
    name: "Pluto",
    age: 04,
    bio: "Not interested in anything",
    responsibilities: "Sleep and Bark at humans",
    photo: prunto,
  },
];

function CreatorCard({ creator }) {
  return (
    <div className="flex flex-col items-center rounded-[2rem] border border-[#e4d7c8] bg-[linear-gradient(180deg,#fbf7f1_0%,#f6eee4_100%)] p-6 text-center shadow-[0_20px_50px_rgba(93,58,33,0.08)] sm:p-8">
      {/* Photo */}
      <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#e4d7c8] bg-[#ead9c7] shadow-md sm:h-32 sm:w-32">
        {creator.photo ? (
          <img
            src={creator.photo}
            alt={creator.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-4xl text-[#b9a899]">
            {creator.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Name & age */}
      <h2 className="mt-5 font-serif text-2xl text-[#20130d]">{creator.name}</h2>
      <p className="mt-1 text-sm font-medium text-[#8a7767]">Age {creator.age}</p>

      <div className="mt-6 w-full border-t border-[#e4d7c8]" />

      {/* Bio */}
      <div className="mt-6 w-full text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#cf4b37]">Bio</p>
        <p className="mt-2 text-sm leading-7 text-[#6d5b4f]">{creator.bio}</p>
      </div>

      {/* Responsibilities */}
      <div className="mt-5 w-full text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#cf4b37]">
          Responsibilities
        </p>
        <p className="mt-2 text-sm leading-7 text-[#6d5b4f]">{creator.responsibilities}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold tracking-[0.34em] text-[#cf4b37] uppercase">
          Meet the team
        </p>
        <h1 className="mt-4 font-serif text-4xl text-[#20130d] sm:text-5xl">
          Dogcument Company
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#6d5b4f]">
          We built this app to make learning Chinese vocabulary easier and more enjoyable.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {creators.map((creator, i) => (
          <CreatorCard key={i} creator={creator} />
        ))}
      </div>
    </div>
  );
}
