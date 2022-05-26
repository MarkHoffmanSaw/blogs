const { User } = require("../models");
const handlerFactory = require("./handlerFactory");

exports.getAllUsers = handlerFactory.getAll(User, "blogs");
