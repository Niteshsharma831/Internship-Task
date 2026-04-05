const express = require("express");
const protect = require("../middleware/authMiddleware");

const { getSummary } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, getSummary);

module.exports = router;
