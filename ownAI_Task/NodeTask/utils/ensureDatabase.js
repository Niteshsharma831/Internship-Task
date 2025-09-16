const { Client } = require("pg");

async function ensureDatabaseExists() {
  const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5432,
    database: "postgres", // connect to default DB
  });

  await client.connect();

  const dbName = "ownAI"; // fixed DB name

  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [dbName]
  );

  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`✅ Database "${dbName}" created`);
  } else {
    console.log(`ℹ️ Database "${dbName}" already exists`);
  }

  await client.end();
}

module.exports = { ensureDatabaseExists };
