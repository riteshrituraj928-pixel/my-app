import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../src/context/AuthContext";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

// Default comprehensive list of sports scouts and academies across India
const INITIAL_SCOUTS = [
  {
    _id: "scout_01",
    instituteName: "Haryana Kushti & Akhada Foundation",
    coachName: "Coach Mahavir Singh",
    institutePic: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    location: { city: "Rohtak", state: "Haryana", country: "India" },
    sportsPlayed: ["Wrestling", "Kabaddi"],
    earlierExperience: {
      yearsOfExperience: 14,
      summary: "Trained 6 national medalists and 2 international wrestlers. Specializes in Dangal, Greco-Roman & Freestyle wrestling."
    },
    fee: { amount: 1500, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 340,
    profileStatus: "Verified",
    rating: 4.9,
    openings: 8,
    contactEmail: "haryana.akhada@gaonkhiladi.in"
  },
  {
    _id: "scout_02",
    instituteName: "National Cricket Excellence Academy",
    coachName: "Sunil Deshmukh (BCCI Level 3)",
    institutePic: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    location: { city: "Ranchi", state: "Jharkhand", country: "India" },
    sportsPlayed: ["Cricket"],
    earlierExperience: {
      yearsOfExperience: 18,
      summary: "State selection committee member. Focus on fast bowling, wicket-keeping & middle-order batting techniques for rural talent."
    },
    fee: { amount: 2500, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 520,
    profileStatus: "Verified",
    rating: 4.8,
    openings: 5,
    contactEmail: "sunil.deshmukh@gaonkhiladi.in"
  },
  {
    _id: "scout_03",
    instituteName: "Golden Boot Grassroots Football Club",
    coachName: "Sanjoy Sen",
    institutePic: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    location: { city: "Kolkata", state: "West Bengal", country: "India" },
    sportsPlayed: ["Football"],
    earlierExperience: {
      yearsOfExperience: 11,
      summary: "I-League certified scouting scout. Actively recruiting strikers and wingers for district & state league trials."
    },
    fee: { amount: 1200, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 280,
    profileStatus: "Verified",
    rating: 4.7,
    openings: 12,
    contactEmail: "goldenboot.fc@gaonkhiladi.in"
  },
  {
    _id: "scout_04",
    instituteName: "Pro Kabaddi Talent Hunt Center",
    coachName: "Balwanth Choudhary",
    institutePic: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    location: { city: "Jaipur", state: "Rajasthan", country: "India" },
    sportsPlayed: ["Kabaddi"],
    earlierExperience: {
      yearsOfExperience: 15,
      summary: "Former PKL assistant coach. Scouting agile raiders and ankle-hold corner defenders from rural tournaments."
    },
    fee: { amount: 1000, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 410,
    profileStatus: "Verified",
    rating: 4.9,
    openings: 10,
    contactEmail: "balwanth.pkl@gaonkhiladi.in"
  },
  {
    _id: "scout_05",
    instituteName: "SprintSprint Track & Field Institute",
    coachName: "Anju Thomas",
    institutePic: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    location: { city: "Kottayam", state: "Kerala", country: "India" },
    sportsPlayed: ["Athletics"],
    earlierExperience: {
      yearsOfExperience: 12,
      summary: "Specialized speed and endurance training for 100m, 400m, Long Jump, and High Jump village prodigies."
    },
    fee: { amount: 1800, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 190,
    profileStatus: "Verified",
    rating: 4.9,
    openings: 6,
    contactEmail: "athletics.kerala@gaonkhiladi.in"
  },
  {
    _id: "scout_06",
    instituteName: "Apex Smashers Badminton Academy",
    coachName: "Venkatesh Rao",
    institutePic: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    location: { city: "Hyderabad", state: "Telangana", country: "India" },
    sportsPlayed: ["Badminton"],
    earlierExperience: {
      yearsOfExperience: 9,
      summary: "Advanced footwork, smash power drills, and tournament sponsorship pathway for high-potential players."
    },
    fee: { amount: 3000, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 160,
    profileStatus: "Verified",
    rating: 4.6,
    openings: 4,
    contactEmail: "apex.badminton@gaonkhiladi.in"
  },
  {
    _id: "scout_07",
    instituteName: "Olympic Aim Archery Gurukul",
    coachName: "Ranjit Munda",
    institutePic: "https://images.unsplash.com/photo-1511067007772-9da28925790b?auto=format&fit=crop&w=800&q=80",
    location: { city: "Jamshedpur", state: "Jharkhand", country: "India" },
    sportsPlayed: ["Archery"],
    earlierExperience: {
      yearsOfExperience: 16,
      summary: "Traditional and modern Recurve/Compound bow training. Mentored tribal archery talent to national championships."
    },
    fee: { amount: 800, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 220,
    profileStatus: "Verified",
    rating: 4.8,
    openings: 7,
    contactEmail: "archery.gurukul@gaonkhiladi.in"
  },
  {
    _id: "scout_08",
    instituteName: "Punjab Hockey Knights Academy",
    coachName: "Harpreet Singh Sandhu",
    institutePic: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80",
    location: { city: "Jalandhar", state: "Punjab", country: "India" },
    sportsPlayed: ["Hockey"],
    earlierExperience: {
      yearsOfExperience: 20,
      summary: "Grassroots turf training, penalty corner mastering, and direct feeder link to state and national junior camps."
    },
    fee: { amount: 1500, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 480,
    profileStatus: "Verified",
    rating: 4.9,
    openings: 9,
    contactEmail: "hockey.punjab@gaonkhiladi.in"
  },
  {
    _id: "scout_09",
    instituteName: "Thunder Spikes Volleyball Club",
    coachName: "Rajan Pillai",
    institutePic: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80",
    location: { city: "Calicut", state: "Kerala", country: "India" },
    sportsPlayed: ["Volleyball"],
    earlierExperience: {
      yearsOfExperience: 10,
      summary: "Focus on vertical leap elevation, smash timing, and defensive reception tactics for rural club players."
    },
    fee: { amount: 1100, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 140,
    profileStatus: "Verified",
    rating: 4.7,
    openings: 8,
    contactEmail: "volleyball.kerala@gaonkhiladi.in"
  },
  {
    _id: "scout_10",
    instituteName: "Grandmaster Minds Chess Center",
    coachName: "Arunachalam S.",
    institutePic: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
    location: { city: "Chennai", state: "Tamil Nadu", country: "India" },
    sportsPlayed: ["Chess"],
    earlierExperience: {
      yearsOfExperience: 13,
      summary: "FIDE Master coaching. Tactical analysis, endgame mastery, and FIDE rating acceleration."
    },
    fee: { amount: 2000, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 310,
    profileStatus: "Verified",
    rating: 4.8,
    openings: 15,
    contactEmail: "chess.masters@gaonkhiladi.in"
  }
];

const ALL_SPORTS_FILTER = [
  "All Sports",
  "Kabaddi",
  "Wrestling",
  "Cricket",
  "Football",
  "Athletics",
  "Badminton",
  "Archery",
  "Hockey",
  "Volleyball",
  "Chess"
];

export default function PlayerHome() {
  const { user } = useAuth();
  const [scouts, setScouts] = useState(INITIAL_SCOUTS);
  // Storage key specific to this logged in player
  const storageKey = `gaonkhiladi_applied_${user?.id || user?._id || user?.email || "guest_player"}`;

  const [applications, setApplications] = useState(() => {
    try {
      const cached = localStorage.getItem(storageKey);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });
  const [loading, setLoading] = useState(false);
  const [applyingId, setApplyingId] = useState(null);

  // Filters & Tabs state
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'available' | 'applied'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedScoutForModal, setSelectedScoutForModal] = useState(null);

  // Fetch from backend API if available
  useEffect(() => {
    const fetchBackendData = async () => {
      setLoading(true);
      try {
        // Fetch scouts
        const scoutsRes = await fetch("http://localhost:4000/api/v1/scouts");
        if (scoutsRes.ok) {
          const scoutsData = await scoutsRes.json();
          if (scoutsData.data && scoutsData.data.length > 0) {
            // Merge backend scouts with initial showcase scouts
            const backendMap = new Map();
            scoutsData.data.forEach((s) => backendMap.set(s._id, s));
            INITIAL_SCOUTS.forEach((s) => {
              if (!backendMap.has(s._id)) {
                backendMap.set(s._id, s);
              }
            });
            setScouts(Array.from(backendMap.values()));
          }
        }

        // Fetch player applications from backend
        const playerId = user?.id || user?._id;
        if (playerId) {
          const appsRes = await fetch(`http://localhost:4000/api/v1/applications/player/${playerId}`);
          if (appsRes.ok) {
            const appsData = await appsRes.json();
            if (appsData.data) {
              const serverApps = {};
              appsData.data.forEach((app) => {
                const sId = typeof app.scoutId === "object" ? app.scoutId?._id : app.scoutId;
                if (sId) {
                  serverApps[sId] = {
                    status: app.status || "Pending",
                    appliedAt: app.createdAt || new Date().toISOString(),
                    applicationId: app._id
                  };
                }
              });
              setApplications((prev) => {
                const merged = { ...prev, ...serverApps };
                localStorage.setItem(storageKey, JSON.stringify(merged));
                return merged;
              });
            }
          }
        }
      } catch (err) {
        console.log("Backend offline or unreachable, running in resilient client mode:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBackendData();
  }, [user, storageKey]);

  // Handle Player applying to a Scout
  const handleApply = async (scout) => {
    if (applications[scout._id]) {
      toast("You have already applied to this scout!", { icon: "ℹ️" });
      return;
    }

    setApplyingId(scout._id);
    const playerId = user?.id || user?._id || "player_local";

    const newAppEntry = {
      status: "Pending",
      appliedAt: new Date().toISOString(),
      scoutName: scout.instituteName,
      coachName: scout.coachName
    };

    try {
      // Attempt backend API post
      const res = await fetch("http://localhost:4000/api/v1/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: playerId,
          scoutId: scout._id
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.data?._id) {
          newAppEntry.applicationId = data.data._id;
        }
      }
    } catch (err) {
      console.warn("Backend apply request skipped, saved locally:", err);
    }

    // Update state & persist locally
    setApplications((prev) => {
      const updated = { ...prev, [scout._id]: newAppEntry };
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });

    setApplyingId(null);
    setSelectedScoutForModal(null);
    toast.success(`Application sent to ${scout.instituteName}! 🚀`, {
      duration: 4000,
      icon: "🎉"
    });
  };

  // Extract unique states for filter dropdown
  const uniqueStates = useMemo(() => {
    const states = new Set(scouts.map((s) => s.location?.state).filter(Boolean));
    return ["All States", ...Array.from(states).sort()];
  }, [scouts]);

  // Filtered scouts list
  const filteredScouts = useMemo(() => {
    return scouts.filter((scout) => {
      const isApplied = !!applications[scout._id];

      // Tab filter
      if (activeTab === "available" && isApplied) return false;
      if (activeTab === "applied" && !isApplied) return false;

      // Sport filter
      if (
        selectedSport !== "All Sports" &&
        !scout.sportsPlayed?.some(
          (sp) => sp.toLowerCase() === selectedSport.toLowerCase()
        )
      ) {
        return false;
      }

      // State filter
      if (
        selectedState !== "All States" &&
        scout.location?.state?.toLowerCase() !== selectedState.toLowerCase()
      ) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = scout.instituteName?.toLowerCase().includes(q);
        const matchCoach = scout.coachName?.toLowerCase().includes(q);
        const matchCity = scout.location?.city?.toLowerCase().includes(q);
        const matchState = scout.location?.state?.toLowerCase().includes(q);
        const matchSport = scout.sportsPlayed?.some((sp) =>
          sp.toLowerCase().includes(q)
        );
        if (!matchName && !matchCoach && !matchCity && !matchState && !matchSport) {
          return false;
        }
      }

      return true;
    });
  }, [scouts, applications, activeTab, selectedSport, selectedState, searchQuery]);

  const appliedCount = Object.keys(applications).length;
  const availableCount = scouts.length - appliedCount;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
        {/* ——— Welcome Player Hero Banner ——— */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Subtle decorative glow accents */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Info */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
                <span>🏃 Athlete Dashboard</span>
                <span>•</span>
                <span>Active Scouting Season</span>
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                  {user?.name || "Player"}!
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect directly with certified sports scouts, regional coaches, and talent academies looking to nurture grassroots village champions.
              </p>

              {/* Player Registered Sports Chips */}
              {user?.sports && user.sports.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Your Sports:</span>
                  {user.sports.map((sport, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md"
                    >
                      ⭐ {sport}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Quick Stats Cards & Applied Quick-Filter Button */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:w-auto">
              {/* Total Scouts */}
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                  activeTab === "all"
                    ? "border-emerald-500 bg-emerald-500/15 shadow-lg shadow-emerald-500/20 scale-105"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black text-white">{scouts.length}</span>
                <span className="text-xs font-semibold text-slate-300 mt-1">Total Scouts</span>
              </button>

              {/* Available to Apply */}
              <button
                type="button"
                onClick={() => setActiveTab("available")}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                  activeTab === "available"
                    ? "border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-500/20 scale-105"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{availableCount}</span>
                <span className="text-xs font-semibold text-slate-300 mt-1">Available</span>
              </button>

              {/* Applied Scouts (Interactive Button as Requested) */}
              <button
                type="button"
                onClick={() => setActiveTab("applied")}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                  activeTab === "applied"
                    ? "border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30 scale-105 ring-2 ring-emerald-400/50"
                    : "border-white/10 bg-white/5 hover:border-emerald-500/40 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400">{appliedCount}</span>
                  <span className="text-emerald-400 text-sm">✓</span>
                </div>
                <span className="text-xs font-bold text-emerald-300 mt-1">Applied Scouts</span>
              </button>
            </div>
          </div>
        </div>

        {/* ——— Controls & Filters Section ——— */}
        <div className="mt-8 space-y-4">
          {/* Main Tab Toggle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            {/* View Tabs */}
            <div className="flex items-center rounded-2xl bg-slate-900/90 p-1.5 border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🌟 All Scouts</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                  {scouts.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("available")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "available"
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>⚡ Available to Apply</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                  {availableCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("applied")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "applied"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/30"
                    : "text-emerald-400 hover:text-emerald-300 font-extrabold"
                }`}
              >
                <span>✓ Applied Scouts</span>
                <span className="rounded-full bg-emerald-400/20 border border-emerald-400/40 px-2 py-0.5 text-xs font-bold text-emerald-300">
                  {appliedCount}
                </span>
              </button>
            </div>

            {/* Quick Helper Text */}
            <p className="text-xs text-slate-400">
              {loading ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Syncing live scouts...
                </span>
              ) : (
                <>
                  Showing <span className="font-bold text-white">{filteredScouts.length}</span> scout academies
                </>
              )}
            </p>
          </div>

          {/* Search, Sport Dropdown, and State Selector */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
            {/* Search Input */}
            <div className="relative sm:col-span-6 lg:col-span-7">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by academy name, coach, sport, or city..."
                className="w-full rounded-xl border border-white/10 bg-slate-900/90 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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

            {/* State Filter Dropdown */}
            <div className="sm:col-span-3 lg:col-span-2">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition-all focus:border-emerald-500"
              >
                {uniqueStates.map((st) => (
                  <option key={st} value={st} className="bg-slate-900 text-white">
                    📍 {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters button */}
            <div className="sm:col-span-3 lg:col-span-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSport("All Sports");
                  setSelectedState("All States");
                  setActiveTab("all");
                }}
                className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
              >
                ↻ Reset Filters
              </button>
            </div>
          </div>

          {/* Horizontal Sport Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ALL_SPORTS_FILTER.map((sport) => {
              const active = selectedSport === sport;
              return (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setSelectedSport(sport)}
                  className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    active
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                      : "border border-white/10 bg-slate-900 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {sport}
                </button>
              );
            })}
          </div>
        </div>

        {/* ——— Scouts Grid ——— */}
        <section className="mt-8">
          {filteredScouts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-slate-900/40 py-16 px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl mb-4">
                🔍
              </div>
              <h3 className="text-xl font-bold text-white">No Scouts Found</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                {activeTab === "applied"
                  ? "You haven't applied to any scouts yet. Browse the available scouts and submit your application to get scouted!"
                  : "No scouts matched your active search and filters. Try adjusting your sport or state selection."}
              </p>
              {activeTab === "applied" ? (
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110"
                >
                  Browse All Scouts →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSport("All Sports");
                    setSelectedState("All States");
                  }}
                  className="mt-6 rounded-xl bg-white/10 px-5 py-2 text-xs font-bold text-white hover:bg-white/20"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredScouts.map((scout) => {
                const application = applications[scout._id];
                const isApplied = !!application;
                const isApplyingThis = applyingId === scout._id;

                return (
                  <div
                    key={scout._id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${
                      isApplied
                        ? "border-emerald-500/40 bg-gradient-to-b from-slate-900/90 to-emerald-950/20 shadow-xl shadow-emerald-950/20"
                        : "border-white/10 bg-slate-900/80 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-950/40"
                    }`}
                  >
                    {/* Top Media & Header */}
                    <div>
                      {/* Scout Image Banner */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                        <img
                          src={scout.institutePic}
                          alt={scout.instituteName}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {/* Status / Applied Badge Overlay */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          {isApplied ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-extrabold text-white shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-300/30">
                              <span>✓ Applied</span>
                              <span className="rounded-full bg-emerald-700/80 px-1.5 py-0.2 text-[10px]">
                                {application.status || "Pending"}
                              </span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                              ✓ Verified Academy
                            </span>
                          )}
                        </div>

                        {/* Openings Pill */}
                        {scout.openings && (
                          <div className="absolute top-3 right-3 rounded-full bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-xs font-extrabold text-slate-950 shadow">
                            🔥 {scout.openings} Openings
                          </div>
                        )}

                        {/* Location Tag */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-slate-200">
                          <svg className="h-3.5 w-3.5 text-orange-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>
                            {scout.location?.city}, {scout.location?.state}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 sm:p-6">
                        {/* Title & Coach */}
                        <h3 className="text-lg font-extrabold text-white leading-snug group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {scout.instituteName}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 mt-1">
                          Head Coach: <span className="text-slate-200">{scout.coachName || "Certified Scout"}</span>
                        </p>

                        {/* Sports Played Tags */}
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {scout.sportsPlayed?.map((sp, idx) => (
                            <span
                              key={idx}
                              className="rounded-lg bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 text-xs font-bold text-orange-300"
                            >
                              {sp}
                            </span>
                          ))}
                        </div>

                        {/* Experience Summary */}
                        <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {scout.earlierExperience?.summary || "Dedicated sports scout working to evaluate and elevate promising village players to state and national platforms."}
                        </p>

                        {/* Stats Row */}
                        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-xs">
                          <div>
                            <span className="text-slate-400 block">Experience</span>
                            <span className="font-bold text-white">
                              {scout.earlierExperience?.yearsOfExperience || 8}+ Years
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Athletes Trained</span>
                            <span className="font-bold text-emerald-400">
                              {scout.studentsTrainedEarlier || 120}+ Athletes
                            </span>
                          </div>
                        </div>

                        {/* Fee Structure */}
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs">
                          <span className="text-slate-400">Fee Structure:</span>
                          <span className="font-extrabold text-amber-300">
                            {scout.fee?.currency === "INR" ? "₹" : "$"}
                            {scout.fee?.amount?.toLocaleString()}{" "}
                            <span className="text-[11px] font-normal text-slate-400">
                              / {scout.fee?.unit || "month"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 sm:p-6 pt-0">
                      {isApplied ? (
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedScoutForModal(scout)}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 py-3 text-xs sm:text-sm font-extrabold text-emerald-300 transition-all hover:bg-emerald-500/30 active:scale-98"
                          >
                            <span>✓ Applied ({application.status || "Pending"})</span>
                            <span className="text-xs text-emerald-400">🔍 View Details</span>
                          </button>
                          <p className="text-center text-[11px] text-slate-400">
                            Applied on {new Date(application.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={isApplyingThis}
                          onClick={() => handleApply(scout)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/35 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                        >
                          {isApplyingThis ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              <span>Submitting Application...</span>
                            </>
                          ) : (
                            <>
                              <span>Apply to Scout</span>
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ——— Application Details Modal ——— */}
        {selectedScoutForModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedScoutForModal(null)}
          >
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedScoutForModal(null)}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl text-emerald-400">
                  📋
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white">Application Status</h3>
                  <p className="text-xs text-slate-400">{selectedScoutForModal.instituteName}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl bg-white/5 p-4 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="font-extrabold text-emerald-400">
                    {applications[selectedScoutForModal._id]?.status || "Pending Review"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Head Coach:</span>
                  <span className="font-semibold text-white">{selectedScoutForModal.coachName}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-white">
                    {selectedScoutForModal.location?.city}, {selectedScoutForModal.location?.state}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Applied On:</span>
                  <span className="font-semibold text-white">
                    {applications[selectedScoutForModal._id]?.appliedAt
                      ? new Date(applications[selectedScoutForModal._id].appliedAt).toLocaleString()
                      : "Recently"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact Inquiry:</span>
                  <span className="font-semibold text-emerald-300">
                    {selectedScoutForModal.contactEmail || "academy@gaonkhiladi.in"}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedScoutForModal(null)}
                  className="w-full rounded-xl bg-white/10 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
