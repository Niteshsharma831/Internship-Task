const { AppDataSource } = require("../data-source");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//  Helper: Send responses in a consistent way
function sendResponse(res, status, message, data = null) {
  const response = { message };
  if (data) response.data = data;
  return res.status(status).json(response);
}

//  REGISTER
async function register(req, res) {
  const { name, email, password, role, phone, city, country } = req.body;

  try {
    const repo = AppDataSource.getRepository(User);

    const existingUser = await repo.findOneBy({ email });
    if (existingUser) return sendResponse(res, 409, "Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = repo.create({
      name,
      email,
      password: hashedPassword,
      role: role || "User",
      phone,
      city,
      country,
    });

    await repo.save(user);

    return sendResponse(res, 201, "User registered successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      country: user.country,
    });
  } catch (err) {
    console.error("Register error:", err);
    return sendResponse(res, 500, "Server error");
  }
}

// LOGIN
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email });

    if (!user) return sendResponse(res, 401, "Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return sendResponse(res, 401, "Invalid credentials");

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET, // 🔒 Only use env secret
      { expiresIn: "1d" }
    );

    return sendResponse(res, 200, "Login successful", {
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
    return sendResponse(res, 500, "Server error");
  }
}

// GET ALL USERS with Search + Filter
async function listUsers(req, res) {
  try {
    const repo = AppDataSource.getRepository(User);
    const { search, country } = req.query;

    let query = repo
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.email",
        "user.role",
        "user.phone",
        "user.city",
        "user.country",
        "user.createdAt",
      ]);

    if (search) {
      query = query.where("user.name LIKE :search OR user.email LIKE :search", {
        search: `%${search}%`,
      });
    }

    if (country) {
      query = search
        ? query.andWhere("user.country = :country", { country })
        : query.where("user.country = :country", { country });
    }

    const users = await query.getMany();
    return res.json(users);
  } catch (err) {
    console.error("List users error:", err);
    return sendResponse(res, 500, "Server error");
  }
}

// GET SINGLE USER
async function getUserDetails(req, res) {
  const { id } = req.params;

  try {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });

    if (!user) return sendResponse(res, 404, "User not found");

    return res.json({
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
    return sendResponse(res, 500, "Server error");
  }
}

// DELETE USER
async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });

    if (!user) return sendResponse(res, 404, "User not found");

    await repo.delete({ id });
    return sendResponse(res, 200, "User deleted successfully");
  } catch (err) {
    console.error("Delete user error:", err);
    return sendResponse(res, 500, "Server error");
  }
}

// UPDATE USER
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, role, phone, city, country, password } = req.body;

  try {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });

    if (!user) return sendResponse(res, 404, "User not found");

    Object.assign(user, { name, email, role, phone, city, country });

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await repo.save(user);

    return sendResponse(res, 200, "User updated successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      country: user.country,
    });
  } catch (err) {
    console.error("Update user error:", err);
    return sendResponse(res, 500, "Server error");
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
