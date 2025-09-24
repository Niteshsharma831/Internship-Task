const express = require("express");
const userRoutes = require("./routes/user.routes");
const app = express();
app.use(express.json());

// check server status
app.get("/", (req, res) => {
  res.json({ message: "ownAI API Running 🚀" });
});

// User-related routes
app.use("/api/users", userRoutes);

module.exports = app;
