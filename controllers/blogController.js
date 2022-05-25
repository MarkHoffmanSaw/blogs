const { Blog, User } = require("../models");
const handlerFactory = require("./handlerFactory");

// exports.createBlog = handlerFactory.createOne(Blog);
exports.getAllBlogs = handlerFactory.getAll(Blog);
exports.getBlog = handlerFactory.getOne(Blog);
exports.updateBlog = handlerFactory.updateOne(Blog);
exports.deleteBlog = handlerFactory.deleteOne(Blog);

exports.createBlog = async (req, res, next) => {
  const { userUuid, message } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

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
