import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import SignIn from "./Signin";

const games = [
  { name: "Chess", emoji: "♟️" },
  { name: "Cricket", emoji: "🏏" },
  { name: "Football", emoji: "⚽" },
  { name: "Wrestling", emoji: "🤼" },
  { name: "Hockey", emoji: "🏑" },
  { name: "Kabaddi", emoji: "🤸" },
  { name: "Volleyball", emoji: "🏐" },
  { name: "Badminton", emoji: "🏸" },
  { name: "Athletics", emoji: "🏃" },
  { name: "Archery", emoji: "🏹" },
];
export default function Navbar() {
  const [gamesOpen, setGamesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setGamesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  /* Shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-lg shadow-emerald-900/5 backdrop-blur-xl py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between">
          {/* ——— Brand ——— */}
          <a href="/" className="group flex items-center gap-3 select-none">
            {/* Logo mark */}
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-lg font-black text-white shadow-md shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-105">
              <img src="https://w7.pngwing.com/pngs/303/549/png-transparent-sport-logo-football-sports-logos-text-sport-logo.png" alt="" />
            </span>
            {/* Wordmark */}
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              GAON{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                KHILADI
              </span>
            </span>
          </a>
          {/* ——— Desktop nav links ——— */}
          <div className="hidden items-center gap-1 md:flex">
            {/* Home */}
            <a
              href="/"
              className="relative rounded-lg px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-orange-700"
            >
              Home
            </a>
            {/* About */}
            <a
              href="/about"
              className="relative rounded-lg px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-orange-700"
            >
              About
            </a>
            {/* Profile */}
            <a
              href="/profile"
              className="relative rounded-lg px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-orange-700"
            >
              Profile
            </a>
            {/* Games dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setGamesOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-med font-bold transition-colors ${
                  gamesOpen
                    ? "bg-emerald-50 text-orange-700"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                }`}
              >
                Games
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    gamesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {/* Dropdown panel */}
              <div
                className={`absolute right-0 mt-2 w-72 origin-top-right transition-all duration-200 ${
                  gamesOpen
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
                  <div className="border-b border-gray-100 px-4 py-3">
                    
                  </div>
                  <div className="grid grid-cols-2 gap-0.5 p-2">
                    {games.map((game) => (
                      <a
                        key={game.name}
                        className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-emerald-50"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-base transition-colors group-hover:bg-emerald-100">
                          {game.emoji}
                        </span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                          {game.name}
                        </span>
                      </a>

                    ))}
                   
                    <a
                      href="/games"
                      className="flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-bold text-orange-600 transition-colors hover:text-orange-800"
                    >
                      View all games
                     </a>
                     
                  </div>
                  <div className="border-t border-gray-100 px-4 py-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ——— Auth buttons (desktop) ——— */}
          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/signin"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition-all hover:shadow-lg hover:shadow-emerald-500/30 hover:brightness-110 active:scale-[0.97]"
            >
              Sign Up
            </NavLink>
          </div>
          {/* ——— Mobile menu button ——— */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* ——— Mobile menu panel ——— */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mt-3 space-y-1 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg">
          <a
            href="/"
            className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
          >
            Home
          </a>
          <a
            href="/about"
            className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
          >
            About
          </a>
          <a
            href="/profile"
            className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
          >
            Profile
          </a>
          {/* Mobile games accordion */}
          <div>
            <button
              onClick={() => setGamesOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                gamesOpen
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              Games
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  gamesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                gamesOpen ? "max-h-96 pt-1" : "max-h-0"
              }`}
            >
              <div className="ml-2 space-y-0.5 border-l-2 border-emerald-100 pl-3">
                {games.map((game) => (
                  <a
                    key={game.name}
                    href={`/games/${game.name.toLowerCase()}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <span className="text-base">{game.emoji}</span>
                    {game.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile auth buttons */}
          <div className="mt-2 flex gap-2 border-t border-gray-100 pt-3">
            <a
              href="/signin"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition-all hover:shadow-lg hover:brightness-110"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}