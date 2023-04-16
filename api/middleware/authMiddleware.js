const jwt = require('jsonwebtoken')
const User = require('../schemas/userSchema')


//verify user
const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'no cookies found, you are not authorized' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    console.log(decoded)
      req.user = decoded;
      next();
  } catch (error) {
    return res.status(400).json({ error: 'invalid token' });
  };


}
const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ error: 'you are not and admin' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'invalid token' });
  };
}
module.exports = { verifyAdmin, verifyUser }
// module.exports={verifyToken}