const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // change this
  database: "roxiler_task1"
});

module.exports = db;
