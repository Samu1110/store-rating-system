const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Helper validation function
function validateUser({ name, email, address, password }) {
  if (!name || name.length < 20 || name.length > 60) {
    return "Name must be 20-60 characters long";
  }

  if (address && address.length > 400) {
    return "Address must not exceed 400 characters";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  if (!passwordRegex.test(password)) {
    return "Password must be 8-16 chars, include 1 uppercase & 1 special character";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return null;
}

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, address, password, role } = req.body;

  const validationError = validateUser({ name, email, address, password });
  if (validationError) {
    return res.status(400).json({ msg: validationError });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const [rows] = await db.query(
      "INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)",
      [name, email, hashed, address, role || "USER"]
    );

    res.json({ msg: "User registered", userId: rows.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ msg: "Email already registered" });
    } else {
      res.status(500).json({ msg: err.message });
    }
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (rows.length === 0) return res.status(401).json({ msg: "Invalid email" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secretkey", // 🔐 use process.env.JWT_SECRET in production
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
