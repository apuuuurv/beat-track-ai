import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* ADDED no-scrollbar HERE 👇 */}
        <main className="p-6 overflow-y-auto no-scrollbar">{children}</main>
      </div>
    </div>
  );
}
