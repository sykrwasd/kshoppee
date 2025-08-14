import { connectToDatabase } from "../../../lib/mongoose";
import Item from "../../../models/item";

export default async function handler(req, res) {
  if (req.method !== "DELETE")
    return res.status(405).json({ error: "Method not allowed" });

  await connectToDatabase();
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: "Missing id" });

  const deleted = await Item.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Item not found" });

  res.status(200).json({ message: "Item deleted" });
}
