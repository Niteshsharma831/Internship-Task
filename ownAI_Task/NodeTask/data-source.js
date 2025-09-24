// data-source.js
const { DataSource } = require("typeorm");
const User = require("./model/User");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT || "5432"),
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PASS || "Database",
  database: process.env.PG_DB || "ownai", // make sure DB exists
  synchronize: true, // auto-create tables
  logging: false,
  entities: [User], // <-- include entity here!
});

module.exports = { AppDataSource };
