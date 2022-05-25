const { User } = require("../models");
const handlerFactory = require("./handlerFactory");

exports.getAllUsers = handlerFactory.getAll(User);
// exports.getBlog = handlerFactory.getOne(Blog);
// exports.updateBlog = handlerFactory.updateOne(Blog);
// exports.deleteBlog = handlerFactory.deleteOne(Blog);
