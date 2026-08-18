const gamesData = [
  {
    id: "chess",
    name: "Chess",
    emoji: "♟️",
    accent: "slate",
    description:
      "The ancient game of strategy and intellect. Chess sharpens the mind, teaching patience, foresight, and the art of thinking several moves ahead. In villages across India, chess has found a passionate following — from verandah matches to district-level championships.",
    facts: [
      { label: "Origin", value: "India, 6th Century" },
      { label: "Players", value: "2" },
      { label: "Equipment", value: "Board & 32 Pieces" },
      { label: "Format", value: "Turn-based Strategy" },
    ],
    image: "https://img.magnific.com/premium-psd/chess-transperent-background_1261856-17826.jpg",
  },
  {
    id: "cricket",
    name: "Cricket",
    emoji: "🏏",
    accent: "amber",
    description:
      "More than a sport — cricket is a religion in India. From gully cricket with tape-ball to leather-ball tournaments, every village resonates with the sound of bat meeting ball. GAON KHILADI nurtures raw cricketing talent and gives them a stage to shine.",
    facts: [
      { label: "Origin", value: "England, 16th Century" },
      { label: "Players", value: "11 per side" },
      { label: "Equipment", value: "Bat, Ball, Stumps" },
      { label: "Format", value: "T20 / ODI / Test" },
    ],
    image: "https://i.pinimg.com/736x/3e/85/05/3e85057b9bba25332ec217e0a5c121c7.jpg",
  },
  {
    id: "football",
    name: "Football",
    emoji: "⚽",
    accent: "sky",
    description:
      "The beautiful game unites communities like nothing else. Village football tournaments draw enormous crowds and fierce rivalries. With just a ball and an open field, football is the most accessible sport — and often the most thrilling.",
    facts: [
      { label: "Origin", value: "England, 19th Century" },
      { label: "Players", value: "11 per side" },
      { label: "Equipment", value: "Ball, Goalposts" },
      { label: "Format", value: "90 min Match" },
    ],
    image: "https://i.pinimg.com/736x/44/24/62/44246235fc68567de2d96e63b642d6c6.jpg",
  },
  {
    id: "wrestling",
    name: "Wrestling",
    emoji: "🤼",
    accent: "rose",
    description:
      "Kushti — the soul of Indian wrestling — has been a way of life in villages for centuries. The akhara is where discipline meets raw power. GAON KHILADI celebrates this ancient tradition and supports wrestlers on their journey to national glory.",
    facts: [
      { label: "Origin", value: "Ancient India & Greece" },
      { label: "Players", value: "2" },
      { label: "Equipment", value: "Mat / Akhara" },
      { label: "Format", value: "Freestyle / Greco-Roman" },
    ],
    image: "https://i.pinimg.com/736x/cf/fd/dc/cffddc0863bbf6dd1504c960e2fe9a50.jpg",
  },
  {
    id: "hockey",
    name: "Hockey",
    emoji: "🏑",
    accent: "cyan",
    description:
      "India's national game has a legacy of Olympic gold and legendary players. In rural India, hockey thrives on dusty fields where young players chase dreams with wooden sticks and unshakeable determination.",
    facts: [
      { label: "Origin", value: "Ancient Egypt & Greece" },
      { label: "Players", value: "11 per side" },
      { label: "Equipment", value: "Stick, Ball, Goals" },
      { label: "Format", value: "4 × 15 min Quarters" },
    ],
    image: "https://th-i.thgim.com/public/incoming/j1dwfw/article65983681.ece/alternates/FREE_1200/IMG_TH16_HOCKEY_2_1_UMA1MGCI.jpg",
  },
  {
    id: "kabaddi",
    name: "Kabaddi",
    emoji: "🤸",
    accent: "orange",
    description:
      "Born in the soil of India, kabaddi is the ultimate test of strength, speed, and breath control. Every village has its kabaddi champions — raiders who can hold their breath and defenders who refuse to let go. It's raw, intense, and deeply rooted in our culture.",
    facts: [
      { label: "Origin", value: "Ancient India" },
      { label: "Players", value: "7 per side" },
      { label: "Equipment", value: "Court only" },
      { label: "Format", value: "2 × 20 min Halves" },
    ],
    image: "https://files.prokerala.com/news/photos/imgs/1024/players-in-action-during-a-pro-kabaddi-2018-match-763200.jpg",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    emoji: "🏐",
    accent: "violet",
    description:
      "A net, a ball, and six players on each side — volleyball is one of the most popular sports in rural India. Evening matches under floodlights bring entire villages together. Speed, teamwork, and explosive jumps make it a spectacle to watch.",
    facts: [
      { label: "Origin", value: "USA, 1895" },
      { label: "Players", value: "6 per side" },
      { label: "Equipment", value: "Ball, Net, Court" },
      { label: "Format", value: "Best of 5 Sets" },
    ],
    image: "https://resources.insidersport.com/insidersport/2025/12/Volleyball-Nations-League.jpg",
  },
  {
    id: "badminton",
    name: "Badminton",
    emoji: "🏸",
    accent: "lime",
    description:
      "Lightning-fast reflexes and feathery finesse define badminton. From backyard rallies to professional courts, the sport has seen a massive surge in India. GAON KHILADI identifies young talent in villages and connects them with coaching and competition.",
    facts: [
      { label: "Origin", value: "British India, 19th C." },
      { label: "Players", value: "Singles / Doubles" },
      { label: "Equipment", value: "Racket, Shuttle, Net" },
      { label: "Format", value: "Best of 3 Games" },
    ],
    image: "https://media.istockphoto.com/id/1142868624/photo/badminton-racket-and-shuttlecock-in-motion-closeup.jpg?s=612x612&w=0&k=20&c=qiGneVA-OMq26yelIkEIA18iTdstuFc9ZtY9ojjiJQg=",
  },
  {
    id: "athletics",
    name: "Athletics",
    emoji: "🏃",
    accent: "indigo",
    description:
      "Running, jumping, throwing — athletics is the purest form of competition. Village athletes often train on dirt tracks with no formal coaching, yet produce national-level sprinters, marathon runners, and field athletes. Raw talent deserves a real track.",
    facts: [
      { label: "Origin", value: "Ancient Greece" },
      { label: "Players", value: "Individual / Relay" },
      { label: "Equipment", value: "Track & Field Gear" },
      { label: "Format", value: "Timed / Measured" },
    ],
    image: "https://assets.aws.worldathletics.org/66cfcde68363929d165a9166.JPG",
  },
  {
    id: "archery",
    name: "Archery",
    emoji: "🏹",
    accent: "pink",
    description:
      "Precision, focus, and steady hands — archery has deep roots in India's tribal and rural communities. States like Jharkhand and Manipur have produced world-class archers from humble beginnings. GAON KHILADI aims to put a bow in every deserving hand.",
    facts: [
      { label: "Origin", value: "Prehistoric Era" },
      { label: "Players", value: "Individual / Team" },
      { label: "Equipment", value: "Bow, Arrows, Target" },
      { label: "Format", value: "Set / Cumulative Score" },
    ],
    image: "https://d36tnp772eyphs.cloudfront.net/blogs/1/2020/05/Archery-2-scaled.jpg",
  },
];

