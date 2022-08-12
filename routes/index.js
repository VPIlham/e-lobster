const { products, categories } = require("../models");
const route = require("express").Router();

route.get("/", async (req, res) => {
  try {
    let data = await products.findAll({
      order: [["id", "ASC"]],
      include: [categories],
    });

    // res.json(data);
    res.render("index.ejs", { result: data });
  } catch (error) {
    res.json(error);
  }
});

const category = require("./category");
const member = require("./member");
const product = require("./product");
const transaction = require("./transaction");

const categoryApi = require("./api/category");
const memberApi = require("./api/member");
const productApi = require("./api/product");
const transactionApi = require("./api/transaction");

// API
route.use("/api/categories", categoryApi);
route.use("/api/members", memberApi);
route.use("/api/products", productApi);
route.use("/api/transactions", transactionApi);

//WEB
route.use("/categories", category);
route.use("/members", member);
route.use("/products", product);
route.use("/transactions", transaction);

module.exports = route;
