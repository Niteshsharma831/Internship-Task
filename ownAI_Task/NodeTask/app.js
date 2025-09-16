const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "ownAI Assessment API" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

module.exports = app;
