const { AppDataSource } = require("../data-source");

// List users with search, filter, pagination
async function listUsers(req, res) {
  try {
    const repo = AppDataSource.getRepository("User");
    const { search, country, page = 1, limit = 20 } = req.query;

    let qb = repo.createQueryBuilder("user");

    if (search) {
      qb = qb.andWhere("(user.name LIKE :q OR user.email LIKE :q)", {
        q: `%${search}%`,
      });
    }
    if (country) {
      qb = qb.andWhere("user.country = :country", { country });
    }

    const [users, total] = await qb
      .orderBy("user.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    res.json({
      data: users.map((u) => ({ ...u, password: undefined })),
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    console.error("List users error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get single user details
async function getUserDetails(req, res) {
  try {
    const { id } = req.params;
    const repo = AppDataSource.getRepository("User");

    const user = await repo.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only Admin can view others
    if (req.user.role !== "Admin" && req.user.userId !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json({ user: { ...user, password: undefined } });
  } catch (err) {
    console.error("Get user details error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { listUsers, getUserDetails };
