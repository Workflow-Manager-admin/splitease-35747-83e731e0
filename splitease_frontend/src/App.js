import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { Dashboard } from "./components/Dashboard";
import { ReceiptUpload } from "./components/ReceiptUpload";
import { ReceiptDetail } from "./components/ReceiptDetail";
import { SettleUp } from "./components/SettleUp";
import { HistoryAndExport } from "./components/HistoryAndExport";
import { AuthForm } from "./components/AuthForm";
import "./tailwind.output.css"; // TailwindCSS build output (ensure build process outputs this)

function MainRoutes() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [currentReceipt, setCurrentReceipt] = useState(null);

  // If a receipt is selected, show ReceiptDetail, else show regular page routes
  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar setSelectedPage={setSelectedPage} selectedPage={selectedPage} />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {currentReceipt ? (
          <ReceiptDetail
            receipt={currentReceipt}
            onBack={() => setCurrentReceipt(null)}
          />
        ) : (
          <>
            {selectedPage === "dashboard" && (
              <Dashboard
                onSelectReceipt={setCurrentReceipt}
                renderUpload={() => (
                  <ReceiptUpload
                    onUploaded={(rec) => {
                      setCurrentReceipt(rec);
                    }}
                  />
                )}
              />
            )}
            {selectedPage === "history" && (
              <HistoryAndExport onSelectReceipt={setCurrentReceipt} />
            )}
            {selectedPage === "settleup" && <SettleUp />}
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SplitEaseContainer />
    </AuthProvider>
  );
}

// PUBLIC_INTERFACE
function SplitEaseContainer() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-primary text-lg font-medium animate-pulse">
          Loading SplitEase...
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="mb-6 flex items-center gap-2 shadow-md rounded-full px-5 py-2 bg-white">
          <span className="font-bold text-2xl text-primary">SplitEase</span>
          <span className="rounded-full bg-accent w-2 h-2"></span>
        </div>
        <AuthForm />
      </div>
    );
  }

  return <MainRoutes />;
}

export default App;
