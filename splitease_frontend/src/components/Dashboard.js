import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export function Dashboard({ onSelectReceipt, renderUpload }) {
  const { supabase, user } = useAuth();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  // PUBLIC_INTERFACE
  useEffect(() => {
    const fetchReceipts = async () => {
      setLoading(true);
      // Try table "receipts": user_id, filename, uploaded_at, items, total, status
      let { data, error } = await supabase
        .from("receipts")
        .select("*")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false });
      if (!error) setReceipts(data || []);
      setLoading(false);
    };
    fetchReceipts();
  }, [user, supabase]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Receipts</h1>
      <div>{renderUpload()}</div>
      {loading ? (
        <div className="py-6">Loading receipts...</div>
      ) : (
        <div className="mt-6">
          {receipts.length === 0 ? (
            <div className="text-gray-500">No receipts found. Upload to get started!</div>
          ) : (
            <table className="w-full mt-2 border bg-white rounded shadow text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="py-2 px-2 text-left">Date</th>
                  <th className="py-2 px-2 text-left">File</th>
                  <th className="py-2 px-2 text-left">Total</th>
                  <th className="py-2 px-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-blue-50 cursor-pointer">
                    <td className="py-1 px-2">{new Date(r.uploaded_at).toLocaleDateString()}</td>
                    <td className="py-1 px-2">{r.filename}</td>
                    <td className="py-1 px-2">${Number(r.total).toFixed(2)}</td>
                    <td className="py-1 px-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => onSelectReceipt(r)}
                      >
                        View & Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
