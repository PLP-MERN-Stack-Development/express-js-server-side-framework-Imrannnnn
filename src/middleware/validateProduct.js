const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price == null || !category) {
    return res.status(400).json({ message: "All fields (name, description, price, category) are required" });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }

  if (typeof inStock !== "boolean") {
    return res.status(400).json({ message: "inStock must be true or false" });
  }

  next(); 
};

module.exports = validateProduct;