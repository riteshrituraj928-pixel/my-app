import { Link } from "react-router-dom";
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

      {/* High-Resolution Classic Sports Background Image with Ken-Burns Animation */}
      <img
        src={HERO_BG}
        alt="Sports background"
        className="absolute inset-0 h-full w-full object-cover object-center animate-hero-zoom"
      />

      {/* Rich Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/95" />

      {/* Ambient Glowing Floating Orbs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-float-delayed" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-20">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs sm:text-sm font-bold backdrop-blur-md mb-6 shadow-lg animate-fade-down">
          <span className="animate-spin-slow">🏆</span> GaonKhiladi • Empowering Rural Sports Talent
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl uppercase drop-shadow-2xl animate-fade-up">
          SPORTS IS{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text">
            LIFE
          </span>
        </h1>

        {/* Decorative Underline Accent */}
        <div className="mx-auto mt-4 h-1.5 w-28 sm:w-40 rounded-full bg-gradient-to-r from-orange-500 to-emerald-400 shadow-md shadow-orange-500/30 animate-grow-width" />

        {/* Tagline Paragraph */}
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-slate-200 sm:text-xl leading-relaxed drop-shadow animate-fade-up-delay">
          Unleash the champion within. Train hard, play fair, and let your village talent take center stage on the national arena.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-2">
          <Link
            to="/signup"
            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 px-9 py-4 text-lg font-extrabold text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/50 hover:brightness-110 active:scale-[0.97] animate-pulse-glow"
          >
            Get Started
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
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
          </Link>
        </div>
      </div>

      {/* Embedded Animation Keyframes */}
      <style>{`
        @keyframes heroZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-hero-zoom {
          animation: heroZoom 20s ease-in-out infinite alternate;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatSlow 10s ease-in-out infinite 3s;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-down {
          animation: fadeDown 0.8s ease-out both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-fade-up-delay {
          animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .animate-fade-up-delay-2 {
          animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }

        @keyframes growWidth {
          from { width: 0px; opacity: 0; }
          to { opacity: 1; }
        }
        .animate-grow-width {
          animation: growWidth 1s ease-out 0.3s both;
        }

        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          animation: gradientText 4s ease infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.4); }
          50% { box-shadow: 0 15px 35px 5px rgba(249, 115, 22, 0.7); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 3s infinite;
        }

        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          display: inline-block;
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </section>
  );
}
