const { verifyToken } = require("../src/utils/jwt");
const User = require("../models/user");

async function ensureAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Token is not valid" });
  }

  req.user = await User.findById(decoded.id);
  next();
}

module.exports = {
  ensureAuthenticated,
};
