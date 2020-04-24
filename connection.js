var mysql = require("mysql");
var util = require("util");
var dotEnv = require("dotenv");

require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  

 user: process.env.USER_NAME,
 password: process.env.MY_PASSWORD,
  // Your password
  password: "password",
  database: "employee_DB"
});

connection.query= util.promisify(connection.query);

module.exports = connection