// REQUIRED FOLDER PATHS
const Db = require("./db/db.js");
const connection = require("./connection.js")
// REQUIRED INSTALL PACKAGES
const ask = require("inquirer");
const CFonts = require("cfonts");
const validator = require("validator");

// CONSTRUCTOR PATH
const db = new Db();

// CONNECT DATABASE 
db.connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + db.connection.threadId + "\n");
  inquireQ();
});

// ========== ADD TO: DEPT * ROLE * EMPLOYEE  =================
const addDept = [
  {
    type: "input",
    message: "Enter a DEPARTMENT NAME you wish to add:",
    name: "department",
  },
];

const addRole = [
  {
    type: "input",
    message: "Enter the ROLE TITLE you wish to add:",
    name: "title",
  },
  {
    type: "input",
    massage: "Enter the SALARY for this Role:",
    name: "salary",
     },
  {
    type: "input",
    massage: "Enter the DEPARTMENT ID for this Role:",
    name: "department_id",
  },
];

const addEmployee = [
  {
    type: "input",
    message: "Enter the FIRST NAME of employee",
    name: "first_name",
  },
  {
    type: "input",
    message: "Enter the LAST NAME of the employee",
    name: "last_name",
  },
  {
    type: "input",
    message: "Enter the ROLE ID for the employee",
    name: "role_id",
  },
  {
    type: "input",
    message: "Enter the Manager ID for the employee",
    name: "manager_id",
  },
];

