import { User, Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-20 min-h-[80px] w-full border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
      {/* Left Side: Dynamic Page Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Heart Disease <span className="text-blue-500">AI System</span>
        </h2>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
            Diagnostic Mode
          </span>
        </div>
      </div>

      {/* Right Side: Search, Notifications, and Developer Profile */}
      <div className="flex items-center gap-6">
        {/* Decorative Icons for a "Fuller" look */}
        <div className="hidden sm:flex items-center gap-4 text-slate-500 mr-4 border-r border-slate-800 pr-6"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-200 leading-none">
              Developed by Apurv
            </p>
            <p className="text-[10px] text-blue-500 font-medium mt-1 uppercase tracking-tighter">
              System Lead
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
