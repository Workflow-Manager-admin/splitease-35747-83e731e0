import React from "react";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export function Sidebar({ setSelectedPage, selectedPage }) {
  const { supabase, user } = useAuth();

  // PUBLIC_INTERFACE
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { code: "dashboard", label: "Dashboard", icon: "🏠" },
    { code: "history", label: "History", icon: "🕑" },
    { code: "settleup", label: "Settle-up", icon: "💸" },
  ];

  return (
    <aside className="bg-primary text-white w-56 flex flex-col shadow h-screen sticky top-0">
      <div className="px-6 py-5 flex items-center text-2xl font-bold">
        <span className="mr-2">🧾</span> SplitEase
      </div>
      <nav className="flex flex-col flex-1 gap-1">
        {navItems.map((item) => (
          <button
            key={item.code}
            className={`px-6 py-3 flex items-center gap-3 text-lg rounded-r-full transition ${
              selectedPage === item.code
                ? "bg-secondary text-primary font-semibold"
                : "bg-transparent hover:bg-accent/90 hover:text-white"
            }`}
            onClick={() => setSelectedPage(item.code)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto px-6 py-4 text-sm">
        <div className="mb-2">Logged in as:</div>
        <div className="mb-3 font-mono truncate">{user?.email}</div>
        <button
          className="bg-white hover:bg-accent text-primary font-bold py-2 px-4 rounded w-full"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
