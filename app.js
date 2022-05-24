const express = require("express");
const morgan = require("morgan");

const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

module.exports = app;
