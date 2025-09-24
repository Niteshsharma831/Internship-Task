const express = require("express");
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

const router = express.Router();

// 🔑 Auth routes
router.post("/register", register);
router.post("/login", login);

// 👥 User routes
router.get("/", authMiddleware, requireRole("Admin"), listUsers);
router.get("/:id", authMiddleware, getUserDetails);
router.delete("/:id", authMiddleware, requireRole("Admin"), deleteUser);
router.patch("/:id", authMiddleware, requireRole("Admin"), updateUser);

module.exports = router;
