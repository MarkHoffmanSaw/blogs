const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/login").get(viewController.getLoginForm);
router.route("/signup").get(viewController.getSignupForm);

router.route("/blogs").get(authController.protect, viewController.getOverview);

module.exports = router;
