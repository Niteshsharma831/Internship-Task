const { Client } = require("pg");

// Ensure that the database exists, create if it doesn't
async function ensureDatabaseExists() {
  const dbName = process.env.PG_DB || "ownAI"; // Use env variable or default

  const client = new Client({
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASS || "Database",
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || 5432,
    database: "postgres", // Connect to default DB to check/create
  });

  try {
    await client.connect();

    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created`);
    } else {
      console.log(`ℹ️ Database "${dbName}" already exists`);
    }
  } catch (err) {
    console.error("❌ Error ensuring database exists:", err.message);
    throw err;
  } finally {
    await client.end();
  }
}

module.exports = { ensureDatabaseExists };
