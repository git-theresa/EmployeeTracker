const employeeConnection = require("./employeeConnection");

// make connections with Class:

class db {
  constructor() {
    this.connection = employeeConnection;
  }
  getDepartments() {
  return this.connection.query("SELECT * FROM department");
        // make sure Departments is selecting from single department
  }
  addDepartments(deptName){
    return this.connection.query("SELECT * FROM department");
    // string literal to pass in Value
  }

  
}

module.exports = db;
