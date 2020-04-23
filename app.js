const Db = require("./db/db.js");
const ask = require("inquirer");
const validator = require("validator");

const db = new Db ()
// const db = new db (.connection)
// console.log(db.getDepartments)
db.connection.connect(function(err) {
    if (err) throw err;
    
    console.log("connected as id " + db.connection.threadId +"\n");
   inquireQ();
  });

  const addDept = [{
    type: "input",
    message: "Please enter the department type you wish to add:",
    name: "department",
    validate: value => {
        if (validator.isAlpha(value)) {
            return true;
        }
        return "Please enter a valid department (a-z)";
    }
}];
const addRole = [{
    type: "input",
    message: "Please enter the role you wish to add:",
    name: "title",
    validate: value => {
        if (validator.isAlpha(value)) {
            return true;
        }
        return "Please enter valid role (a-z)";
    }
},
{
    type: "input",
    massage: "Please enter the salary for this role:",
    name: "salary",
    validate: value => {
        if (validator.isInt(value)) {
            return true;
        }
        return "Please enter a valid salary ex:(30000)";
    }
},
{
    type: "input",
    massage: "Please enter the department ID for this role:",
    name: "department_id",
    validate: value => {
        if (validator.isInt(value)) {
            return true;
        }
        return "Please enter a valid department ID (number)";
    }
}];
// INQUIRER FUNCTIONS
const inquireQ = () => {
    ask
      .prompt([
                {
          type: "list",
          message: "What would you like to do?",
          choices: [
            "Add Department",
            "View Department",
            "Delete Department",
            "Add Role",
            "View Role",
            "Delete Role",
            "Add Employee",
            "View Employee",
            "View Employee by Manager",
            "Update Employee Roles",
            "Update Employee Managers",
            "Delete Employees",
            "Finish",
          ],
          name: "userFunction",
        },
      ])
      //   function afterConnection() {
      //       db.getDepartments().then((res) =>{
      // console.table(res)
      //       });         
      //     }
      .then((res) => {
        const userFunction = res.userFunction;

        //switch case for all options
        switch (userFunction) {
          case "Add Department":
            ask.prompt(addDept).then((answer) => {
              connection.query(
                "INSERT INTO departments SET ?",
                {
                  name: answer.department,
                },
                function (err) {
                  if (err) throw err;
                  console.log("Successfully added new department!");
                  //show the departments
                  connection.query("SELECT * FROM departments", function (
                    err,
                    res
                  ) {
                    if (err) throw err;
                    res.length > 0 && console.table(res);
                    inquireQ();
                  });
                }
              );
            });
            break;
            // VIEW DEPARTMENT
          case "View Departments":
            connection.query("SELECT * FROM departments", function (err, res) {
              if (err) throw err;
              console.log(res);
              res.length > 0 && console.table(res);
              inquireQ();
            });
            break;
            // BEGIN ROLES CASE
          case "Add Roles":
            ask.prompt(addRole).then((answer) => {
              connection.query(
                "INSERT INTO roles SET ?",
                {
                  title: answer.title,
                  salary: answer.salary,
                  department_id: answer.department_id,
                },
                function (err) {
                  if (err) throw err;
                  console.log("Successfully added role!");
                  //view the roles
                  connection.query("SELECT * FROM roles", function (err, res) {
                    if (err) throw err;
                    res.length > 0 && console.table(res);
                    inquireQ();
                  });
                }
              );
            });
            break;
            // VIEW ROLES CASE
          case "View Roles":
            connection.query("SELECT * FROM roles", function (err, res) {
              if (err) throw err;
              res.length > 0 && console.table(res);
              inquireQ();
            });
            break;
          case "Add Employees":
            break;
          case "View Employees":
            connection.query("SELECT * FROM employees", function (err, res) {
              if (err) throw err;
              console.log(res);
              res.length > 0 && console.table(res);
              inquireQ();
            });
            break;
            // EMPLOYEE CASE
          
          case "Update Employee Roles":
            break;

            // MANAGER CASE
          case "Update Employee Managers":
            break;
          case "View Employees by Manager":
            case "View Manager":
            connection.query("SELECT * FROM manager", function (err, res) {
              if (err) throw err;
              console.log(res);
              res.length > 0 && console.table(res);
              inquireQ();
            });
            break;
            break;
            // DEPARTMENT CASE
          case "Delete Departments":
            break;
          case "Delete Roles":
            break;
          case "Delete Employees":
            break;
            // END CASES
          case "Finish":
            break;
          default:
            break;
          //END FUNCTIONS ... DO NOT TOUCH CLOSING SYNTAX
        }
      });
}


  