require("dotenv").config();
require("reflect-metadata");
const { Client } = require("pg");
const { AppDataSource } = require("./data-source");
const app = require("./app");

const PORT = process.env.PORT || 4000;
const DB_NAME = process.env.PG_DB || "ownAI";

async function startServer() {
  // Connect to default 'postgres' database
  const client = new Client({
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASS || "Database",
    database: "postgres",
  });

  await client.connect();

  // Check if database exists
  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`
  );

  // Create database if not exists
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`Database "${DB_NAME}" created`);
  }

  await client.end();

  // Connect TypeORM to our database
  await AppDataSource.initialize();
  console.log("Database connected");

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Run the server
startServer().catch((err) => console.error(err));