// =========== INQUIRER PROMPTS FOR COMMAND LINE =================
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
          "Delete Employee",
          "Finish",
        ],
        name: "userFunction",
      },
    ]) 
     // ==================BEGIN ANSWERS TO PROMPTS ==============================
    .then((res) => {
      const userFunction = res.userFunction;
          switch (userFunction) {
        // ===============* DEPARTMENTS *=========================
case "View Departments":
          db.connection.query("SELECT * FROM department", (err, res) => {
            if (err) throw err;
            console.log(res);
            res.length > 0 && console.table(res);
            
        inquireQ()
          });
         
          break;
 // ======================ADD * DEPARTMENT ==========================
        case "Add Department":
          ask.prompt(addDept).then((answer) => {
            db.addDepartment(answer.department).then(function () {
              console.log("Successfully added new department!");
              db.connection.query("SELECT * FROM department",  (err, res) => {
                if (err) throw err;
                res.length > 0 && console.table(res);
                inquireQ();
              });
            });
          });
          break;
         //===================== DELETE * DEPARTMENT =========================
        case "Delete Department":
          db.connection.query("SELECT * FROM  department", (err, res) => {
            if (err) throw err;
            res.length > 0 && console.table(res);
            ask
              .prompt({
                type: "input",
                message: "Enter the Department ID you want to delete:",
                name: "deleteDept",
              })
              .then((answer) => {
                db.connection.query(
                  "DELETE FROM department WHERE id=?",
                  [answer.deleteDept],
                  (err, res) => {
                    if (err) throw err;
                    db.connection.query("SELECT * FROM department",  (err, res) => {
                      if (err) throw err;
                      res.length > 0 && console.table(res);
                      inquireQ();
                    });
                  }
                );
              });
          });
          break;
        // ======END  *DEPARTMENTS* =====================

        // =================* BEGIN ROLES CASE *=================
         case "View Role":
          db.connection.query("SELECT * FROM role", (err, res) => {
            if (err) throw err;
            res.length > 0 && console.table(res);
           
           
                    if (err) throw err;
                    res.length > 0 && console.table(res);
                    inquireQ();
                  });
          break; 
          // >================== ADD * ROLES * CASE ====================================        
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
                db.connection.query("SELECT * FROM role", (err, res) => {
                  if (err) throw err;
                  res.length > 0 && console.table(res);
                  inquireQ();
                });
              }
            );
          });
          break;
         // ================== DELETE * ROLES * CASE============================
        case "Delete Role":
          db.connection.query("SELECT * FROM  role", (err, res) => {
            if (err) throw err;
            res.length > 0 && console.table(res);
            ask
              .prompt([
                {
                  type: "input",
                  message: "Enter the ROLE ID you want to delete:",
                  name: "deleteRole",
                },
              ])
              .then((answer) => {
                db.connection.query(
                  "DELETE FROM role WHERE id=?",
                  [answer.deleteRole],
                  (err, res) => {
                    if (err) throw err;
                    db.connection.query("SELECT * FROM role", (err, res) => {
                      if (err) throw err;
                      res.length > 0 && console.table(res);
                      inquireQ();
                    });
                  }
                );
              });
          });
          break;
        // ====================UPDATE * ROLE * CASE =============================
        case "Updated Employee Roles":
          db.connection.query("SELECT * FROM employees", (err, res) => {
            if (err) throw err;
            res.length > 0 && console.table(res);
            ask
              .prompt([
                {
                  type: "input",
                  message: "Please enter the EMPLOYEE'S ID you wish to update:",
                  name: "updateID",
                  validate: (value) => {
                    if (validator.isInt(value)) {
                      return true;
                    }
                    return "Please enter valid employee id (#)";
                  },
                },
                {
                  type: "input",
                  message: "Please enter EMPLOYEE'S new ROLE ID:",
                  name: "updateRoleID",
                },
              ])
              .then((answer) => {
                connection.query(
                  "UPDATE employees SET ? WHERE ?",
                  [
                    {
                      role_id: answer.updateRoleID,
                    },
                    {
                      id: answer.updateID,
                    },
                  ],
                  (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    console.log("Employee has been updated!");
                    inquireQ();
                  }
                );
              });
          });
          break;

        // // =================END * ROLES =====================

        // ==================BEGIN * EMPLOYEE * CASE =============
        case "View Employee":
          db.connection.query("SELECT * FROM employee", (err, res) => {
            if (err) throw err;
            console.log(res);
            res.length > 0 && console.table(res);
            inquireQ();
          });
          break;
        // =============== * ADD * EMPLOYEE * CASE===================
        case "Add Employee":
          ask.prompt(addEmployee).then((answer) => {
            db.connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
              },
              function (err) {
                if (err) throw err;
                console.log("Welcome Your New Employee!");
                db.connection.query("SELECT * FROM employee", (err, res) => {
                  if (err) throw err;
                  res.length > 0 && console.table(res);
                  inquireQ();
                });
              }
            );
          });
          break;

        // ====================DELETE *  EMPLOYEE * CASE ======================
        case "Delete Employee":
          db.connection.query("SELECT * FROM  employee", (err, res) => {
            if (err) throw err;
            res.length > 0 && console.table(res);
            ask
              .prompt([
                {
                  type: "input",
                  message:
                    "Enter the EMPLOYEE ID you want to Terminate or Delete:",
                  name: "deleteEmployee",
                },
              ])
              .then((answer) => {
                db.connection.query(
                  "DELETE FROM employee WHERE id=?",
                  [answer.deleteEmployee],
                  (err, res) => {
                    if (err) throw err;
                    db.connection.query("SELECT * FROM employee", (err, res) => {
                      if (err) throw err;
                      res.length > 0 && console.table(res);
                      inquireQ();
                    });
                  }
                );
              });
          });
          break;
        // ==============================END * EMPLOYEE * CASE ========================

        // ===================BEGIN * MANAGER * CASE =========================
        case "View Manager":
          db.connection.query("SELECT * FROM manager", (err, res) => {
            if (err) throw err;
            console.log(res);
            res.length > 0 && console.table(res);
            inquireQ();
          });
        case "Update Employee Managers":
          break;
 // ==================
        // case "View Employee by Manager":
        //   db.connection.query("SELECT employee.first_name employee.last_name employee.manager_id *  FROM employee  JOIN manager ON  employee.manager_id = manager_id", function (err, res)
        //    {
        //   if (err) throw err;
        //   res.length > 0 && console.table(res);      
        //         ask.prompt([
        //           {
        //           type:"input",
        //           message: "Enter the MANAGER ID you wish to view",
        //           name: "viewByManager",
        //           }
        //         ])
        //         .then((answer) =>{
        //           db.connection.query("SELECT employee.first_name employee.last_name employee.manager_id * FROM employee  JOIN manager ON  employee.manager_id= manager_id", function (err, res)
        //           {
        //             [answer.viewByManager],
        //             function(err,res) {
        //               if (err) throw err;
        //               db.connection.query("SELECT employee.first_name employee.last_name employee.manager_id * FROM employee   JOIN manager ON  employee.manager_id = manager_id", function (err, res) {
        //                 if(err) throw err;
        //                 res.length > 0 && console.table(res);
        //                 inquireQ();
        //               });
        //             }
        //           }
        //           );
        //         });
        //        });
     
        // break;

        // ========= END * ALL * CASES  (FINISH) ====================
        case "Finish":
          connection.end();
          break;
        default:
          break;

        //END FUNCTIONS ... DO NOT TOUCH CLOSING SYNTAX
      }
    });
};
CFonts.say("Employee - Tracker", {
  font: "block",
  align: "center",
  colors: ["candy", "candy", "candy"],
  background: "transparent",
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: "0",
  gradient: true,
  independentGradient: false,
  transitionGradient: false,
  env: "node",
});