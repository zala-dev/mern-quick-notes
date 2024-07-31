const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  // console.log("Middleware is running....");
  const token = req.header("Authorization")?.split(" ")[1];
  // console.log("TOKEN: from middleware", token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Decode the token and extract the user ID
    const decoded = jwt.verify(token, process.env.SECRET);
    // console.log("DECODED: ", decoded);

    // Ensure the ID exists in the decoded token
    if (!decoded.user._id) {
      throw new Error("Invalid token structure");
    }

    // Retrieve the user based on the ID in the token
    req.user = await User.findById(decoded.user._id).select("-password");
    // console.log("User found in middleware: ", req.user);

    if (!req.user) {
      throw new Error("User not found");
    }

    next();
  } catch (err) {
    // console.error("Middleware error: ", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};
