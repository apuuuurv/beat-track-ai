import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Activity, BookOpen, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Prediction", path: "/prediction", icon: Activity },
    { name: "Health Insights", path: "/resources", icon: BookOpen },
  ];

  return (
    <>
      {/* --- MOBILE TOP BAR --- */}
      {/* Only visible on small screens (hidden on md and up) */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 p-4 border-b border-slate-800 fixed top-0 w-full z-[60]">
        <div className="flex items-center gap-2">
          <img src="/beat-track-logo.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-blue-500">BeatTrack</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-300 p-1 hover:bg-slate-800 rounded-md transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- OVERLAY --- */}
      {/* Darkens the background when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[70] md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <div
        className={`
        fixed md:sticky top-0 left-0 z-[80] 
        h-screen w-64 bg-slate-900 p-5 border-r border-slate-800 
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Logo Section (Hidden on mobile top bar, visible in sidebar) */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <img
            src="/beat-track-logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-2xl font-bold text-blue-500 tracking-tight">
            BeatTrack
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)} // Close menu on click (mobile)
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive(link.path)
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  : "hover:bg-slate-800 hover:text-blue-400"
              }`}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Status Indicator (Bottom) */}
        <div className="mt-auto p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              AI Engine Online
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
