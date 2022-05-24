// CRUD operations

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const docs = await Model.findAll({ order: [["createdAt", "DESC"]] });

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

exports.createOne = (Model) => async (req, res, next) => {
  try {
    const newDoc = await Model.create(req.body); // .build + .save

    return res.json({
      status: "success",
      data: {
        newDoc,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

exports.getOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findOne({ where: { uuid: req.params.id } });

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

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.update(req.body, {
      where: { uuid: req.params.id },
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

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.destroy({
      where: { uuid: req.params.id },
    });

    res.status(204).json({
      status: "sucess",
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

