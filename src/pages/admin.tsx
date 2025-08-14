import { useEffect, useState } from "react";

type Item = {
  _id: string;
  itemName: string;
  itemPrice: number;
};

export default function Admin() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/item"); 
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.error("Error fetching items:", e);
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-4xl mx-auto bg-blue-300 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Item List</h2>

        <table className="table">
          <thead>
            <tr className="bg-base-200 text-white">
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-amber-50 text-black font-bold">
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.itemName}</td>
                  <td>RM{item.itemPrice}</td>
                  <td>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
