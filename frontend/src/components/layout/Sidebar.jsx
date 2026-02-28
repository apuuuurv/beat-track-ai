import { Link } from "react-router-dom";
import { LayoutDashboard, Activity, BookOpen } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 p-5 border-r border-slate-800 h-screen flex flex-col">
      {/* --- LOGO SECTION ADDED HERE --- */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <img
          src="/beat-track-logo.png"
          alt="BeatTrack Logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-2xl font-bold text-blue-500 tracking-tight">
          BeatTrack
        </h1>
      </div>

      <nav className="space-y-4 text-slate-300">
        <Link
          to="/"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-all"
        >
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link
          to="/prediction"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-all"
        >
          <Activity size={20} /> Prediction
        </Link>

        <Link
          to="/resources"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-all"
        >
          <BookOpen size={20} /> Health Insights
        </Link>
      </nav>

      {/* Optional: Add a subtle 'Status' indicator at the bottom to fill space */}
      <div className="mt-auto p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-slate-400 font-medium">
            AI Engine Online
          </span>
        </div>
      </div>
    </div>
  );
}
