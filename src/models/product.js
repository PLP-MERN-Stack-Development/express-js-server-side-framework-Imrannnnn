const mongoose = require("mongoose");

// define the product schema 
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: String },
  inStock: { type: Boolean, default: true },

}, {timestamps: true});


// create the product model
const Products = mongoose.model("Product", productSchema);
module.exports = Products
