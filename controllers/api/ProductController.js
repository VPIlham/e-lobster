const { products, categories } = require("../../models");


class ProductController {
  static async index(req, res) {
    try {
      
      let data = await products.findAll({
        order: [["id", "ASC"]],
        include : [categories]
      });

      if (data.length == 0) {
        throw {
          message: "Data tidak tersedia",
        };
      }
      
      return res.json(data);
      //   return res.render("products/index.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async create(req, res) {
    try {
      res.render("products/create.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async edit(req, res) {
    try {
      const id = Number(req.params.id);
      let data;

      await products
        .findByPk(id)
        .then((results) => {
          data = results.dataValues;
        })
        .catch((err) => console.log(err));

      return res.render("products/edit.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async destroy(req, res) {
    try {
      const id = Number(req.params.id);

      let data = await products.destroy({
        where: {
          id: id,
        },
      });

      res.json(data);
      //   return res.redirect("/products");
    } catch (error) {
      res.json(error);
    }
  }

  static async add(req, res) {
    try {
      const { categoryId, name, image, stock, price } = req.body;

      let data = await products.create({
        categoryId,
        name,
        image,
        stock,
        price,
      });

      return res.json(data);
      //   return res.redirect("/products");
    } catch (error) {
      res.json(error);
    }
  }

  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { name, address, city, gender, email } = req.body;

      await products
        .update(
          {
            name,
            address,
            city,
            gender,
            email,
            updateAt: Date.now(),
          },
          { where: { id } }
        )
        .then((result) => {
          //   console.log(result);
          return res.json(result);
          //   return res.redirect("/products");
        })
        .catch((err) => res.json(err));
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = ProductController;
