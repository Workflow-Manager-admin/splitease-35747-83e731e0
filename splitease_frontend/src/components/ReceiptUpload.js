import React, { useRef, useState } from "react";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export function ReceiptUpload({ onUploaded }) {
  const { supabase, user } = useAuth();
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [message, setMessage] = useState("");

  // PUBLIC_INTERFACE
  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!file) return;
    if (!file.type.match(/image|pdf/)) {
      setMessage("Please select a JPG, PNG, or PDF file.");
      return;
    }
    setParsing(true);
    try {
      // Upload to Supabase Storage (bucket: receipts)
      const filename = `${user.id}_${Date.now()}_${file.name}`;
      let { error: storageError } = await supabase.storage
        .from("receipts")
        .upload(filename, file);
      if (storageError) throw storageError;

      // STUB: OCR API call
      // In production, send to backend API that calls Google Cloud Vision API
      // Here, just stub out parsed items
      const stubParsed = {
        items: [
          { name: "Burger", price: 9.99, assignedTo: [] },
          { name: "Fries", price: 3.99, assignedTo: [] },
          { name: "Coke", price: 2.49, assignedTo: [] },
        ],
        subtotal: 16.47,
        tax: 1.32,
        tip: 2.00,
        total: 19.79,
      };

      // Store receipt record in Supabase DB
      let { data, error: dbError } = await supabase
        .from("receipts")
        .insert([
          {
            user_id: user.id,
            filename: filename,
            uploaded_at: new Date().toISOString(),
            items: stubParsed.items,
            subtotal: stubParsed.subtotal,
            tax: stubParsed.tax,
            tip: stubParsed.tip,
            total: stubParsed.total,
            status: "parsed",
          },
        ])
        .select()
        .single();
      if (dbError) throw dbError;

      setMessage("Receipt uploaded and parsed!");
      onUploaded && onUploaded(data);
      setFile(null);
    } catch (err) {
      setMessage(
        err.message ||
          "Failed to upload/parse receipt. Check your Supabase config."
      );
    } finally {
      setParsing(false);
    }
  };

  return (
    <form className="my-5 bg-white p-6 rounded shadow flex items-center gap-4" onSubmit={handleUpload}>
      <input
        type="file"
        accept="image/*,.pdf"
        className="border p-2 rounded w-64"
        onChange={(e) => setFile(e.target.files?.[0])}
        disabled={parsing}
      />
      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        disabled={!file || parsing}
      >
        {parsing ? "Parsing..." : "Upload Receipt"}
      </button>
      {message && <span className="ml-3 text-accent text-sm">{message}</span>}
    </form>
  );
}
