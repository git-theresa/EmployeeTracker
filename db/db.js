const employeeConnection = require("../connection.js");

// make connections with Class:

class db {
  constructor() {
    this.connection = employeeConnection;
  }
  getDepartment() {
  return this.connection.query("SELECT * FROM department");
  }
  addDepartment(deptName){
  return this.connection.query("INSERT INTO department SET ?",
    {
      name: deptName,
    })
    // string literal to pass in Value
  }
  getRole() {
      return this.connection.query("SELECT * FROM role");
  }
  addRole () {
      return this.connection.query("INSERT INTO role SET ?",
      {
          name: addRole,
      })
  }
  getEmployee(){
      return this.connection.query("SELECT * FROM employee");
  }
  addEmployee(){
      return this.connection.query("INSERT INTO employee SET ?",
      {
          name: addEmployee,
      })
  }

}

module.exports = db;