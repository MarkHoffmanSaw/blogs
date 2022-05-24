const express = require("express");
const { route } = require("../app");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);

module.exports = router;