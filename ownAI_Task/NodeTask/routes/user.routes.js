// routes/user.routes.js
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  listUsers,
  getUserDetails,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

const {
  authMiddleware,
  requireRole,
} = require("../middleware/auth.middleware");

// Register a new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Get single user details
router.get("/:id", authMiddleware, getUserDetails);

// List all users (Admin only)
router.get("/", authMiddleware, requireRole("Admin"), listUsers);

// Update user (Admin only)
router.patch("/:id", authMiddleware, requireRole("Admin"), updateUser);

// Delete user (Admin only)
router.delete("/:id", authMiddleware, requireRole("Admin"), deleteUser);

module.exports = router;
