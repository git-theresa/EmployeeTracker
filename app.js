const Db = require("./db/db.js");
const ask = require("inquirer");
const validator = require("validator");
// const consoleTable = require("console.table");

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
    message: "Enter a Department Name you wish to add:",
    name: "department",
  }];
    const addRole = [{
    type: "input",
    message: "Enter the Role you wish to add:",
    name: "title",
    },
    {
    type: "input",
    massage: "Enter the Salary for this Role:",
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
    massage: "Enter the Department ID for this Role:",
    name: "department_id",
    validate: value => {
        if (validator.isInt(value)) {
            return true;
        }
        return "A valid Department ID should be a Number Only";
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
            "View Departments",
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
      .then((res) => {
        const userFunction = res.userFunction;
        
        switch (userFunction) {
          // DEPARTMENTS
          case "Add Department":
            ask.prompt(addDept).then((answer) => {
              db.addDepartment(answer.department)
               .then(function(){
                console.log("Successfully added new department!");
                  //show the departments
                  db.connection.query("SELECT * FROM department", function (
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
           db.connection.query("SELECT * FROM department", function (err, res) {
              if (err) throw err;
              console.log(res);
              res.length > 0 && console.table(res);
              
            });
            break;
            // DELETE DEPARTMENT
            case "Delete Departments":
              db.connection.query("SELECT * FROM  department", function(err, res) {
                      if (err) throw err;
                      res.length > 0 && console.table(res);
                      ask.prompt([
                        {
                        type:"input",
                        message: "Enter the Department ID you want to delete:",
                        name: "deleteDept",
                        }
                      ])
                      .then((answer) =>{
                        db.connection.query(
                          "DELETE FROM department WHERE id=?",
                          [answer.deleteDepartments],
                          function(err,res) {
                            if (err) throw err;
                            db.connection.query("SELECT * FROM department", function (
                              err,
                              res
                            ){
                              if(err) throw err;
                              res.length > 0 && console.table(res);
                              inquireQ();
                            });
                          }
                        );
                      });
                     });
              break;

              // BEGIN ROLES CASE
          case "Add Role":
            ask.prompt(addRole).then((answer) => {
              db.connection.query(
                "INSERT INTO role SET ?",
                {
                  title: answer.title,
                  salary: answer.salary,
                  department_id: answer.department_id,
                },
                function (err) {
                  if (err) throw err;
                  console.log("Successfully added role!");
                  //view the roles
                  db.connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    res.length > 0 && console.table(res);
                    inquireQ();
                  });
                }
              );
            });
            
            break;
            // VIEW ROLES CASE
          case "View Role":
            db.connection.query("SELECT * FROM role", function (err, res) {
              if (err) throw err;
              res.length > 0 && console.table(res);
              inquireQ();
            });
            break;
            //  DELETE ROLES
            case "Delete Role":
              db.connection.query("SELECT * FROM  role", function(err, res) {
                if (err) throw err;
                res.length > 0 && console.table(res);
                ask.prompt([
                  {
                  type:"input",
                  message: "Enter the ROLE you want to delete:",
                  name: "deleteRole",
                  }
                ])
                .then((answer) =>{
                  db.connection.query(
                    "DELETE FROM role WHERE id=?",
                    [answer.deleterole],
                    function(err,res) {
                      if (err) throw err;
                      db.connection.query("SELECT * FROM role", function (
                        err,
                        res
                      ){
                        if(err) throw err;
                        res.length > 0 && console.table(res);
                        inquireQ();
                      });
                    }
                  );
                });
               });
        break;
        // UPDATE ROLE

         case "Update Employee Roles":
            break;
// EMPLOYEE CASE 
           case "View Employees":
            db.connection.query("SELECT * FROM employees", function (err, res) {
              if (err) throw err;
              console.log(res);
              res.length > 0 && console.table(res);
              inquireQ();
            });
            break;
            
            // EMPLOYEE CASE
           case "Add Employees":
            break;
          
         case "Delete Employees":
            break;
            // MANAGER CASE
          

            case "View Manager":
            db.connection.query("SELECT * FROM manager", function (err, res) {
              if (err) throw err;
              console.log(res);
              res.length > 0 && console.table(res);
              inquireQ();
            });
case "Update Employee Managers":
            break;

          case "View Employees by Manager":
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


  