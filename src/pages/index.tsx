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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-['Inter',system-ui,sans-serif]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Daily Closing Report
          </h1>
          <p className="text-gray-600 text-xl font-medium tracking-wide">Track your daily sales and inventory with precision</p>
        </div>

        {/* Admin Button */}
        <div className="mb-6">
          <button
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-['Poppins',sans-serif]"
            onClick={() => router.push("/admin")}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin Panel
          </button>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 tracking-wide font-['Poppins',sans-serif]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Report Details
            </h2>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Name & Date Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 font-['Poppins',sans-serif] uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm font-['Inter',sans-serif] text-gray-800 placeholder-gray-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 font-['Poppins',sans-serif] uppercase tracking-wide">Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm font-['Inter',sans-serif] text-gray-800" 
                />
              </div>
            </div>

            {/* Items Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 font-['Poppins',sans-serif] tracking-wide">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Items & Quantities
              </h3>
              
              {/* Dynamic rows */}
              {rows.map((row, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                  <select
                    className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 font-semibold font-['Inter',sans-serif]"
                    value={row.itemName || ""}
                    onChange={(e) => handleSelect(index, e.target.value)}
                  >
                    <option value="" disabled className="text-gray-500 font-['Inter',sans-serif]">
                      Select an item
                    </option>
                    {items.map((item) => (
                      <option key={item.itemName} value={item.itemName} className="text-gray-700 font-['Inter',sans-serif]">
                        {item.itemName} - RM{item.price}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={row.quantity || ""}
                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm font-['Inter',sans-serif] text-gray-800 placeholder-gray-500"
                  />

                  <input
                    type="number"
                    placeholder="Amount"
                    value={row.amount || ""}
                    readOnly
                    className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 font-bold cursor-not-allowed font-['Inter',sans-serif]"
                  />
                </div>
              ))}

              {/* Empty state */}
              {rows.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-xl font-bold font-['Poppins',sans-serif] mb-2">No items added yet</p>
                  <p className="text-base font-medium font-['Inter',sans-serif]">Click "Add Item" to start building your report</p>
                </div>
              )}
            </div>

            {/* Total Price Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200/50">
                <label className="block text-sm font-bold text-gray-700 mb-2 font-['Poppins',sans-serif] uppercase tracking-wide">Total Amount</label>
                <div className="flex items-center">
                  <span className="text-3xl font-black text-blue-600 font-['Poppins',sans-serif]">RM</span>
                  <input
                    type="text"
                    className="flex-1 ml-2 text-3xl font-black text-blue-600 bg-transparent border-none outline-none font-['Poppins',sans-serif]"
                    value={totalPrice}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-['Poppins',sans-serif]"
                onClick={handleAddItem}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Item
              </button>
              
              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-['Poppins',sans-serif]"
                onClick={handleRemoveItem}
                disabled={rows.length === 0}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove Item
              </button>
              
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-['Poppins',sans-serif]">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold font-['Inter',sans-serif]">&copy; 2025 Umar Syakir. All Rights Reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
