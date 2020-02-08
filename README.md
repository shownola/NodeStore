# README
* A full featured e-commerce application
* Build out a Nodejs web server that will serve up html pages
* Create a file based data store to store user data, product data, and cart data

PROJECT SETUP:
* Create new project directory
* Generate a package.json file - npm init -y
* Install any needed dependencies - express and nodemon
* Create 'start' script to run project - npm run dev

FRONT PAGE:
* Show a list of items for purchase to include a title and price
* Show an 'Add to Cart' button
* Show a link to the cart

CART PAGE:
* Show items that have been added
* Show title, quantity, total price
* Ability to remove the item from the cart
* Total price of all items
* Purchase button

ADMIN PANEL:
* Ability to create, edit and delete products
* Admin only has the ability to access this page

CREATE AND EDIT PAGES:
* Product name
* Price
* Ability to upload an image
* Create item button

AUTHENTICATION:
* Create sign up/login page - email, password, password confirmation and sign up button
* Create admin users with authorization
* Setup user vs admin privileges
* User email must be unique
* Use cookie based authentication
* User cookie-session library

IMAGE UPLOAD:
* Use Multer middleware to handle multipart/form-data for uploading images.
