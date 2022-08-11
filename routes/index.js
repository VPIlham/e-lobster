const route = require('express').Router();

route.get("/", (req, res) => {
  res.render("index.ejs");
});

const category = require('./category');
const member = require('./member');
const product = require('./product');
const transaction = require('./transaction');

const categoryApi = require('./api/category');
const memberApi = require('./api/member');
const productApi = require('./api/product');
const transactionApi = require('./api/transaction');

// API
route.use('/api/categories', categoryApi);
route.use('/api/members', memberApi);
route.use('/api/products', productApi);
route.use('/api/transactions', transactionApi);

//WEB
route.use('/categories', category);
route.use('/members', member);
route.use('/products', product);
route.use('/transactions', transaction);

module.exports = route;