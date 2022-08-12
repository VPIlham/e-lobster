const route = require("express").Router();

const MemberController = require('../controllers/web/MemberController');

route.get("/", MemberController.index); 
route.get("/create", MemberController.create); 
route.get("/edit/:id", MemberController.edit); 

route.post("/create", MemberController.add);
route.post("/update/:id", MemberController.update);
route.get("/delete/:id", MemberController.destroy);

module.exports = route;
