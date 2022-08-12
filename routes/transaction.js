const route = require("express").Router();

const TransactionController = require('../controllers/web/TransactionController');

route.get("/", TransactionController.index); 
route.get("/create", TransactionController.create); 
route.get("/edit/:id", TransactionController.edit); 

route.post("/create", TransactionController.add);
route.post("/update/:id", TransactionController.update);
route.get("/delete/:id", TransactionController.destroy);

module.exports = route;

