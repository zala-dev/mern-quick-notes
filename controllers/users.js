const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = await createJWT(user);
    res.json(token);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Invalid email or password");
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json("Invalid email or password");
    }
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}
module.exports = {
  create,
  login,
};
