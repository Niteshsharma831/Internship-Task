const { validationResult } = require("express-validator");
const { AppDataSource } = require("../data-source");
const { hashPassword } = require("../model/User");
const bcrypt = require("bcrypt");
const { signJwt } = require("../utils/jwt");

// Register new user
async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const repo = AppDataSource.getRepository("User");
  const { name, email, password, phone, city, country, role } = req.body;

  try {
    // check if user already exists
    const exists = await repo.findOneBy({ email });
    if (exists)
      return res.status(409).json({ message: "Email already registered" });

    // hash password
    const hashed = await hashPassword(password);

    const user = repo.create({
      name,
      email,
      password: hashed,
      phone,
      city,
      country,
      role: role || "User", // default role
    });

    await repo.save(user);

    res.status(201).json({
      message: "User registered",
      user: { ...user, password: undefined },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Login
async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const repo = AppDataSource.getRepository("User");

  try {
    const user = await repo.findOneBy({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = signJwt({ userId: user.id, role: user.role });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Admin: get all users
async function getAllUsers(req, res) {
  try {
    const repo = AppDataSource.getRepository("User");

    const users = await repo.find({
      select: [
        "id",
        "name",
        "email",
        "phone",
        "city",
        "country",
        "role",
        "createdAt",
        "updatedAt",
      ], // exclude password
    });

    res.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { register, login, getAllUsers };
