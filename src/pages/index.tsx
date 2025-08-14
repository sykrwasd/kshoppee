import { useState,useEffect } from "react";
import { useRouter } from "next/router";

export default function ClosingReport() {

  const router = useRouter();

  const [rows, setRows] = useState<{ itemName: string; quantity: number; amount: number }[]>([]);

  const [items] = useState([
    { itemName: "ayam", price: "17" },
    { itemName: "ikan", price: "14" },
    { itemName: "kucing", price: "10" }
  ]);

  // Add a blank row
  const handleAddItem = () => {
    setRows([...rows, { itemName: "", quantity: 0, amount: 0 }]);
  };

  // When an item is selected
  const handleSelect = (index: number, selectedName: string) => {
    const selectedItem = items.find((i) => i.itemName === selectedName);

    console.log(selectedItem)
    
    if (!selectedItem) return;

    setRows((prevRows) => {
      const updated = [...prevRows];
      console.log(updated)
      const quantity = updated[index].quantity || 0;
      console.log(quantity)
      updated[index].itemName = selectedName;
      updated[index].amount = quantity * Number(selectedItem.price);
      console.log("Updated list",updated)
      return updated;
    });

  };

  // When quantity changes
  const handleQuantityChange = (index: number, qty: number) => {
    setRows((prevRows) => {
      const updated = [...prevRows];
      updated[index].quantity = qty;

      const selectedItem = items.find((i) => i.itemName === updated[index].itemName);
      if (selectedItem) {
        updated[index].amount = qty * Number(selectedItem.price);
      }
      return updated;
    });
  };

  // Remove last row
  const handleRemoveItem = () => {
    setRows((prevRows) => prevRows.slice(0, -1));
  };

  // Calculate total price
  const totalPrice = rows.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-4xl mx-auto bg-blue-300 p-6 rounded-lg shadow-lg">
        <button
          className="btn btn-primary rounded-xl self-start"
          onClick={() => router.push("/admin")}
        >
          Admin
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          DAILY CLOSING REPORT
        </h2>

        {/* Name & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="label text-black">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="label text-black">Date</label>
            <input type="date" className="input input-bordered w-full" />
          </div>
        </div>

        {/* Dynamic rows */}
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <select
              className="bg-black text-white border-black rounded-sm"
              value={row.itemName || ""}
              onChange={(e) => handleSelect(index, e.target.value)}
            >
              <option value="" disabled>
                Select An Item
              </option>
              {items.map((item) => (
                <option key={item.itemName} value={item.itemName}>
                  {item.itemName}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={row.quantity || ""}
              onChange={(e) =>
                handleQuantityChange(index, Number(e.target.value))
              }
              className="input input-bordered w-full"
            />

            <input
              type="number"
              placeholder="Amount"
              value={row.amount || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        ))}

        {/* Total price */}
        <div className="flex items-center gap-4 mb-5">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Total Price"
            value={totalPrice}
            readOnly
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <button
            className="btn btn-primary rounded-2xl"
            onClick={handleAddItem}
          >
            Add
          </button>
          <button
            className="btn btn-error rounded-2xl"
            onClick={handleRemoveItem}
          >
            Remove
          </button>
          <button className="btn btn-accent rounded-2xl">Print</button>
        </div>
      </div>

      <footer className="mt-6 text-blue-600 text-center text-sm opacity-70">
        &copy; 2025 Umar Syakir. All Rights Reserved.
      </footer>
    </div>
  );
}
