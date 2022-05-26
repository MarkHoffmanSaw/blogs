const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").get(viewController.getSignupForm);
router.route("/login").get(viewController.getLoginForm);

router.route("/").get(authController.protect, viewController.getBlogs);

module.exports = router;
