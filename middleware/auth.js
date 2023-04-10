const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if token doen NOT exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // Verify token
  try {
   const decoded =  jwt.verify(token, process.env.JWT_SECRET)
   console.log(decoded)
   req.user = decoded.user
   next()
  } catch (err) {
   res.status(401).json({ msg: 'token is not valid'})
  }
};
