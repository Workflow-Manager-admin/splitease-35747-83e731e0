import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export function HistoryAndExport({ onSelectReceipt }) {
  const { supabase, user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // PUBLIC_INTERFACE
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from("receipts")
        .select("*")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false });
      if (!error) setHistory(data || []);
      setLoading(false);
    };
    fetchHistory();
  }, [user, supabase]);

  // PUBLIC_INTERFACE
  const handleExport = (receipt) => {
    // Simulate PDF/CSV export (stub)
    alert(
      `Export feature is a stub for receipt '${receipt.filename}'. In production, would generate PDF/CSV for: ${JSON.stringify(
        receipt,
        null,
        2
      )}`
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">History</h1>
      {loading ? (
        <div className="py-6">Loading history...</div>
      ) : history.length === 0 ? (
        <div className="text-gray-500">No past bills yet.</div>
      ) : (
        <table className="w-full border bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-secondary">
              <th className="py-2 px-2 text-left">Date</th>
              <th className="py-2 px-2 text-left">File</th>
              <th className="py-2 px-2 text-left">Total</th>
              <th className="py-2 px-2 text-left">Export</th>
              <th className="py-2 px-2 text-left">Status</th>
              <th className="py-2 px-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((r) => (
              <tr key={r.id} className="border-b hover:bg-blue-50">
                <td>{new Date(r.uploaded_at).toLocaleDateString()}</td>
                <td>{r.filename}</td>
                <td>${Number(r.total).toFixed(2)}</td>
                <td>
                  <button
                    className="text-primary underline"
                    onClick={() => handleExport(r)}
                  >
                    Export
                  </button>
                </td>
                <td>
                  {/* Status can be "paid", "pending", "unpaid" */}
                  <span
                    className={
                      r.status === "paid"
                        ? "text-green-700"
                        : r.status === "pending"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }
                  >
                    {r.status || "unpaid"}
                  </span>
                </td>
                <td>
                  <button
                    className="underline text-blue-600"
                    onClick={() => onSelectReceipt(r)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
