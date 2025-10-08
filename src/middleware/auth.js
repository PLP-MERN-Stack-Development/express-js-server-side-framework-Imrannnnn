const auth = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (apiKey !== 'mysecretkey123') {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  next(); 
};

module.exports = auth;
