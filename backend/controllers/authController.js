const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user instance
    const newUser = new User({
      name,
      email,
      password, // Plain text password
    });

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database
    user = await newUser.save();

    res.json(user); // Return saved user details
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // User matched, create JWT payload
      const payload = { id: user.id, name: user.name };

      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: "Bearer " + token, // Return token as Bearer token
          });
        }
      );
    } else {
      return res.status(400).json({ message: "Password incorrect" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
