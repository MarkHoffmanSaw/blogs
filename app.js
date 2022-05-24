const express = require("express");

const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

module.exports = app;
