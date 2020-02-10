const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();


// Receive a POST request to add item to cart
router.post('/cart/products', async (req, res) => {
  // is there a cart? If not, create one and store the cartId on the req.session.cartId property. If there is cart, get from repository
  let cart;
  if(!req.session.cartId){
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  console.log(cart);
  res.send('Product added to cart');
});

// Receive a GET request to show all items in cart

// Receive at POST request to delete an item from cart

module.exports = router;
