const { DataSource } = require("typeorm");
const User = require("./model/User");

// Create TypeORM DataSource instance for PostgreSQL
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT || "5432"),
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PASS || "Database",
  database: process.env.PG_DB || "ownai", // Ensure this database exists
  synchronize: true, // Auto-create tables (disable in production)
  logging: false, // Disable query logging
  entities: [User], // Add all your entities here
});

module.exports = { AppDataSource };
