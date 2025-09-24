require("dotenv").config();
require("reflect-metadata");

const { Client } = require("pg");
const { AppDataSource } = require("./data-source");
const app = require("./app");

const PORT = process.env.PORT || 4000;
const DB_NAME = process.env.PG_DB || "ownAI";

// Ensure the PostgreSQL database exists. Create if it doesn't.

async function ensureDatabaseExists() {
  const client = new Client({
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASS || "Database",
    database: "postgres", // Connect to default DB to check/create
  });

  try {
    await client.connect();

    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname=$1",
      [DB_NAME]
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database "${DB_NAME}" created`);
    } else {
      console.log(`Database "${DB_NAME}" already exists`);
    }
  } catch (err) {
    console.error("Error ensuring database exists:", err.message);
    throw err;
  } finally {
    await client.end();
  }
}

async function startServer() {
  try {
    await ensureDatabaseExists();

    // Initialize TypeORM connection
    await AppDataSource.initialize();
    console.log("Database connected");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1); // Stop process if something fails
  }
}

// Run the server
startServer();
