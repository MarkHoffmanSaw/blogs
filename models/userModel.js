const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "User",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordConfirm: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isConfirm(value) {
          if (this.password !== value)
            throw new Error("Password must be the same");
        },
      },
    },
  },
  { tableName: "users" }
);

User.addHook("beforeCreate", () => {});

User.prototype.checkPassword = () => {};

User.sync();

module.exports = User;
