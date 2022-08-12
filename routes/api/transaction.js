const route = require("express").Router();

const TransactionController = require('../../controllers/api/TransactionController');

route.get("/", TransactionController.index); 
route.post("/create", TransactionController.add); 

module.exports = route;

