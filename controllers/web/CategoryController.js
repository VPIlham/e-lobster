const { categories } = require("../../models");
class CategoryController {
  static async index(req, res) {
    try {
      let data = await categories.findAll({
        order: [["id", "ASC"]],
      });
      // return res.json(data);
        return res.render("categories/index.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async create(req, res) {
    try {
      res.render("categories/create.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async edit(req, res) {
    try {
      const id = Number(req.params.id);
      let data;

      await categories
        .findByPk(id)
        .then((results) => {
          data = results.dataValues;
        })
        .catch((err) => console.log(err));

      return res.render("categories/edit.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async destroy(req, res) {
    try {
      const id = Number(req.params.id);
      
      let data = await categories.destroy({
        where: {
          id: id,
        },
      });

      // res.json(data);
      return res.redirect("/categories");
    } catch (error) {
      res.json(error);
    }
  }

  static async add(req, res) {
    try {
      const { name } = req.body;

      let data = await categories.create({
        name,
      });

      // return res.json(data);
        return res.redirect("/categories");
    } catch (error) {
      res.json(error);
    }
  }

  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;

      await categories
        .update(
          {
            name,
          },
          { where: { id } }
        )
        .then((result) => {
          //   console.log(result);
          // return res.json(result);
          return res.redirect("/categories");
        })
        .catch((err) => res.json(err));
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = CategoryController;
