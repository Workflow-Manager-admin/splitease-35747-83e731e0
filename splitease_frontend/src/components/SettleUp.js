import React from "react";

// PUBLIC_INTERFACE
export function SettleUp() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settle Up With Friends</h1>
      <div className="bg-white rounded shadow p-6 mb-3">
        <div className="mb-2">
          <span className="font-medium">Select Receipts/People to Settle:</span>
          {/* Dropdowns/selectors for who/which bill to settle, for demonstration purpose */}
          <div className="flex gap-3 mt-2">
            <select className="border px-2 py-1 rounded">
              <option>-- Select Friend --</option>
              <option>Alice</option>
              <option>Bob</option>
            </select>
            <select className="border px-2 py-1 rounded">
              <option>-- Select Bill --</option>
              <option>Burger Night (04/10)</option>
            </select>
          </div>
        </div>
        {/* Stub: Compute amount due and present options */}
        <div className="my-4">
          <span className="font-medium">Amount to settle:</span> $XX.XX
        </div>
        {/* STUB: Venmo/PayPal integration UI */}
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
            onClick={() => alert("Stub: Would redirect to Venmo API")}
          >
            Pay with Venmo
          </button>
          <button
            className="bg-accent text-white px-4 py-2 rounded shadow hover:bg-orange-600"
            onClick={() => alert("Stub: Would redirect to PayPal API")}
          >
            Pay with PayPal
          </button>
        </div>
        <div className="text-gray-500 mt-4 text-xs">
          {/* Placeholder for actual external API integration */}
          <b>Note:</b> Payment integration is a stub. Connect your payment provider to enable this feature.
        </div>
      </div>
    </div>
  );
}
