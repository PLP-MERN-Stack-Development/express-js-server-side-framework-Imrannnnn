const errorHandler = (err, req, res, next) => {
  console.error(" Error:", err.message);
  res.status(500).json({
    message: "Something went wrong on the server.",
    error: err.message,
  });
};

module.exports = errorHandler;