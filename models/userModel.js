const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcryptjs");

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

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
  user.passwordConfirm = "";
});

User.prototype.correctPassword = async (candidatePassword, password) => {
  return await bcrypt.compare(candidatePassword, password);
};

User.sync();

module.exports = User;
