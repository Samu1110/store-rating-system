const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware to check owner
function authOwner(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ msg: "No token" });
  const token = header.split(" ")[1];

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    if (decoded.role !== "STORE_OWNER")
      return res.status(403).json({ msg: "Not store owner" });

    req.user = decoded;
    next();
  });
}

// Dashboard API
router.get("/dashboard", authOwner, async (req, res) => {
  try {
    // Find store owned by this user
    const [storeRows] = await db.query("SELECT id FROM stores WHERE owner_id=?", [req.user.id]);
    if (storeRows.length === 0) return res.json({ ratings: [], avgRating: null });

    const storeId = storeRows[0].id;

    // Get ratings + user info
    const [ratings] = await db.query(
      `SELECT r.id, r.rating, u.name, u.email 
       FROM ratings r 
       JOIN users u ON r.user_id=u.id 
       WHERE r.store_id=?`,
      [storeId]
    );

    // Average rating
    const [avg] = await db.query(
      "SELECT AVG(rating) as avgRating FROM ratings WHERE store_id=?",
      [storeId]
    );

    res.json({ ratings, avgRating: avg[0].avgRating });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Change Password API
router.put("/change-password", authOwner, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id=?", [req.user.id]);
    const user = rows[0];

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ msg: "Old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password=? WHERE id=?", [hashed, req.user.id]);

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
