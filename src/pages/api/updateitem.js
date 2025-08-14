import { connectToDatabase } from "../../../lib/mongoose";
import Item from "../../../models/item";

export default async function handler(req, res) {
  if (req.method !== "PUT")
    return res.status(405).json({ error: "Method not allowed" });

  await connectToDatabase();
  const { id } = req.query;
  const { name, price } = req.body;

  if (!id || !name || !price)
    return res.status(400).json({ error: "Missing fields" });

  const updated = await Item.findByIdAndUpdate(
    id,
    { itemName: name, itemPrice: Number(price) },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Item not found" });

  res.status(200).json(updated);
}
