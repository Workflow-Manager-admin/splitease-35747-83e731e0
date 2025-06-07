import React from 'react';

/**
 * Dashboard Component for SplitEase
 * 
 * - Uses TailwindCSS for layout and responsive design
 * - Styled with the app's color scheme (primary: #2563eb, secondary: #f1f5f9, accent: #f59e42)
 * - Placeholder UI for Receipts, History, Split Summary, and Sidebar Navigation
 * - Structured for future integration: receipt upload, list view, split assignment, payment/settle-up, etc.
 */

// Color utility CSS (if Tailwind config not extended yet, use inline style for accents)
// In production, assign these colors in Tailwind config for better reusability.
const COLORS = {
  primary: '#2563eb',
  secondary: '#f1f5f9',
  accent: '#f59e42',
};

// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside
        className="flex flex-col w-60 bg-white border-r border-gray-200 py-7 px-3"
        style={{ backgroundColor: COLORS.secondary }}
      >
        {/* Logo / App Title */}
        <div className="flex items-center mb-10 px-2">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center mr-2"
            style={{ backgroundColor: COLORS.primary, color: '#fff', fontWeight: 700 }}
          >
            <span className="text-xl">S</span>
          </div>
          <span className="text-lg font-bold" style={{ color: COLORS.primary }}>
            SplitEase
          </span>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {/* Placeholder for routing: will be replaced with link components */}
          <button className="flex items-center px-4 py-2 rounded bg-blue-50 text-blue-700 font-semibold mb-1">
            <span className="material-symbols-rounded mr-2 text-xl">dashboard</span>
            Dashboard
          </button>
          <button className="flex items-center px-4 py-2 rounded hover:bg-gray-200 text-gray-700 font-medium">
            <span className="material-symbols-rounded mr-2 text-xl">history</span>
            History
          </button>
          <button className="flex items-center px-4 py-2 rounded hover:bg-gray-200 text-gray-700 font-medium">
            <span className="material-symbols-rounded mr-2 text-xl">payments</span>
            Settle-up
          </button>
        </nav>
        {/* Future: user/account menu */}
        <div className="mt-auto px-2 pt-6">
          <div className="text-xs text-gray-500">
            {/* Placeholder for account controls */}
            Logged in as <span className="font-semibold">[User]</span>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <div className="flex-1 flex flex-col">
        {/* Header Bar */}
        <header className="w-full flex items-center justify-between px-8 py-4 border-b bg-white" style={{ borderColor: COLORS.secondary }}>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            className="px-5 py-2 rounded text-white font-semibold shadow-sm"
            style={{ backgroundColor: COLORS.accent }}
            // Future onClick: open upload modal
          >
            Upload Receipt
          </button>
        </header>

        <main className="flex-1 p-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Left: Receipts Management */}
            <section className="flex-1 min-w-0">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  <span className="material-symbols-rounded mr-2 text-primary" style={{ color: COLORS.primary }}>receipt_long</span>
                  Uploaded Receipts
                </h2>
                {/* Placeholder list */}
                <div className="bg-white border rounded p-4 min-h-[100px] flex flex-col gap-3 shadow-sm">
                  {/* Future: Map over receipts */}
                  <div className="text-gray-400 italic">No receipts yet. Get started by uploading one!</div>
                </div>
              </div>
              {/* Past Receipts/History */}
              <div>
                <h3 className="text-md font-semibold text-gray-600 mb-2 flex items-center">
                  <span className="material-symbols-rounded mr-2 text-gray-400">history</span>
                  Past Receipts
                </h3>
                <div className="bg-gray-100 border rounded p-4 min-h-[70px]">
                  {/* Future: List or Table of past receipts */}
                  <div className="text-gray-400 italic">Your receipt history will appear here.</div>
                </div>
              </div>
            </section>
            {/* Right: Split Summary */}
            <aside className="w-full xl:w-[350px] flex-shrink-0">
              <div className="bg-white border rounded-lg p-5 shadow-lg">
                <h2 className="text-lg font-bold mb-2" style={{ color: COLORS.primary }}>
                  Split Summary
                </h2>
                {/* Placeholder for split calculations */}
                <div className="flex flex-col gap-2">
                  <div className="text-gray-500 italic">
                    Split details will show after parsing and assigning items.
                  </div>
                  {/* Example layout: */}
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-semibold">Subtotal</span>
                      <span className="text-gray-700">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-600">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold" style={{ color: COLORS.accent }}>Total</span>
                      <span className="font-bold" style={{ color: COLORS.accent }}>$0.00</span>
                    </div>
                  </div>
                </div>
                {/* Future: Real-time updates, "Settle-up" button */}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
