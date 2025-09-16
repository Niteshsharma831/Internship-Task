const { DataSource } = require("typeorm");
const { User } = require("./model/User");
require("dotenv").config();

let AppDataSource;

if (process.env.PG_HOST) {
  // Try PostgreSQL
  AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || "5432"),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    synchronize: true, // auto create tables (good for dev)
    logging: false,
    entities: [User],
  });
} else {
  // Fallback → SQLite
  AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: process.env.DB_PATH || "./db/sqlite.db",
    synchronize: true,
    logging: false,
    entities: [User],
  });
}

module.exports = { AppDataSource };
