import Navbar from "./Navbar";
export default function Home() {
  // ✏️ Replace this URL with your own background image
  const BG_IMAGE = "https://wallpapercave.com/wp/Cd7iyFl.jpg";

  return (
    
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
        <Navbar/>
      {/* ——— Background image ——— */}
      <img
        src="https://wallpapercave.com/wp/Cd7iyFl.jpg"
        alt="Sports background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ——— Gradient overlay ——— */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

      {/* ——— Content ——— */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center animate-[fadeUp_0.8s_ease-out_both]">
        {/* Headline */}
        <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          SPORTS IS{" "}
          <span className="bg-gradient-to-r from-orange-400 to-teal-300 bg-clip-text text-transparent">
            LIFE
          </span>
        </h1>

        {/* Decorative underline */}
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-orange-400 to-teal-400 sm:mt-6 sm:w-32" />

        {/* Tagline */}
        <p className="mx-auto mt-5 max-w-xl text-base font-medium text-gray-300 sm:mt-6 sm:text-lg md:text-xl">
          Unleash the champion within. Train hard, play fair, and let the game
          define who you are.
        </p>

        {/* CTA button */}
        <a
          href="/games"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-teal-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 hover:brightness-110 active:scale-[0.97] sm:mt-10 sm:px-10 sm:py-4 sm:text-lg"
        >
          Get Started
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
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

      {/* ——— Fade-in keyframe (injected once) ——— */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}