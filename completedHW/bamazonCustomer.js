
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
  inTable();
});


function inTable() {

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;


    console.table(res);


    queryCustItem(res);
  });
}


function queryCustItem(inventory) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "selection",
        message: "We got some great products. Just type the product's item id and you will be on your way to buying the item. [Type Bye to leave our shop]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "bye";
        }
      }
    ])
    .then(function(val) {

      askToLeave(val.selection);
      var selectionId = parseInt(val.selection);
      var product = queryInvent(selectionId, inventory);


      if (product) {

        custSelectNumber(product);
      }
      else {

        console.log("\nThis is Black Friday. You were to slow!!!");
        inTable();
      }
    });
}


function custSelectNumber(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: " Give us the number of products you want to buy. [Type Bye to leave our shop]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "bye";
        }
      }
    ])
    .then(function(val) {

      askToLeave(val.quantity);
      var quantity = parseInt(val.quantity);


      if (quantity > product.stock_quantity) {
        console.log("\nGet more product, now!");
        inTable();
      }
      else {

        prodQuantity(product, quantity);
      }
    });
}


function prodQuantity(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? WHERE item_id = ?",
    [quantity, product.price * quantity, product.item_id],
    function(err, res) {

      console.log("\nDamn, you are fast. You earned " + quantity + " " + product.product_name + "'s!");
      inTable();
    }
  );
}


function queryInvent(selectionId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === selectionId) {

      return inventory[i];
    }
  }

  return null;
}

function askToLeave(selection) {
  if (selection.toLowerCase() === "bye") {

    console.log("See you later!");
    process.exit(0);
  }
}
