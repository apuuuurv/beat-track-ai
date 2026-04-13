import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Activity, BookOpen, Menu, X, Cpu } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Prediction", path: "/prediction", icon: Activity },
    { name: "Health Insights", path: "/resources", icon: BookOpen },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-slate-950/80 backdrop-blur-md p-4 border-b border-white/5 fixed top-0 w-full z-[100]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-white tracking-tight">BeatTrack</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-300 p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[110] md:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR CONTAINER */}
      <div
        className={`
          glass fixed md:sticky top-0 left-0 z-[120] 
          h-screen w-72 bg-slate-950/40 p-6 border-r border-white/5
          flex flex-col transition-all duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${!isOpen ? "pointer-events-none md:pointer-events-auto" : "pointer-events-auto"}
        `}
      >

        {/* LOGO SECTION */}
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tighter leading-none">
              BeatTrack
            </h1>
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em]">Neural AI</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-3 flex-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="relative group block"
              >
                <div
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl transition-all duration-300
                    ${active 
                      ? "text-white" 
                      : "text-slate-500 hover:text-slate-200"
                    }
                  `}
                >
                  {/* Active Background Glow */}
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-2xl z-0"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                      <div className="absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.1)]" />
                    </motion.div>
                  )}
                  
                  <link.icon className={`relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${active ? "text-blue-500" : ""}`} />
                  <span className="relative z-10 font-medium tracking-wide">{link.name}</span>
                  
                  {active && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* AI ENGINE STATUS (HEARTBEAT MONITOR) */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sys Status</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Live</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                {/* Heartbeat Pulse Effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-1 bg-emerald-500 rounded-full blur-sm"
                />
                <div className="relative w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-bold text-white tracking-wide">AI Core Online</p>
                <div className="flex gap-1 items-center">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["2px", "8px", "4px", "10px", "2px"] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.8, 
                        delay: i * 0.1,
                        ease: "linear"
                      }}
                      className="w-0.5 bg-emerald-500/40 rounded-full"
                    />
                  ))}
                  <p className="text-[9px] text-slate-500 font-mono ml-1 uppercase">Syncing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
