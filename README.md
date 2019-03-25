# nodeMYSQL_Mar13
 Amazon-like storefront with the MySQL

 ## Overview

In this project, I created an Amazon-like storefront with MySQL . The app will take in orders from customers and deplete stock from the store's inventory. My app is also capable of tracking product sales across a store's departments and then provide a summary of the highest-grossing departments in the store.

Make sure you save and require the MySQL and Inquirer npm packages in your homework files--your app will need them for data input and storage.


## List of Technologies used

1. MySQL dependency
2. Inquierer dependency 
3. MySQL workbench 
4. iTerm
5. Node.js


### Component #1: Customer View 

1. Create a MySQL Database called `bamazon`.

2. Then I created a Table inside of that database called `products`.

3. The products table have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. I populated the database with around 10 different products. 

5. Then I created a Node application called `bamazonCustomer.js`. Running this application displays all of the items available for sale. I I included the ids, names, and prices of products for sale.

6. The app  then prompt users with two messages.

   * The first asks user the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

7. Once the user has placed the order, the application checks to see if your store has enough of the product to meet the customer's request.

   * If not, the app logs a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if the store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

- - -


### Component #2: Manager View

* I created a new Node application called `bamazonManager.js`. Running this application does this:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, the app lists all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, the app allwos the manager to add a completely new product to the store.


- - -

### Component #3: Supervisor View 

1. I created a new MySQL table called `departments`. My table include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. I modified the products table so that there's a product_sales column, and I modified my `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * I made sure the app still updates the inventory listed in the `products` column.

3. I created another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app displays a summarized table in their terminal/bash window. The table below is an example.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column was  calculated on the fly using the difference between `over_head_costs` and `product_sales`. The `total_profit` was not stored in any database. 


- - -


### How I created a README.md file

References

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)


