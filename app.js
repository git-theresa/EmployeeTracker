const Db = require("./db/db.js");
// const connection = require("./employeeConnection.js")
const ask = require("inquirer");
const validator = require("validator");

const db = new Db ()
// const db = new db (.connection)

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
            // VIEW DEPARTMENT ========================================================================================
          case "View Departments":
           db.connection.query("SELECT * FROM department", function (err, res) {
              if (err) throw err;
              console.log(res);
              res.length > 0 && console.table(res);
              
            });
            break;
            // DELETE DEPARTMENT =========================================================================================
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
                          function(err, res) {
                            if (err) throw err;
                            db.connection.query("SELECT * FROM department", function (
                              err,
                              res
                            )
                            {
                              if(err) throw err;
                              res.length > 0 && console.table(res);
                              inquireQ();
                            });
                          }
                        );
                      });
                     });
              break;
              // UPDATE DEPARTMENT   ==== ====== =====  ======  ======  

              // ======>>===============================>=================>=====================>

              // BEGIN ROLES CASE ===============================================================================================
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
                  db.connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    res.length > 0 && console.table(res);
                    inquireQ();
                  });
                }
              );
            });
            break;
//             // VIEW ROLES CASE ===============================================================================
          case "View Role":
            db.connection.query("SELECT * FROM role", function (err, res) {
              if (err) throw err;
              res.length > 0 && console.table(res);
              inquireQ();ask.prompt(addRole).then((answer) => {
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
                  
                  db.connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    res.length > 0 && console.table(res);
                    inquireQ();
                  });
                }
              );
            });
            
        
            });
            break;

//             //  DELETE ROLES ======================================================================================
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
                    [answer.deleteRole],
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
//         // UPDATE ROLE ================================================================

//          case "Update Roles":
//             break;
// // ====================================================================================
// // EMPLOYEE CASE 
           case "View Employees":
            db.connection.query("SELECT * FROM employees", function (err, res) {
              if (err) throw err;
              console.log(res);
              res.length > 0 && console.table(res);
              inquireQ();
            });
            break;      
   // EMPLOYEE ADD CASE
            case "Add Employee":
          ask.prompt(addEmployee).then((answer) => {
  db.connection.query(
    "INSERT INTO employee SET ?",
    {
      title: answer.title,
      first_name: answer.first_name,
      last_name: answer.last_name,
      role_id: answer.role_id,
      manager_id: answer.manager_id,
    },
    function (err) {
      if (err) throw err;
      console.log("Welcome Your New Employee!");
      db.connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        res.length > 0 && console.table(res);
        inquireQ();
      });
    }
  );
});

break;
// DELETE EMPLOYEE
          case "Delete Employee":
              db.connection.query("SELECT * FROM  employee", function(err, res) {
                      if (err) throw err;
                      res.length > 0 && console.table(res);
                      ask.prompt([
                        {
                        type:"input",
                        message: "Enter the Employee you want to Terminate or Delete:",
                        name: "deleteEmployee",
                        }
                      ])
                      .then((answer) =>{
                        db.connection.query(
                          "DELETE FROM employee WHERE id=?",
                          [answer.deleteEmployee],
                          function(err,res) {
                            if (err) throw err;
                            db.connection.query("SELECT * FROM employee", function (
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
// ==============================>=========================.>============================.>=========================
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
          
            
          
         
//             // END CASES
          case "Finish":
            break;
          default:
            break;

          //END FUNCTIONS ... DO NOT TOUCH CLOSING SYNTAX
        }
      });
}


  