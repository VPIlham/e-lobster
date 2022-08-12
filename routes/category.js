const route = require("express").Router();

const CategoryController = require('../controllers/web/CategoryController');

route.get("/", CategoryController.index); 
route.get("/create", CategoryController.create); 
route.get("/edit/:id", CategoryController.edit); 

route.post("/create", CategoryController.add);
route.post("/update/:id", CategoryController.update);
route.get("/delete/:id", CategoryController.destroy);

module.exports = route;