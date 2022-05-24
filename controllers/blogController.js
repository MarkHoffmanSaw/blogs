const Blog = require("../models/blogModel");
const handlerFactory = require("./handlerFactory");

exports.createBlog = handlerFactory.createOne(Blog);
exports.getAllBlogs = handlerFactory.getAll(Blog);
exports.getBlog = handlerFactory.getOne(Blog);
exports.updateBlog = handlerFactory.updateOne(Blog);
exports.deleteBlog = handlerFactory.deleteOne(Blog);
