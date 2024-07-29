const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
