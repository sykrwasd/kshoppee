import { connectToDatabase } from "../../../lib/mongoose.js";
import Items from "../../../models/item.js";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const items = await Items.find().sort({itemName : 1});
      res.status(200).json(items); // Send the data back to the client
      console.log(items)
    } catch (err) {
      console.error("Error fetching items:", err);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
