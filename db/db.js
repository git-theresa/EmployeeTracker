const employeeConnection = require("../connection.js");

// make connections with Class:

class db {
  constructor() {
    this.connection = employeeConnection;
  }
  getDepartment() {
  return this.connection.query("SELECT * FROM department");
        // make sure Departments is selecting from single department
  }
  addDepartment(deptName){
    return this.connection.query("INSERT INTO department SET ?",
    {
      name: deptName,
    })
    // string literal to pass in Value
 
}

}

module.exports = db;