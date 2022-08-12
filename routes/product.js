const route = require("express").Router();

const ProductController = require('../controllers/web/ProductController');

route.get("/", ProductController.index); 
route.get("/create", ProductController.create); 
route.get("/edit/:id", ProductController.edit); 

route.post("/create", ProductController.add);
route.post("/update/:id", ProductController.update);
route.get("/delete/:id", ProductController.destroy);


module.exports = route;

