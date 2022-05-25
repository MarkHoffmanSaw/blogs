const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const { sequelize } = require("./models");

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
  sequelize.authenticate().then(() => {
    console.log("Connected to the PostgreSQL cloud");
  });
});
