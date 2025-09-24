const { EntitySchema } = require("typeorm");
const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    role: {
      type: "varchar",
      default: "User",
    },
    phone: {
      type: "varchar",
      nullable: true,
    },
    city: {
      type: "varchar",
      nullable: true,
    },
    country: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});

module.exports = User;
