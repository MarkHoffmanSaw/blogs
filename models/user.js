"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Blog }) {
      // this.hasMany(Blog, { foreignKey: "userId", as: "blogs" });
    }
    // Hide the rows
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        passwordConfirm: undefined,
      };
    }
  }
  User.init(
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
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );

  // Password encryption
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
  });

  // Login password check
  User.prototype.correctPassword = async (candidatePassword, password) => {
    return await bcrypt.compare(candidatePassword, password);
  };

  return User;
};
