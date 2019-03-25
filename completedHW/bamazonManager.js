
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
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  showManList();
});


function showManList() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    showManOpt(res);
  });
}

function showManOpt(products) {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      choices: ["Inventory", "Resupply", "Buy More", "Expand Inventory", "Exit"],
      message: "How can ManageRobot serve you today?"
    })
    .then(function(val) {
      switch (val.choice) {
      case "Inventory":
        console.table(products);
        showManList();
        break;
      case "Resupply":
        showDepletedInv();
        break;
      case "Buy More":
        incInv(products);
        break;
      case "Expand Inventory":
        creatNewItem(products);
        break;
      default:
        console.log("Exit!");
        process.exit(0);
        break;
      }
    });
}


function showDepletedInv() {

  connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
    if (err) throw err;

    console.table(res);
    showManList();
  });
}

function incInv(inventory) {
  console.table(inventory);
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like add to?",
        validate: function(val) {
          return !isNaN(val);
        }
      }
    ])
    .then(function(val) {
      var choiceId = parseInt(val.choice);
      var product = queryInvent(choiceId, inventory);


      if (product) {

        queryQuantity(product);
      }
      else {

        console.log("\nDamn, we are out.");
        showManList();
      }
    });
}


function queryQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to add?",
        validate: function(val) {
          return val > 0;
        }
      }
    ])
    .then(function(val) {
      var quantity = parseInt(val.quantity);
      incSupply(product, quantity);
    });
}


function incSupply(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
    [product.stock_quantity + quantity, product.item_id],
    function(err, res) {

      console.log("\nSuccessfully added " + quantity + " " + product.product_name + "'s!\n");
      showManList();
    }
  );
}


function creatNewItem() {
  getDepartments(function(err, departments) {
    pullInfoItem(departments).then(placeNewProd);
  });
}


function pullInfoItem(departments) {
  return inquirer.prompt([
    {
      type: "input",
      name: "product_name",
      message: "Name of the product."
    },
    {
      type: "list",
      name: "department_name",
      choices: fetchDeptNames(departments),
      message: "Department."
    },
    {
      type: "input",
      name: "price",
      message: "Cost",
      validate: function(val) {
        return val > 0;
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "Inventory Supply",
      validate: function(val) {
        return !isNaN(val);
      }
    }
  ]);
}


function placeNewProd(val) {
  connection.query(
    "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
    [val.product_name, val.department_name, val.price, val.quantity],
    function(err, res) {
      if (err) throw err;

      showManList();
    }
  );
}


function getDepartments(cb) {
  connection.query("SELECT * FROM departments", cb);
}

function fetchDeptNames(departments) {
  return departments.map(function(department) {
    return department.department_name;
  });
}

function queryInvent(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {

      return inventory[i];
    }
  }

  return null;
}
