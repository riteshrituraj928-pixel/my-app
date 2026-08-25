import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../src/context/AuthContext";

const themes = {
  player: {
    gradient: "from-violet-500 to-purple-600",
    text: "text-violet-400",
    ring: "ring-violet-500",
    chipActive: "bg-violet-500/20 text-violet-300 ring-violet-500/50",
    focusBorder: "border-violet-500",
    shadow: "shadow-violet-500/30",
    pill: "bg-violet-500",
  },
  scout: {
    gradient: "from-cyan-400 to-blue-500",
    text: "text-cyan-400",
    ring: "ring-cyan-500",
    chipActive: "bg-cyan-500/20 text-cyan-300 ring-cyan-500/50",
    focusBorder: "border-cyan-500",
    shadow: "shadow-cyan-500/30",
    pill: "bg-cyan-500",
  },
};

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("player");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const t = themes[role];

  // Replace with your own image
  const SIDE_IMAGE = "";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          type: role,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        login(data.user);
        toast.success("Login successful! 🎉");
        navigate("/");
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login Fetch Error:", err);
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
            className="mb-8 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </a>

          {/* Heading */}
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Login to{" "}
            <span className={`bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent transition-all`}>
              system
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your login information
            <br />
            or{" "}
            <a href="/signup" className={`font-semibold ${t.text} hover:underline transition-colors`}>
              click here
            </a>{" "}
            to registration
          </p>

          {/* ——— Role toggle ——— */}
          <div className="mt-8">
            <div className="relative flex h-11 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r ${t.gradient} shadow-lg ${t.shadow} transition-all duration-300 ease-in-out ${
                  role === "scout" ? "left-[calc(50%+2px)]" : "left-1"
                }`}
              />
              <button
                type="button"
                onClick={() => setRole("player")}
                className={`relative z-10 flex-1 rounded-full text-sm font-bold transition-colors duration-300 ${
                  role === "player" ? "text-white" : "text-gray-500"
                }`}
              >
                Player
              </button>
              <button
                type="button"
                onClick={() => setRole("scout")}
                className={`relative z-10 flex-1 rounded-full text-sm font-bold transition-colors duration-300 ${
                  role === "scout" ? "text-white" : "text-gray-500"
                }`}
              >
                Scout
              </button>
            </div>
          </div>

          {/* ——— Form ——— */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div className="group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className={`w-full border-b border-white/15 bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition-colors focus:border-b-2 focus:${t.focusBorder}`}
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className={`w-full border-b border-white/15 bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition-colors focus:border-b-2 focus:${t.focusBorder}`}
              />
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500"
              />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full rounded-full bg-gradient-to-r ${t.gradient} px-6 py-3.5 text-sm font-bold text-white shadow-lg ${t.shadow} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:scale-[0.98]`}
            >
              Log In
            </button>
          </form>
        </div>

        {/* ——— Right: Image area ——— */}
        <div className="hidden w-1/2 lg:block">
          {SIDE_IMAGE ? (
            <img
              src={SIDE_IMAGE}
              alt="Decorative"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-600">
              {/* Abstract decorative blobs */}
              <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

              <div className="relative z-10 px-12 text-center">
                <p className="text-6xl font-black tracking-tight text-white/90">
                  GAON
                </p>
                <p className="text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                  KHILADI
                </p>
                <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-white/30" />
                <p className="mt-4 text-sm font-medium text-white/50">
                  Where talent meets opportunity
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}