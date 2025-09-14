const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Middleware: only USER
function authUser(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1];
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    if (decoded.role !== "USER") return res.status(403).json({ msg: "Not a normal user" });

    req.user = decoded;
    next();
  });
}

// ✅ Get all stores with avg rating + user’s rating
router.get("/stores", authUser, async (req, res) => {
  try {
    const [stores] = await db.query(`
      SELECT s.id, s.name, s.address,
             ROUND(AVG(r.rating),1) as avgRating,
             (SELECT rating FROM ratings WHERE store_id=s.id AND user_id=?) as userRating
      FROM stores s
      LEFT JOIN ratings r ON s.id=r.store_id
      GROUP BY s.id
    `, [req.user.id]);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Submit or update rating
router.post("/rate", authUser, async (req, res) => {
  const { storeId, rating } = req.body;
  try {
    await db.query(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES (?,?,?) ON DUPLICATE KEY UPDATE rating=?",
      [req.user.id, storeId, rating, rating]
    );
    res.json({ msg: "Rating submitted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Change password
router.put("/change-password", authUser, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id=?", [req.user.id]);
    const user = rows[0];
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ msg: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password=? WHERE id=?", [hashed, req.user.id]);
    res.json({ msg: "Password updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
