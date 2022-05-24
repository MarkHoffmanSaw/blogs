const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const db = require("./db");

db.authenticate().then(() => {
  console.log("Connected to the PostgreSQL cloud");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
