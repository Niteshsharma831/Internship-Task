const { Sequelize } = require("sequelize");

// PostgreSQL connection settings from environment variables or defaults
const DB_NAME = process.env.PG_DB || "ownai_db";
const DB_USER = process.env.PG_USER || "postgres";
const DB_PASS = process.env.PG_PASS || "Database";
const DB_HOST = process.env.PG_HOST || "localhost";
const DB_PORT = process.env.PG_PORT || 5432;

// Create Sequelize instance for PostgreSQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false, // disable SQL query logging
});

// Initialize and test connection
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL successfully");
  } catch (err) {
    console.error("PostgreSQL connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = { sequelize, initDatabase };
