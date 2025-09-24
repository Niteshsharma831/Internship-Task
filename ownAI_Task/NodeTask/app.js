const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Test route to check server is running
app.get("/", (req, res) => {
  res.json({ message: "ownAI API Running 🚀" });
});

// Use user routes (includes register, login, get users, get single user)
app.use("/api/users", userRoutes);

module.exports = app;
