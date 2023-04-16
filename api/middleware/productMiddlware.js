const jwt = require('jsonwebtoken')


//verify user
const verifyUser =async(req, res, next) => {
  const token =req?.cookies?.access_token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'no cookies found, you are not authorized' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded
    next()
  } catch (error) {
    return res.status(400).json({ error: 'invalid token' });
  };


}

//verify supplier
const verifySupplier = (req, res, next) => {
  console.log(req.body,'from verify')
  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json({ error: 'no cookies found , you are not authorized' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT)
    if (decoded.supplier) {
      req.user = decoded
      next()
    }
    else return res.status(401).json({ error: 'you are not a supplier' })

  } catch (error) {
    return res.status(400).json({ error: "invalid token" });
  }
}


//verify supplier
const verifySupplierDelete = (req, res, next) => {
  var token = req.cookies.access_token
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'no token , you are not authorized' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT)
    if (decoded.supplier) {
      req.user = decoded
      next()
    }

  } catch (error) {
    return res.status(400).json({ error: 'invalid token' });
  }
}


//verify Admin
const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ error: "you are not an admin" });
    }
  } catch (error) {
    return res.status(400).json({ error: 'invalid token' });
  };
}
module.exports = { verifyAdmin, verifyUser, verifySupplier, verifySupplierDelete }
// module.exports={verifyToken}