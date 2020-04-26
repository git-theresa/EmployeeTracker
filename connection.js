var mysql = require("mysql");
var util = require("util");
var dotEnv = require("dotenv");

require("dotenv").config();

var connection = mysql.createConnection({
host: "localhost",
port: 3306,
USER_NAME: process.env.USER_NAME,
MY_PASSWORD: process.env.MY_PASSWORD,
});

connection.query= util.promisify(connection.query);

module.exports = connection