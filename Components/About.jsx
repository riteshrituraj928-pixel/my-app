import { Link } from "react-router-dom";

const values = [
  {
    icon: "🎯",
    title: "Our Mission",
    description:
      "To discover and nurture sporting talent from every village across the nation, providing equal opportunities for athletes regardless of their background.",
  },
  {
    icon: "🌟",
    title: "Our Vision",
    description:
      "A future where every village has access to world-class sports infrastructure, coaching, and the chance to compete on national and international stages.",
  },
  {
    icon: "🤝",
    title: "Our Values",
    description:
      "Fair play, discipline, community spirit, and the belief that sports can transform lives — building character, resilience, and unity in every village.",
  },
];

const stats = [
  { label: "Athletes", value: "10,000+" },
  { label: "Villages", value: "2,500+" },
  { label: "Sports", value: "15+" },
  { label: "Awards", value: "500+" },
];

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ——— Hero section ——— */}
      <section className="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-36 sm:pb-20">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

        <div className="relative mx-auto max-w-4xl px-6 text-center animate-[fadeUp_0.7s_ease-out_both]">
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600">
            About Us
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Empowering{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Rural Athletes
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 sm:text-xl">
            GAON KHILADI is a grassroots sports platform dedicated to
            discovering, training, and celebrating sporting talent from
            villages across India.
          </p>
        </div>
      </section>

      {/* ——— Values cards ——— */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition-colors group-hover:bg-emerald-100">
                {item.icon}
              </span>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Stats strip ——— */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 sm:py-14 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-emerald-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Our Story ——— */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600">
            Our Story
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            From Villages to Victory
          </h2>
        </div>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-gray-600 sm:text-lg">
          <p>
            It all started with a simple observation — countless talented
            athletes in rural India never get the platform they deserve. While
            cities boast state-of-the-art facilities and coaching academies,
            villages rely on open fields, makeshift equipment, and raw
            determination. <strong className="text-gray-900">GAON KHILADI</strong>{" "}
            was born to bridge that gap.
          </p>
          <p>
            Founded by a group of sports enthusiasts and former athletes, our
            platform connects village-level players with professional coaches,
            organises inter-village tournaments, and provides pathways to
            district, state, and national competitions. From kabaddi courts in
            Haryana to cricket grounds in Bihar, we believe the next champion
            could come from anywhere.
          </p>
          <p>
            Today, we are proud to have impacted over{" "}
            <strong className="text-gray-900">10,000 athletes</strong> across{" "}
            <strong className="text-gray-900">2,500 villages</strong>, covering
            more than 15 sports — and we are just getting started.
          </p>
        </div>
      </section>

      {/* ——— CTA banner ——— */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="overflow-hidden rounded-3xl bg-gray-900 px-8 py-14 text-center sm:px-16 sm:py-16">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Ready to Join the{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Movement
            </span>
            ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400 sm:text-lg">
            Whether you are an athlete, coach, or supporter — there is a place
            for you at GAON KHILADI.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40 hover:brightness-110 active:scale-[0.97] sm:px-10 sm:py-4 sm:text-lg"
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
          </Link>
        </div>
      </section>

      {/* ——— Fade-in keyframe ——— */}
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
    </main>
  );
}
