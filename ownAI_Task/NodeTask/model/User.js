const { EntitySchema } = require("typeorm");
const bcrypt = require("bcrypt");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    phone: {
      type: "varchar",
      nullable: true,
    },
    city: {
      type: "varchar",
      nullable: true,
      default: "Unknown", // ✅ default value if not provided
    },
    country: {
      type: "varchar",
      nullable: true,
      default: "Unknown", // ✅ default value if not provided
    },

    role: {
      type: "varchar",
      default: "Staff",
    },
    createdAt: {
      type: "timestamp", // ✅ Use timestamp instead of datetime
      createDate: true,
    },
    updatedAt: {
      type: "timestamp", // ✅ Use timestamp instead of datetime
      updateDate: true,
    },
  },
  relations: {},
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

module.exports = { User, hashPassword };
