const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
  itemPrice: { type: String, required: true },

});

export default mongoose.models.item || mongoose.model("item", itemSchema);

