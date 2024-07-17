// middleware/auth.js
const jwt = require('jsonwebtoken');

const secretKey = 'ABCD';

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, "ABCD");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = {verifyToken};