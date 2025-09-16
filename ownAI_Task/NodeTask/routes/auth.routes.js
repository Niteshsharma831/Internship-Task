const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").isIn(["Admin", "Staff"]),
  ],
  register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  login
);

module.exports = router;
