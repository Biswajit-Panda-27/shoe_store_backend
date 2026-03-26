const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  pimage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  prating: {
    type: Number,
    required: true,
  },
  
  previews: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model("Product", productSchema);
