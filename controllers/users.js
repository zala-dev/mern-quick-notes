const User = require("../models/");
const { generateToken } = require("../utils/jwt");

async function signup(req, res) {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).json({ error: "Please provide username and password" });
    }

    const user = new User({ name, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    const isPasswordMatch = await user.matchPassword(password);

    if (!user || !isPasswordMatch) {
      res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  signup,
  login,
};
