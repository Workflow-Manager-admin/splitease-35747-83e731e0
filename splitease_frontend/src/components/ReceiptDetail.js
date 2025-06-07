import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export function ReceiptDetail({ receipt, onBack }) {
  const [assigned, setAssigned] = useState(() =>
    receipt.items.map((item) => ({ ...item, assignedTo: [...(item.assignedTo || [])] }))
  );
  const [people, setPeople] = useState(
    (() => {
      // Collect all assigned users + self
      const emails = new Set([receipt.user_email || "You"]);
      receipt.items.forEach((i) => (i.assignedTo || []).forEach((p) => emails.add(p)));
      return Array.from(emails);
    })()
  );
  const [tip, setTip] = useState(receipt.tip || 0);

  // Split logic
  const calcSplits = () => {
    // Map from person to subtotal
    const splits = {};
    people.forEach((p) => {
      splits[p] = 0;
    });

    assigned.forEach((item) => {
      if (!item.assignedTo || !item.assignedTo.length) return;
      const share = item.price / item.assignedTo.length;
      item.assignedTo.forEach((p) => {
        splits[p] = (splits[p] || 0) + share;
      });
    });

    // Tax and tip split equally by total share
    const totalBeforeTax = Object.values(splits).reduce((a, b) => a + b, 0);
    const totalWithTaxTip = (Number(receipt.total) || totalBeforeTax);

    let percent = totalBeforeTax > 0 ? (totalWithTaxTip / totalBeforeTax) : 1;
    Object.keys(splits).forEach((p) => {
      splits[p] = Math.round(splits[p] * percent * 100) / 100;
    });
    return splits;
  };

  const handleAssign = (itemIdx, person) => {
    setAssigned((curr) => {
      return curr.map((item, i) =>
        i === itemIdx
          ? {
              ...item,
              assignedTo: item.assignedTo.includes(person)
                ? item.assignedTo.filter((p) => p !== person)
                : [...item.assignedTo, person],
            }
          : item
      );
    });
  };

  // UI to add a new person
  const [addingPerson, setAddingPerson] = useState(false);
  const [personInput, setPersonInput] = useState("");

  const addPerson = () => {
    if (personInput && !people.includes(personInput)) {
      setPeople((ppl) => [...ppl, personInput]);
      setPersonInput("");
    }
  };

  const splits = calcSplits();

  return (
    <div>
      <button className="mb-4 underline text-blue-600" onClick={onBack}>
        ← Back to Dashboard
      </button>
      <h2 className="text-xl font-semibold mb-2">Receipt: {receipt.filename}</h2>
      <div className="mb-4 text-gray-600 text-sm">
        Uploaded: {new Date(receipt.uploaded_at).toLocaleString()}
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">Line Items</h3>
        <table className="w-full mb-4 bg-white rounded shadow-sm">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price ($)</th>
              {people.map((person) => (
                <th key={person}>{person}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assigned.map((item, idx) => (
              <tr key={item.name + idx} className="border-b last:border-none">
                <td>{item.name}</td>
                <td>{Number(item.price).toFixed(2)}</td>
                {people.map((person) => (
                  <td key={person} className="text-center">
                    <input
                      type="checkbox"
                      checked={item.assignedTo.includes(person)}
                      onChange={() => handleAssign(idx, person)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-3 mb-4 items-center">
          <label className="font-medium">Add a friend:</label>
          <input
            type="text"
            value={personInput}
            onChange={(e) => setPersonInput(e.target.value)}
            placeholder="Friend's email or name"
            className="border px-2 py-1 rounded"
          />
          <button
            className="bg-accent px-3 py-1 rounded text-white"
            onClick={addPerson}
            type="button"
          >
            Add
          </button>
        </div>
        <div className="my-4 flex gap-8">
          <div>
            <label className="font-medium mr-1">Tip: </label>
            <input
              type="number"
              value={tip}
              min={0}
              step={0.01}
              className="border px-2 py-1 rounded w-24"
              onChange={(e) => setTip(Number(e.target.value))}
            />
          </div>
          <div>
            <span className="font-medium">Tax: </span>${Number(receipt.tax).toFixed(2)}
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border rounded-lg p-4 mt-5">
        <h3 className="font-semibold mb-2">Split Summary</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th>Person</th>
              <th>Owes ($)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(splits).map(([person, amt]) => (
              <tr key={person}>
                <td>{person === "You" ? <b>{person}</b> : person}</td>
                <td>${amt.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-6 bg-primary text-white px-8 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => alert("Saved (not implemented)")}
      >
        Save Splits
      </button>
    </div>
  );
}
