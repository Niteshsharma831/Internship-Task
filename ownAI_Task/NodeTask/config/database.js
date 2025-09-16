const { Sequelize } = require("sequelize");

const DB_PATH = process.env.DB_PATH || "./db/sqlite.db";
const DB_NAME = process.env.PG_DB || "ownai_db";
const DB_USER = process.env.PG_USER || "postgres";
const DB_PASS = process.env.PG_PASS || "Database";
const DB_HOST = process.env.PG_HOST || "localhost";
const DB_PORT = process.env.PG_PORT || 5432;

let sequelize;

async function initDatabase() {
  try {
    // Try PostgreSQL first
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: "postgres",
      logging: false,
    });

    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");
  } catch (err) {
    console.warn("⚠️ PostgreSQL not available. Falling back to SQLite...");

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: DB_PATH,
      logging: false,
    });

    await sequelize.authenticate();
    console.log("✅ Connected to SQLite at", DB_PATH);
  }

  return sequelize;
}

module.exports = initDatabase;
