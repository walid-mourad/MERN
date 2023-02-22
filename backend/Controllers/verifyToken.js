const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../config/config.env' });

module.exports = (req, res, next) => {
  // check if token is present in headers
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    // decode the token
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};
