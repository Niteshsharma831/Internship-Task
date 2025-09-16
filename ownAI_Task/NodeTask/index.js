require("dotenv").config();
require("reflect-metadata");
const app = require("./app");
const { AppDataSource } = require("./data-source");
const { ensureDatabaseExists } = require("./utils/ensureDatabase");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // Auto-create DB if Postgres is configured
    if (process.env.PG_HOST) {
      await ensureDatabaseExists();
    }

    await AppDataSource.initialize();
    console.log("✅ Database connected");

    // --- Default Admin ---
    const repo = AppDataSource.getRepository("User");
    const admin = await repo.findOneBy({ role: "Admin" });
    if (!admin) {
      const { hashPassword } = require("./model/User");
      const hashed = await hashPassword("Admin@123");
      const newAdmin = repo.create({
        name: "Admin User",
        email: "admin@ownai.local",
        password: hashed,
        role: "Admin",
      });
      await repo.save(newAdmin);
      console.log(
        "👤 Default admin created -> email: admin@ownai.local, pass: Admin@123"
      );
    }

    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error initializing DB", err);
  }
})();
