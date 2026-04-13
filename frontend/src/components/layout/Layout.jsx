import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 font-sans selection:bg-blue-500/30">
      {/* Sidebar - Handles its own mobile/desktop behavior */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="max-w-[1600px] mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>

  );
}
