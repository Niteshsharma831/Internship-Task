const { AppDataSource } = require("../data-source"); // TypeORM datasource
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User"); // Make sure User entity is exported

// -------------------- REGISTER --------------------
async function register(req, res) {
  const { name, email, password, role, phone, city, country } = req.body;

  try {
    const repo = AppDataSource.getRepository(User);

    // Check if email already exists
    const existingUser = await repo.findOneBy({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = repo.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Staff",
      phone,
      city,
      country,
    });

    await repo.save(user);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- LOGIN --------------------
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const repo = AppDataSource.getRepository(User);

    // Check if user exists
    const user = await repo.findOneBy({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- GET ALL USERS --------------------
async function listUsers(req, res) {
  try {
    const repo = AppDataSource.getRepository(User);
    const users = await repo.find({
      select: [
        "id",
        "name",
        "email",
        "role",
        "phone",
        "city",
        "country",
        "createdAt",
      ],
    });
    res.json(users);
  } catch (err) {
    console.error("List users error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- GET SINGLE USER --------------------
async function getUserDetails(req, res) {
  const { id } = req.params;

  try {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      country: user.country,
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- DELETE USER --------------------
async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });

    if (!user) return res.status(404).json({ message: "User not found" });

    await repo.delete({ id });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- UPDATE USER --------------------
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, role, phone, city, country, password } = req.body;

  try {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (country) user.country = country;

    // If password provided, hash it
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await repo.save(user);

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  register,
  login,
  listUsers,
  getUserDetails,
  deleteUser,
  updateUser,
};
