const { Blog, User } = require("../models");
const handlerFactory = require("./handlerFactory");

exports.getAllBlogs = handlerFactory.getAll(Blog, "user");

exports.getBlog = async (req, res, next) => {
  try {
    const doc = await Blog.findOne({
      where: { uuid: req.params.id },
      include: "user", // ["user", "..."] or "user"
    });

    return res.json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

// Create a blog with an user association
exports.createBlog = async (req, res, next) => {
  const { message } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: req.user.uuid } });
    const blog = await Blog.create({ message, userId: user.id }); // .build + .save

    return res.json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { uuid: req.user.uuid } });
    const blog = await Blog.update(req.body, {
      where: { uuid: req.params.id, userId: user.id },
    });

    if (!blog) throw new Error("You cannot edit the message");

    return res.json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { uuid: req.user.uuid } });
    const blog = await Blog.destroy({
      where: { uuid: req.params.id, userId: user.id },
    });

    if (!blog) return next(new Error("You cannot delete the message"));

    res.status(204).json({
      status: "sucess",
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong..." });
  }
};
