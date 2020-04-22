const Db = require("./db/db.js");

const db = new Db ()
// const db = new db (.connection)
console.log(db.getDepartments)
db.connection.connect(function(err) {
    if (err) throw err;
    
    console.log("connected as id " + db.connection.threadId);
    afterConnection();
  });


//   function createProduct() {
//       console.log("Inserting a new product...\n");
//       var query = connection.query(
//         "INSERT INTO products SET ?",
//         {
//           department: "Rocky Road",
//           roles: "",
//           employees: 
//         }
//         const readFileAsync = util.promisify(fs.readFile);
//         function(err, res) {
//           if (err) throw err;
//           console.log(res.affectedRows + " product inserted!\n");
//           // Call updateProduct AFTER the INSERT completes
//           updateProduct();
//         }
//       );
    
//       // logs the actual query being run
//       console.log(query.sql);
//     }
  function afterConnection() {
      db.getDepartments().then((res) =>{
console.table(res)

      });
      
    }
  