const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Fetch out token from Req. Header
  const token = req.header("x-auth-token");

  // Checking if token is NOT available.
  if (!token) {
    return res.status(401).json({ msg: "Access Denied! No token!" });
  }

  try {
    // If token is there, proceed
    const tokenVerified = jwt.verify(token, process.env.jwtSecret);

    req.user = tokenVerified.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token!" });
  }
};
