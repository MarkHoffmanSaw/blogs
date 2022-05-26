const { Blog, User } = require("../models");

exports.getBlogs = async (req, res, next) => {
  const blogs = await Blog.findAll({ include: "user" });

  res.status(200).render("_blogs", {
    title: "Blogs page",
    blogs,
  });
};

exports.getLoginForm = async (req, res, next) => {
  res.status(200).render("_login", {
    title: "Login",
  });
};

exports.getSignupForm = async (req, res, next) => {
  res.status(200).render("_signup", {
    title: "Signup",
  });
};
