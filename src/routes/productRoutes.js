const express = require("express");
const router = express.Router();
const Products = require("../models/product");
const { NotFoundError, ValidationError } = require("../customErrors");


//  Get all products (with optional category filter + pagination)
router.get("/", async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category ? { category } : {};

    const skip = (page - 1) * limit;
    const total = await Products.countDocuments(filter);
    const products = await Products.find(filter)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    next(error);
  }
});

//  Get product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) throw new NotFoundError("Product not found");
    res.json(product);
  } catch (err) {
    next(err); // Pass to global error handler
  }
});

//  Create new product
router.post("/", async (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  try {
    const nextId = await getNextProductId(); // auto-generate next numeric id

    const newProduct = new Products({
      id: nextId,
      name,
      description,
      price,
      category,
      inStock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  Update product by ID
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, category, inStock } = req.body;

  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { name, description, price, category, inStock },
      { new: true }
    );

    if (!updatedProduct) throw new NotFoundError("Product not found");
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

//  Delete product by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deletedProduct) throw new NotFoundError("Product not found");
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});

//  Search products by name
router.get("/search/by-name", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Please provide a search term" });

    const products = await Products.find({
      name: { $regex: name, $options: "i" },
    });

    if (products.length === 0)
      throw new NotFoundError("No matching products found");

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Product statistics - count by category
router.get("/stats/by-category", async (req, res, next) => {
  try {
    const stats = await Products.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      message: "Product count by category",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

// to auto increment product ID
async function getNextProductId() {
  const lastProduct = await Products.findOne().sort({ id: -1 });
  return lastProduct ? lastProduct.id + 1 : 1;
}


module.exports = router;
