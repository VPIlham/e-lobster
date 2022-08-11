const { members } = require("../../models");

class MemberController {

  static async index(req, res) {
    try {
      let data = await members.findAll({
        order: [["id", "ASC"]],
      });
      if (data.length == 0) {
        throw {
          message: "Data tidak tersedia",
        };
      }
      return res.json(data);
      //   return res.render("members/index.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async create(req, res) {
    try {
      res.render("members/create.ejs");
    } catch (error) {
      res.json(error);
    }
  }

  static async edit(req, res) {
    try {
      const id = Number(req.params.id);
      let data;

      await members
        .findByPk(id)
        .then((results) => {
          data = results.dataValues;
        })
        .catch((err) => console.log(err));

      return res.render("members/edit.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async destroy(req, res) {
    try {
      const id = Number(req.params.id);

      let data = await members.destroy({
        where: {
          id: id,
        },
      });

      res.json(data);
      //   return res.redirect("/members");
    } catch (error) {
      res.json(error);
    }
  }

  static async add(req, res) {
    try {
      const { name, address, city, gender, email } = req.body;

      let data = await members.create({
        name,
        address, 
        city,
        gender,
        email
      });

      return res.json(data);
      //   return res.redirect("/members");
    } catch (error) {
      res.json(error);
    }
  }

  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { name, address, city, gender, email } = req.body;

      await members
        .update(
          {
            name,
            address,
            city,
            gender,
            email,
            updateAt : Date.now(),
          },
          { where: { id } }
        )
        .then((result) => {
          //   console.log(result);
          return res.json(result);
          //   return res.redirect("/members");
        })
        .catch((err) => res.json(err));
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = MemberController;
