const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products')
const cartShowTemplate = require('../views/carts/show')

const router = express.Router();

// receive post request to add item to cart
router.post('/cart/products', async (req, res) => {
  //figure out cart
  let cart;
  if (!req.session.cartId) {
    // we need to create a cart and store it on the cart id property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // get the cart from the repository.
    cart = await cartsRepo.getOne(req.session.cartId)
  }

  const existingItem = cart.items.find(item => item.id === req.body.productId);

  if (existingItem) {
    //increment quantity and save cart
    existingItem.quantity++;
  } else {
    //add new product to cart.
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, { items: cart.items });
  //Either increment quantity for existing product
  // or add new product to items array

  res.redirect('/cart');
});

// receive get request to show all items in cart
router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/')
  }
  const cart = await cartsRepo.getOne(req.session.cartId);

  for(let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

// receive a post request to delete an item in the cart.
router.post('/cart/products/delete', async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);
  const item = cart.items.find(item => item.id === itemId);
  if (item.quantity > 1){
    item.quantity--;
    await cartsRepo.update(cart.id, { items: cart.items });
  } else {
    let items;
    items = cart.items.filter(item => item.id !== itemId);
    await cartsRepo.update(req.session.cartId, { items });
  }
  
  res.redirect('/cart');
});


module.exports = router;