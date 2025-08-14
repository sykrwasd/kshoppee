import { connectToDatabase } from "../../../lib/mongoose.js";
import Item from "../../../models/item.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const { name, price } = req.body;
    console.log(name,price)

    if (!name || !price) {
      return res.status(400).json({ error: "Item name and price are required" });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json;
    }

    const newItem = new Item({
      itemName: name,
      itemPrice: Number(price),
    });

    await newItem.save();

    return res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    console.error("Error adding item:", err);
    return res.status(500).json({ error: "Failed to add item" });
  }
}
