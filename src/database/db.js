const sql = require("mysql");
require("dotenv").config();
const password = process.env.PASSWORD;
const host = process.env.HOST;
const root = process.env.ROOT;
const dbName = process.env.DBNAME;
// const db = sql.createConnection({
//   host: host,
//   database: dbName,
//   user: root,
//   password: password,
// });

let db = sql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
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
