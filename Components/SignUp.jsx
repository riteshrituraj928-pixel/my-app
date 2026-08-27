import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../src/context/AuthContext";

const sportsList = [
  "Chess",
  "Cricket",
  "Football",
  "Wrestling",
  "Hockey",
  "Kabaddi",
  "Volleyball",
  "Badminton",
  "Athletics",
  "Archery",
];

const themes = {
  player: {
    gradient: "from-emerald-500 to-teal-600",
    text: "text-emerald-400",
    ring: "ring-emerald-500",
    chipActive: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/50",
    focusBorder: "border-emerald-500",
    shadow: "shadow-emerald-500/30",
    pill: "bg-emerald-500",
  },
  scout: {
    gradient: "from-amber-400 to-orange-500",
    text: "text-amber-400",
    ring: "ring-amber-500",
    chipActive: "bg-amber-500/20 text-amber-300 ring-amber-500/50",
    focusBorder: "border-amber-500",
    shadow: "shadow-amber-500/30",
    pill: "bg-amber-500",
  },
};

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("player");
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    sports: [],
  });

  const t = themes[role];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleSport = (sport) => {
    setForm((prev) => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter((s) => s !== sport)
        : [...prev.sports, sport],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (form.sports.length === 0) {
      toast.error("Please select at least one sport.");
      return;
    }
    try {
      const res = await fetch("https://sih-backend-rxwu.onrender.com/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobileNo: form.mobileNo,
          password: form.password,
          type: role,
          sports: form.sports,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        login(data.user);
        toast.success("Registration successful! 🎉");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed.");
        if (data.message === "User already exists") {
          setTimeout(() => navigate("/signin"), 1500);
        }
      }
    } catch (err) {
      console.error("SignUp Fetch Error:", err);
      toast.error("Could not connect to server. Is the backend running?");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 px-4 py-10">
      {/* ——— Card ——— */}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-purple-900/30 backdrop-blur-xl">
        {/* ——— Left: Form ——— */}
        <div className="flex w-full flex-col justify-center px-8 py-10 sm:px-12 sm:py-14 lg:w-1/2 lg:px-14">
          {/* Back arrow */}
          <a
            href="/"
            className="mb-6 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </a>

          {/* Heading */}
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Create an{" "}
            <span className={`bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent transition-all`}>
              Account
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Join GaonKhiladi as a {role === "player" ? "Player" : "Talent Scout"}!
            <br />
            Already registered?{" "}
            <a href="/signin" className={`font-semibold ${t.text} hover:underline transition-colors`}>
              Sign in here
            </a>
          </p>

          {/* ——— Role toggle ——— */}
          <div className="mt-6">
            <div className="relative flex h-11 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r ${t.gradient} shadow-lg ${t.shadow} transition-all duration-300 ease-in-out ${
                  role === "scout" ? "left-[calc(50%+2px)]" : "left-1"
                }`}
              />
              <button
                type="button"
                onClick={() => setRole("player")}
                className={`relative z-10 flex flex-1 items-center justify-center text-sm font-bold transition-colors ${
                  role === "player" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                🏃 Player
              </button>
              <button
                type="button"
                onClick={() => setRole("scout")}
                className={`relative z-10 flex flex-1 items-center justify-center text-sm font-bold transition-colors ${
                  role === "scout" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                🔍 Talent Scout
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500 focus:bg-white/10"
              />
            </div>

            {/* Mobile & Email Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={form.mobileNo}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500 focus:bg-white/10"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ramesh@example.com"
                  required
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500 focus:bg-white/10"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500 focus:bg-white/10"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500 focus:bg-white/10"
                />
              </div>
            </div>

            {/* Sports selection chips */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Primary Sports Interest (Select)
              </label>
              <div className="flex flex-wrap gap-2">
                {sportsList.map((sport) => {
                  const active = form.sports.includes(sport);
                  return (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => toggleSport(sport)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        active
                          ? `${t.chipActive} ring-1`
                          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {sport}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`mt-4 w-full rounded-xl bg-gradient-to-r ${t.gradient} py-3.5 text-sm font-bold text-white shadow-lg ${t.shadow} transition-all hover:brightness-110 active:scale-[0.98]`}
            >
              Complete Registration & Continue →
            </button>
          </form>
        </div>

        {/* ——— Right: Decorative Side Banner ——— */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-900/60 to-purple-900/60 p-12 flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
              🏆 GaonKhiladi Registration
            </span>
            <h2 className="mt-6 text-3xl font-extrabold text-white leading-tight">
              Connect Village Athletes to National Opportunities
            </h2>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Register now to create your sports profile, upload performance proof videos, get ranked, and get scouted by talent academies.
            </p>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-white">Grassroots Scouting Platform</p>
                <p className="text-xs text-gray-400">16 Sports Supported • 100% Free Verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
