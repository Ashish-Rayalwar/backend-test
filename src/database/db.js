const sql = require("mysql");
require("dotenv").config();
const password = process.env.PASSWORD;
const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "password12345",
  database: "blog",
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
  }

  console.log("Connected to MySQL database!");
});

module.exports = { db };
