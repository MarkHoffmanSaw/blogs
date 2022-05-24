const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Blog = sequelize.define(
  "Blog",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: "blogs" }
);

Blog.sync();

module.exports = Blog;
