const route = require('express').Router();

route.get("/", (req, res) => {
  res.render("index.ejs");
});

const category = require('./category');
const member = require('./member');
const product = require('./product');
const transaction = require('./transaction');

route.use('/categories', category);
route.use('/members', member);
route.use('/products', product);
route.use('/transactions', transaction);

module.exports = route;