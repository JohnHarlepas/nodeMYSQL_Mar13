
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("The Eagle has landed!");
  makeTable();
});

function makeTable() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    supOptions();
  });
}

function supOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "How can I help?",
        choices: ["Sales by Dept.", "Build New Dept.", "Quit"]
      }
    ])
    .then(function(val) {
      if (val.choice === "Sales by Dept.") {
        rptSales();
      }
      else if (val.choice === "Build New Dept.") {
        bldDept();
      }
      else {
        console.log("See ya!");
        process.exit(0);
      }
    });
}

function bldDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Give me new department's name:100"
      },
      {
        type: "input",
        name: "overhead",
        message: "How much to run the department?",
        validate: function(val) {
          return val > 0;
        }
      }
    ])
    .then(function(val) {
      connection.query(
        "INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)",
        [val.name, val.overhead],
        function(err) {
          if (err) throw err;
          console.log("ADDED DEPARTMENT!");
          makeTable();
        }
      );
    });
}

function rptSales() {
  connection.query(
    "SELECT departProd.department_id, departProd.department_name, departProd.over_head_costs, SUM(departProd.product_sales) as product_sales, (SUM(departProd.product_sales) - departProd.over_head_costs) as total_profit FROM (SELECT departments.department_id, departments.department_name, departments.over_head_costs, IFNULL(products.product_sales, 0) as product_sales FROM products RIGHT JOIN departments ON products.department_name = departments.department_name) as departProd GROUP BY department_id",
    function(err, res) {
      console.table(res);
      supOptions();
    }
  );
}
