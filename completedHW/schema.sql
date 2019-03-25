DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dyson Upright Vacuum", "Home Appliances", 299.99, 50),
  ("Mainstays 4 Piece Pation Set, Red", "Furniture", 195.87, 20),
  ("Bowflex Adjustable Dumbbells", "Exercise", 299.00, 40),
  ("Shakespeare Ugly Stik Casting Fishing Rod", "Fishing", 22.415, 500),
  ("1/2 cctw Black Diamond Earrings", "Jewelery", 77.99, 350),
  ("Muk Luks", "Shoes", 20.99, 100),
  ("Athletic Works Toddler Girl's Athletic Shoe", "Shoes", 15.00, 25),
  ("Poopsie Slime Surprise Unicorn", "Toys", 42.13, 547),
  ("KidKraft Uptown Natural Woden Play Kitchen", "Toys", 151.99, 22),
  ("LeapFrog My Pal Scout", "Toys", 19.88, 213);

  CREATE TABLE departments(
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  primary key(department_id)
);

SELECT * FROM departments;

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home Appliances", 100),
  ("Furniture", 134),
  ("Exercise", 22),
  ("Fishing", 7),
  ("Toys", 33),
  ("Jewelery", 20),
  ("Shoes", 55);


