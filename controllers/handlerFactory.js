exports.getAll = (Model, includeOptions) => async (req, res, next) => {
  try {
    const docs = await Model.findAll({
      order: [["createdAt", "DESC"]],
      include: includeOptions,
    });

    return res.json({
      status: "success",
      results: docs.length,
      data: {
        docs,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
