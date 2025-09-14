const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Middleware: allow only ADMIN
function authAdmin(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1];
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    if (decoded.role !== "ADMIN") return res.status(403).json({ msg: "Forbidden" });

    req.user = decoded;
    next();
  });
}

// ✅ Dashboard stats
router.get("/stats", authAdmin, async (req, res) => {
  try {
    const [users] = await db.query("SELECT COUNT(*) AS total FROM users");
    const [stores] = await db.query("SELECT COUNT(*) AS total FROM stores");
    const [ratings] = await db.query("SELECT COUNT(*) AS total FROM ratings");
    res.json({ users: users[0].total, stores: stores[0].total, ratings: ratings[0].total });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Add User
router.post("/add-user", authAdmin, async (req, res) => {
  const { name, email, address, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)",
      [name, email, hashed, address, role]
    );
    res.json({ msg: "User added successfully", userId: result.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ msg: "Email already registered" });
    } else {
      res.status(500).json({ msg: err.message });
    }
  }
});

// ✅ Get store owners for dropdown
router.get("/store-owners", authAdmin, async (req, res) => {
  try {
    const [owners] = await db.query("SELECT id, name, email FROM users WHERE role='STORE_OWNER'");
    res.json(owners);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Add Store
router.post("/add-store", authAdmin, async (req, res) => {
  const { name, email, address, ownerId, ownerName, ownerEmail, ownerPassword, mode } = req.body;

  try {
    let finalOwnerId = ownerId;

    if (mode === "NEW") {
      const hashed = await bcrypt.hash(ownerPassword, 10);
      const [ownerResult] = await db.query(
        "INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)",
        [ownerName, ownerEmail, hashed, address, "STORE_OWNER"]
      );
      finalOwnerId = ownerResult.insertId;
    }

    if (!finalOwnerId) {
      return res.status(400).json({ msg: "Owner is required" });
    }

    const [result] = await db.query(
      "INSERT INTO stores (name,address,owner_id) VALUES (?,?,?)",
      [name, address, finalOwnerId]
    );

    res.json({ msg: "Store added successfully", storeId: result.insertId, ownerId: finalOwnerId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ msg: "Store email already registered" });
    } else {
      res.status(500).json({ msg: err.message });
    }
  }
});


router.get("/owners", authAdmin, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email FROM users WHERE role='STORE_OWNER'");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ Get all users with filters (excluding store owners)
// router.get("/users", authAdmin, async (req, res) => {
//   const { name = "", email = "", address = "", role = "" } = req.query;

//   try {
//     const [users] = await db.query(
//       `SELECT id, name, email, address, role 
//        FROM users
//        WHERE role IN ('ADMIN','USER')  -- exclude store owners
//          AND name LIKE ? 
//          AND email LIKE ? 
//          AND address LIKE ? 
//          AND (? = '' OR role = ?)`,
//       [
//         `%${name}%`,
//         `%${email}%`,
//         `%${address}%`,
//         role,
//         role
//       ]
//     );
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });
// ✅ Get all users with filters + sorting (excluding store owners)
router.get("/users", authAdmin, async (req, res) => {
  const { name = "", email = "", address = "", role = "", sortBy = "name", order = "asc" } = req.query;

  // ✅ Whitelist allowed sort fields
  const allowedSort = ["name", "email", "address", "role"];
  const sortField = allowedSort.includes(sortBy) ? sortBy : "name";
  const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

  try {
    const [users] = await db.query(
      `SELECT id, name, email, address, role 
       FROM users
       WHERE role IN ('ADMIN','USER')
         AND name LIKE ? 
         AND email LIKE ? 
         AND address LIKE ? 
         AND (? = '' OR role = ?)
       ORDER BY ${sortField} ${sortOrder}`,
      [`%${name}%`, `%${email}%`, `%${address}%`, role, role]
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});





// ✅ Get all stores + avg rating
// ✅ Get all stores with filters
// router.get("/stores", authAdmin, async (req, res) => {
//   const { name = "", email = "", address = "" } = req.query;
//   try {
//     const [stores] = await db.query(
//       `SELECT s.id, s.name, s.email, s.address,
//               ROUND(AVG(r.rating),1) as rating
//        FROM stores s
//        LEFT JOIN ratings r ON s.id = r.store_id
//        WHERE s.name LIKE ? 
//          AND s.email LIKE ? 
//          AND s.address LIKE ?
//        GROUP BY s.id`,
//       [`%${name}%`, `%${email}%`, `%${address}%`]
//     );
//     res.json(stores);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });


// // ✅ Get details of all users (with rating if Store Owner)
// router.get("/user-details", authAdmin, async (req, res) => {
//   try {
//     const [users] = await db.query(`
//       SELECT u.id, u.name, u.email, u.address, u.role,
//              CASE 
//                WHEN u.role = 'STORE_OWNER' THEN (
//                  SELECT ROUND(AVG(r.rating),1)
//                  FROM ratings r
//                  JOIN stores s ON r.store_id = s.id
//                  WHERE s.owner_id = u.id
//                )
//                ELSE NULL
//              END as avgRating
//       FROM users u
//     `);
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// Get all stores with filters + sorting
router.get("/stores", authAdmin, async (req, res) => {
  const { name = "", email = "", address = "", sortBy = "name", order = "asc" } = req.query;

  const allowedSort = ["name", "email", "address", "rating"];
  const sortField = allowedSort.includes(sortBy) ? sortBy : "name";
  const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

  try {
    const [stores] = await db.query(
      `SELECT s.id, s.name, s.address,
              u.email AS email,
              ROUND(AVG(r.rating),1) as rating
       FROM stores s
       JOIN users u ON s.owner_id = u.id
       LEFT JOIN ratings r ON s.id = r.store_id
       WHERE s.name LIKE ?
         AND u.email LIKE ?
         AND s.address LIKE ?
       GROUP BY s.id
       ORDER BY ${sortField === "email" ? "u.email" : sortField} ${sortOrder}`,
      [`%${name}%`, `%${email}%`, `%${address}%`]
    );
    res.json(stores);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// Get details of all users (with rating if Store Owner) + sorting
router.get("/user-details", authAdmin, async (req, res) => {
  const { sortBy = "name", order = "asc" } = req.query;

  const allowedSort = ["name", "email", "address", "role", "avgRating"];
  const sortField = allowedSort.includes(sortBy) ? sortBy : "name";
  const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

  try {
    const [users] = await db.query(`
      SELECT u.id, u.name, u.email, u.address, u.role,
             CASE 
               WHEN u.role = 'STORE_OWNER' THEN (
                 SELECT ROUND(AVG(r.rating),1)
                 FROM ratings r
                 JOIN stores s ON r.store_id = s.id
                 WHERE s.owner_id = u.id
               )
               ELSE NULL
             END as avgRating
      FROM users u
      ORDER BY ${sortField} ${sortOrder}
    `);
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;
