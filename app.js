const express = require("express");
const morgan = require("morgan");
const path = require("path");

const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(morgan("dev"));

app.use("/", viewRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

module.exports = app;
