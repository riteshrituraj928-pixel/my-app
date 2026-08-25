import Navbar from "./Navbar";
import PlayerHome from "./PlayerHome";
import ScoutHome from "./ScoutHome";
import { useAuth } from "../src/context/AuthContext";

export default function Home() {
  const { user, isLoggedIn } = useAuth();

  // If user is logged in as a player, show the dedicated Player Home page
  const isPlayer = isLoggedIn && (user?.type === "player" || user?.role === "player");
  // If user is logged in as a scout, show the dedicated Scout Dashboard
  const isScout = isLoggedIn && (user?.type === "scout" || user?.role === "scout");

  if (isPlayer) {
    return <PlayerHome />;
  }

  if (isScout) {
    return <ScoutHome />;
  }

  // High-resolution classic sports action photograph
  const HERO_BG = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2000&q=90";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 font-sans">
      <Navbar />

      {/* High-Resolution Classic Sports Background Image */}
      <img
        src={HERO_BG}
        alt="Sports background"
        className="absolute inset-0 h-full w-full object-cover object-center transform scale-105 transition-transform duration-1000"
      />

      {/* Rich Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-20">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs sm:text-sm font-bold backdrop-blur-md mb-6 shadow-lg">
          🏆 GaonKhiladi • Empowering Rural Sports Talent
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl uppercase drop-shadow-2xl">
          SPORTS IS{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
            LIFE
          </span>
        </h1>

        {/* Decorative Underline Accent */}
        <div className="mx-auto mt-4 h-1.5 w-28 sm:w-40 rounded-full bg-gradient-to-r from-orange-500 to-emerald-400 shadow-md shadow-orange-500/30" />

        {/* Tagline Paragraph */}
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-slate-200 sm:text-xl leading-relaxed drop-shadow">
          Unleash the champion within. Train hard, play fair, and let your village talent take center stage on the national arena.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/signup"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 px-9 py-4 text-lg font-extrabold text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/40 hover:brightness-110 active:scale-[0.97]"
          >
            Get Started
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}