import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";

type Item = {
  _id: string;
  itemName: string;
  itemPrice: number;
};

export default function Admin() {
  const [items, setItems] = useState<Item[]>([]);
  const [name,setName] = useState("");
  const [price, setPrice] = useState("")
  const [editId, setEditId] = useState<string>("");


  
  useEffect(() => {
    fetchItems();
  }, []);
  
  async function fetchItems() {
    try {
      const res = await fetch("/api/getitem");
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error("Error fetching items:", e);
    }
  }

  const handleAddItem = async () => {

    try{
      
      const response = await fetch("/api/additem", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price
        }),
      });

      const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to add item");
      return;
    }

    Swal.fire({
  title: "Item Added Successfully!",
  icon: "success"
});
    setName("");
    setPrice("");

    // 🔄 Refresh list from server
    fetchItems();

    } catch (e){
      console.error(e)
    }
  }

  const handleDeleteItem = async (id:any) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/deleteitem?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Failed to delete");

      fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateItem = async (id : any) => {
    if (!name || !price) return alert("Name and price are required");

    try {
      const res = await fetch(`/api/updateitem?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Failed to update");

      setEditId("");
      setName("");
      setPrice("");
      fetchItems();
    } catch (e) {
      console.error(e);
    }
  };


 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-['Inter',system-ui,sans-serif]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-xl font-medium tracking-wide">
            Manage your inventory items with ease
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 tracking-wide">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Item Management
            </h2>
            <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-700 hover:bg-green-600 text-white text-lg font-semibold rounded-lg transition-all duration-200"
              onClick={() => (document.getElementById("addModal") as HTMLDialogElement).showModal()}>
              + Add Item
            </button>
          </div>

          {/* Table Container */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider font-['Poppins',sans-serif]">
                      #
                    </th>
                    <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider font-['Poppins',sans-serif]">
                      Item Name
                    </th>
                    <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider font-['Poppins',sans-serif]">
                      Price
                    </th>
                    <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider font-['Poppins',sans-serif]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-blue-50/50 transition-colors duration-200"
                      >
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-black rounded-full font-['Poppins',sans-serif]">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                            <span className="font-semibold text-gray-900 text-lg font-['Inter',sans-serif]">
                              {item.itemName}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 font-['Poppins',sans-serif]">
                            RM{item.itemPrice}
                          </span>
                        </td>
                        <td className="py-4 px-4 flex gap-2">
                          <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-['Inter',sans-serif]"
                          onClick={() => {
                      setEditId(item._id);
                      setName(item.itemName);
                      setPrice(item.itemPrice.toString());
                      (
                        document.getElementById(
                          "editModal"
                        ) as HTMLDialogElement
                      ).showModal();
                    }}>
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-['Inter',sans-serif]"
                            onClick={() => handleDeleteItem(item._id)}
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-16 h-16 text-gray-300 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                          <p className="text-gray-500 text-xl font-semibold font-['Inter',sans-serif]">
                            No items found
                          </p>
                          <p className="text-gray-400 text-base font-medium font-['Inter',sans-serif]">
                            Start by adding some items to your inventory
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

       <dialog id="addModal" className="modal">
  <div className="modal-box bg-white">
    <h3 className="font-bold text-lg text-black">Add Item</h3>

    {/* Form Content */}
    <div className="mt-4">
      <label className="block text-sm font-bold text-gray-700 font-['Poppins',sans-serif] uppercase tracking-wide mb-2">
        Item Name
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm font-['Inter',sans-serif] text-gray-800 placeholder-gray-500"
        placeholder="Item Name"
         onChange={(e) => setName(e.target.value)}
      />

      <label className="mt-6 block text-sm font-bold text-gray-700 font-['Poppins',sans-serif] uppercase tracking-wide mb-2">
        Item Price
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm font-['Inter',sans-serif] text-gray-800 placeholder-gray-500"
        placeholder="Item Price"
       onChange={(e) => setPrice(e.target.value)}
      />
      

    </div>

    <div className="modal-action">
      <form method="dialog" className="flex gap-3">
        <button 
        className="btn btn-primary rounded-lg"
        onClick={handleAddItem}
        >Save</button>
        <button className="btn rounded-lg">Close</button>
      </form>
    </div>
  </div>
</dialog>

 <dialog id="editModal" className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-black">Edit Item</h3>
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm font-['Inter',sans-serif] text-gray-800 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Item Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
             className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm font-['Inter',sans-serif] text-gray-800 placeholder-gray-500"
          />
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => handleUpdateItem(editId)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>
              <button className="btn ml-2 px-4 py-2 rounded-lg border">Close</button>
            </form>
          </div>
        </div>
      </dialog>


    </div>

    
  );
}
