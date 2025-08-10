require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const sessionsRoutes = require("./routes/sessions");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.use("/api", sessionsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
