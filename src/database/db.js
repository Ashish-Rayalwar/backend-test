const sql = require("mysql");
require("dotenv").config();
const password = process.env.PASSWORD;
const host = process.env.HOST;
const root = process.env.ROOT;
const dbName = process.env.DBNAME;
const db = sql.createConnection({
  host: host,
  user: root,
  password: password,
  database: dbName,
});
// const db = sql.createConnection({
//   host: host,
//   user: "root",
//   password: "password12345",
//   database: "blog",
// });

db.connect((err) => {
  if (err) {
    console.log(err.message);
  }

  console.log("Connected to MySQL database!");
});

module.exports = { db };