/* ——— Tailwind colour map (keeps JSX clean) ——— */
const colorMap = {
  slate:  { bg: "bg-slate-50",  text: "text-slate-700",  badge: "bg-slate-100  text-slate-600",  border: "border-slate-200",  ring: "ring-slate-200"  },
  amber:  { bg: "bg-amber-50",  text: "text-amber-700",  badge: "bg-amber-100  text-amber-600",  border: "border-amber-200",  ring: "ring-amber-200"  },
  sky:    { bg: "bg-sky-50",    text: "text-sky-700",    badge: "bg-sky-100    text-sky-600",    border: "border-sky-200",    ring: "ring-sky-200"    },
  rose:   { bg: "bg-rose-50",   text: "text-rose-700",   badge: "bg-rose-100   text-rose-600",   border: "border-rose-200",   ring: "ring-rose-200"   },
  cyan:   { bg: "bg-cyan-50",   text: "text-cyan-700",   badge: "bg-cyan-100   text-cyan-600",   border: "border-cyan-200",   ring: "ring-cyan-200"   },
  orange: { bg: "bg-orange-50", text: "text-orange-700", badge: "bg-orange-100 text-orange-600", border: "border-orange-200", ring: "ring-orange-200" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", badge: "bg-violet-100 text-violet-600", border: "border-violet-200", ring: "ring-violet-200" },
  lime:   { bg: "bg-lime-50",   text: "text-lime-700",   badge: "bg-lime-100   text-lime-600",   border: "border-lime-200",   ring: "ring-lime-200"   },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", badge: "bg-indigo-100 text-indigo-600", border: "border-indigo-200", ring: "ring-indigo-200" },
  pink:   { bg: "bg-pink-50",   text: "text-pink-700",   badge: "bg-pink-100   text-pink-600",   border: "border-pink-200",   ring: "ring-pink-200"   },
};

function GameCard({ game, index }) {
  const c = colorMap[game.accent];
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${c.border} lg:flex-row ${
        !isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image area */}
      <div className={`relative aspect-[4/3] w-full lg:aspect-auto lg:w-1/2 ${c.bg}`}>
        {game.image ? (
          <img
            src={game.image}
            alt={game.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 p-8">
            <span className="text-6xl">{game.emoji}</span>
            <span className={`text-sm font-medium ${c.text} opacity-60`}>
              Add image URL in gamesData
            </span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex w-full flex-col justify-center p-8 sm:p-10 lg:w-1/2">
        {/* Badge */}
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${c.badge}`}
        >
          <span>{game.emoji}</span>
          {game.name}
        </span>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
          {game.name}
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-base">
          {game.description}
        </p>

        {/* Quick facts grid */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {game.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                {fact.label}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-gray-800">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Games() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ——— Header ——— */}
      <section className="bg-white pt-28 pb-14 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center animate-[fadeUp_0.7s_ease-out_both]">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500">
            Explore
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Our Games
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500 sm:text-xl">
            From ancient traditions to modern arenas — discover the sports that
            power village India.
          </p>
        </div>
      </section>

      {/* ——— Games list ——— */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="space-y-10">
          {gamesData.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </section>

      {/* ——— Keyframe ——— */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}