const route = require("express").Router();

const ProductController = require('../../controllers/api/ProductController');

route.get("/", ProductController.index); 
// route.get("/create", MemberController.create); 
// route.get("/edit/:id", MemberController.edit); 

route.post("/create", ProductController.add);
route.post("/update/:id", ProductController.update);
route.get("/delete/:id", ProductController.destroy);

module.exports = route;

