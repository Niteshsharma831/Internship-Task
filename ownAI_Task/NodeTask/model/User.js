// model/User.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    name: { type: "varchar" },
    email: { type: "varchar", unique: true },
    password: { type: "varchar" },
    role: { type: "varchar", default: "Staff" },
    phone: { type: "varchar", nullable: true },
    city: { type: "varchar", nullable: true },
    country: { type: "varchar", nullable: true },
    createdAt: { type: "timestamp", createDate: true },
  },
});
