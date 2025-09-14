const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));

const ownerRoutes = require("./routes/ownerRoutes");
app.use("/owner", ownerRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);
