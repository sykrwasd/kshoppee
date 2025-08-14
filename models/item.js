const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
  itemPrice: { type: String, required: true },

});

module.exports = mongoose.model('item', itemSchema);


