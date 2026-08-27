import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../src/context/AuthContext";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const API_BASE = "https://sih-backend-rxwu.onrender.com/api/v1";

export default function ScoutHome() {
  const { user } = useAuth();

  const [scoutProfile, setScoutProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Filters
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'Pending' | 'Accepted' | 'Rejected'
  const [searchQuery, setSearchQuery] = useState("");

  // ──────────────────────────────────────────────
  // Fetch scout profile + applications on mount
  // ──────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userId = user?.id || user?._id;
        if (!userId) return;

        // 1. Get scout profile by user ID
        const scoutRes = await fetch(`${API_BASE}/scout/user/${userId}`);
        if (!scoutRes.ok) {
          console.warn("Could not fetch scout profile");
          setLoading(false);
          return;
        }
        const scoutData = await scoutRes.json();
        const scout = scoutData.data || scoutData.scout || scoutData;
        setScoutProfile(scout);

        // 2. Get applications for this scout
        if (scout?._id) {
          const appsRes = await fetch(`${API_BASE}/applications/scout/${scout._id}`);
          if (appsRes.ok) {
            const appsData = await appsRes.json();
            setApplications(appsData.data || []);
          }
        }
      } catch (err) {
        console.error("Error fetching scout data:", err);
        toast.error("Could not connect to server. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // ──────────────────────────────────────────────
  // Accept / Reject handler
  // ──────────────────────────────────────────────
  const handleStatusUpdate = async (applicationId, newStatus) => {
    setUpdatingId(applicationId);
    try {
      const res = await fetch(`${API_BASE}/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update local state
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        toast.success(
          `Application ${newStatus.toLowerCase()} successfully! ${newStatus === "Accepted" ? "🎉" : ""}`,
          { duration: 3000 }
        );
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Could not connect to server.");
    } finally {
      setUpdatingId(null);
    }
  };

  // ──────────────────────────────────────────────
  // Computed stats
  // ──────────────────────────────────────────────
  const stats = useMemo(() => {
    const pending = applications.filter((a) => a.status === "Pending").length;
    const accepted = applications.filter((a) => a.status === "Accepted").length;
    const rejected = applications.filter((a) => a.status === "Rejected").length;
    return { total: applications.length, pending, accepted, rejected };
  }, [applications]);

  // ──────────────────────────────────────────────
  // Filtered applications
  // ──────────────────────────────────────────────
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      // Tab filter
      if (activeTab !== "all" && app.status !== activeTab) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const playerUser = app.playerId?.userId;
        const playerName = playerUser?.name?.toLowerCase() || "";
        const playerEmail = playerUser?.email?.toLowerCase() || "";
        const playerSports =
          app.playerId?.sports
            ?.map((s) => (typeof s === "string" ? s : s.sportName || ""))
            .join(" ")
            .toLowerCase() || "";
        const playerCity = app.playerId?.location?.city?.toLowerCase() || "";
        const playerState = app.playerId?.location?.state?.toLowerCase() || "";

        if (
          !playerName.includes(q) &&
          !playerEmail.includes(q) &&
          !playerSports.includes(q) &&
          !playerCity.includes(q) &&
          !playerState.includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [applications, activeTab, searchQuery]);

  // ──────────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────────
  const getPlayerName = (app) => app.playerId?.userId?.name || "Unknown Player";
  const getPlayerEmail = (app) => app.playerId?.userId?.email || "—";
  const getPlayerPhone = (app) => app.playerId?.userId?.mobileNo || "—";

  const getPlayerSports = (app) => {
    if (!app.playerId?.sports || app.playerId.sports.length === 0) return [];
    return app.playerId.sports.map((s) =>
      typeof s === "string" ? s : s.sportName || "Sport"
    );
  };

  const getPlayerLocation = (app) => {
    const loc = app.playerId?.location;
    if (!loc) return "—";
    return [loc.city, loc.state].filter(Boolean).join(", ") || "—";
  };

  const getPlayerExperience = (app) => {
    if (!app.playerId?.sports || app.playerId.sports.length === 0) return null;
    const maxExp = Math.max(
      ...app.playerId.sports.map((s) => s.experienceYears || 0)
    );
    return maxExp > 0 ? maxExp : null;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statusConfig = {
    Pending: {
      bg: "bg-amber-500/15",
      border: "border-amber-500/40",
      text: "text-amber-400",
      dot: "bg-amber-400",
      icon: "⏳",
    },
    Accepted: {
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
      icon: "✓",
    },
    Rejected: {
      bg: "bg-red-500/15",
      border: "border-red-500/40",
      text: "text-red-400",
      dot: "bg-red-400",
      icon: "✕",
    },
  };

  // ──────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
        {/* ——— Hero Banner ——— */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Info */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-400">
                <span>🔍 Scout Dashboard</span>
                <span>•</span>
                <span>Talent Management</span>
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {user?.name || "Scout"}!
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                {scoutProfile?.instituteName
                  ? `Review and manage player applications for ${scoutProfile.instituteName}.`
                  : "Review and manage player applications for your academy."}
              </p>
              {scoutProfile?.sportsPlayed && scoutProfile.sportsPlayed.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Your Sports:</span>
                  {scoutProfile.sportsPlayed.map((sport, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs font-bold text-cyan-300 backdrop-blur-md"
                    >
                      ⭐ {sport}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:w-auto">
              {/* Total */}
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                  activeTab === "all"
                    ? "border-cyan-500 bg-cyan-500/15 shadow-lg shadow-cyan-500/20 scale-105"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black text-white">{stats.total}</span>
                <span className="text-xs font-semibold text-slate-300 mt-1">Total</span>
              </button>

              {/* Pending */}
              <button
                type="button"
                onClick={() => setActiveTab("Pending")}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                  activeTab === "Pending"
                    ? "border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-500/20 scale-105"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{stats.pending}</span>
                <span className="text-xs font-semibold text-slate-300 mt-1">Pending</span>
              </button>

              {/* Accepted */}
              <button
                type="button"
                onClick={() => setActiveTab("Accepted")}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                  activeTab === "Accepted"
                    ? "border-emerald-500 bg-emerald-500/15 shadow-lg shadow-emerald-500/20 scale-105"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.accepted}</span>
                <span className="text-xs font-semibold text-slate-300 mt-1">Accepted</span>
              </button>

              {/* Rejected */}
              <button
                type="button"
                onClick={() => setActiveTab("Rejected")}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                  activeTab === "Rejected"
                    ? "border-red-500 bg-red-500/15 shadow-lg shadow-red-500/20 scale-105"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black text-red-400">{stats.rejected}</span>
                <span className="text-xs font-semibold text-slate-300 mt-1">Rejected</span>
              </button>
            </div>
          </div>
        </div>

        {/* ——— Controls & Filters ——— */}
        <div className="mt-8 space-y-4">
          {/* Tab Toggle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center rounded-2xl bg-slate-900/90 p-1.5 border border-white/10 shadow-inner">
              {[
                { key: "all", label: "📋 All", count: stats.total, gradient: "from-cyan-500 to-blue-600" },
                { key: "Pending", label: "⏳ Pending", count: stats.pending, gradient: "from-amber-500 to-orange-600" },
                { key: "Accepted", label: "✓ Accepted", count: stats.accepted, gradient: "from-emerald-500 to-teal-600" },
                { key: "Rejected", label: "✕ Rejected", count: stats.rejected, gradient: "from-red-500 to-rose-600" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab.key
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md`
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-400">
              {loading ? (
                <span className="inline-flex items-center gap-1.5 text-cyan-400">
                  <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Loading applications...
                </span>
              ) : (
                <>
                  Showing <span className="font-bold text-white">{filteredApps.length}</span> application
                  {filteredApps.length !== 1 ? "s" : ""}
                </>
              )}
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by player name, email, sport, or location..."
              className="w-full rounded-xl border border-white/10 bg-slate-900/90 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ——— Applications Grid ——— */}
        <section className="mt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <svg className="animate-spin h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="mt-4 text-sm text-slate-400">Loading applications...</p>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-slate-900/40 py-16 px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl mb-4">
                {activeTab === "all" ? "📭" : activeTab === "Pending" ? "⏳" : activeTab === "Accepted" ? "✓" : "✕"}
              </div>
              <h3 className="text-xl font-bold text-white">
                {activeTab === "all" ? "No Applications Yet" : `No ${activeTab} Applications`}
              </h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                {activeTab === "all"
                  ? "No players have applied to your academy yet. Once players submit applications, they will appear here."
                  : `No applications with "${activeTab}" status found. Try checking other tabs.`}
              </p>
              {activeTab !== "all" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110"
                >
                  View All Applications →
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApps.map((app) => {
                const sc = statusConfig[app.status] || statusConfig.Pending;
                const isUpdating = updatingId === app._id;
                const playerSports = getPlayerSports(app);
                const experience = getPlayerExperience(app);

                return (
                  <div
                    key={app._id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${sc.border} bg-gradient-to-b from-slate-900/90 to-slate-950/80 hover:shadow-2xl`}
                  >
                    {/* Card Header */}
                    <div className="p-5 sm:p-6">
                      {/* Status Badge + Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full ${sc.bg} border ${sc.border} px-3 py-1 text-xs font-extrabold ${sc.text}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                          {sc.icon} {app.status}
                        </span>
                        <span className="text-xs text-slate-500">{formatDate(app.createdAt)}</span>
                      </div>

                      {/* Player Avatar & Name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 text-lg font-black text-cyan-400">
                          {getPlayerName(app).charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-extrabold text-white truncate group-hover:text-cyan-400 transition-colors">
                            {getPlayerName(app)}
                          </h3>
                          <p className="text-xs text-slate-400 truncate">{getPlayerEmail(app)}</p>
                        </div>
                      </div>

                      {/* Player Details */}
                      <div className="space-y-2.5">
                        {/* Phone */}
                        <div className="flex items-center gap-2 text-xs">
                          <svg className="h-3.5 w-3.5 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="text-slate-300">{getPlayerPhone(app)}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-xs">
                          <svg className="h-3.5 w-3.5 text-orange-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-slate-300">{getPlayerLocation(app)}</span>
                        </div>

                        {/* Sports Tags */}
                        {playerSports.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {playerSports.map((sport, idx) => (
                              <span
                                key={idx}
                                className="rounded-lg bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 text-xs font-bold text-orange-300"
                              >
                                {sport}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Experience + Level */}
                        <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-xs mt-2">
                          <div>
                            <span className="text-slate-400 block">Experience</span>
                            <span className="font-bold text-white">
                              {experience ? `${experience}+ Years` : "—"}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Level</span>
                            <span className="font-bold text-cyan-400">
                              {app.playerId?.sports?.[0]?.currentLevel || "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer — Actions */}
                    <div className="p-5 sm:p-6 pt-0">
                      {app.status === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusUpdate(app._id, "Accepted")}
                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 hover:shadow-xl active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUpdating ? (
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                            ) : (
                              <>✓ Accept</>
                            )}
                          </button>
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusUpdate(app._id, "Rejected")}
                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20 hover:border-red-500/50 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUpdating ? (
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                            ) : (
                              <>✕ Reject</>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`flex items-center justify-center gap-2 rounded-xl ${sc.bg} border ${sc.border} px-4 py-2.5 text-xs font-bold ${sc.text}`}
                        >
                          <span className={`h-2 w-2 rounded-full ${sc.dot}`} />
                          Application {app.status}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
