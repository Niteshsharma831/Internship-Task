const express = require("express");
const { listUsers, getUserDetails } = require("../controllers/user.controller");
const {
  authMiddleware,
  requireRole,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, requireRole("Admin"), listUsers);
router.get("/:id", authMiddleware, getUserDetails);

module.exports = router;
