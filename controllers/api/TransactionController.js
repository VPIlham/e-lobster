const {
  members,
  categories,
  products,
  transactions,
  transaction_product,
} = require("../../models");
class TransactionController {
  static async index(req, res) {
    try {
      let data = await transaction_product.findAll({
        order: [["id", "ASC"]],
        attributes: [
          "id",
          "productId",
          "transactionId",
          "name",
          "total",
          "qty",
          "status",
        ],
        include: [
          {
            model: transactions,
            attributes: ["payment"],
            include: [{ model: members, attributes: ["name", "email"] }],
          },
          {
            model: products,
            attributes: ["name", "image", "price"],
            include: [{ model: categories, attributes: ["name"] }],
          },
        ],
      });

      if (data.length == 0) {
        throw {
          message: "Data tidak tersedia",
        };
      }
      return res.json(data);
      // return res.render("transactions/index.ejs", { result: data });
    } catch (error) {
      res.json(error);
    }
  }

  static async create(req, res) {
    try {
      const dataProduct = await products.findAll({
        order: [["name", "ASC"]],
        attributes: ["id", "name", "stock", "price"],
      });

      const dataMember = await members.findAll({
        order: [["name", "ASC"]],
        attributes: ["id", "name"],
      });

      const result = {
        products: dataProduct,
        members: dataMember,
      };

      return res.json(result);
      // return res.render("transactions/create.ejs", { result: result });
    } catch (error) {
      res.json(error);
    }
  }

  static async edit(req, res) {
    try {
      const id = Number(req.params.id);
      let resultData = "";

      const dataProduct = await products.findAll({
        order: [["name", "ASC"]],
        attributes: ["id", "name", "stock", "price"],
      });

      const dataMember = await members.findAll({
        order: [["name", "ASC"]],
        attributes: ["id", "name"],
      });

      await transaction_product
        .findOne({
          where: { id: id },
          order: [["id", "ASC"]],
          attributes: [
            "id",
            "productId",
            "transactionId",
            "name",
            "total",
            "qty",
          ],
          include: [
            {
              model: transactions,
              attributes: ["payment"],
              include: [{ model: members, attributes: ["id", "name"] }],
            },
            {
              model: products,
              attributes: ["id", "name", "image", "price"],
            },
          ],
        })
        .then((result) => {
          let hasil = result.dataValues;

          resultData = {
            products: dataProduct,
            members: dataMember,
            data: hasil,
          };

          return res.json(resultData);
          // return res.render("transactions/edit.ejs", { result: resultData });
        });
    } catch (error) {
      res.json(error);
    }
  }

  static async destroy(req, res) {
    try {
      const id = Number(req.params.id);

      let data = await transaction_product.findByPk(id);

      const { transactionId } = data;

      let hapus_tp = await transaction_product.destroy({ where: { id: id } });
      let hapus_trx= await transactions.destroy({ where: { id: transactionId } });

      return res.json(hapus_tp);
    } catch (error) {
      res.json(error);
    }
  }

  static async add(req, res) {
    try {
      const { memberId, payment, productId, qty } = req.body;

      let status = "GAGAL",
        name = "",
        total = 0,
        stokHitung = 0,
        price = 0;

      let date = new Date();
      let components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      ];

      let randomUid = components.join("");
      name = `TRX-${randomUid}`;

      products.findByPk(productId).then((result) => {
        price = result.dataValues.price;
        total = qty * price;
        stokHitung = result.dataValues.stock - qty;
      });

      await transactions
        .create({
          memberId,
          name,
          payment,
        })
        .then((result) => {
          const { id } = result.dataValues;

          status = "BERHASIL";

          //perubahan stok
          products.update(
            {
              stock: stokHitung,
            },
            { where: { id: productId } }
          );

          let data = transaction_product.create({
            productId,
            transactionId: id,
            name,
            total,
            qty,
            status,
          });
          
          res.json(data);
          // return res.redirect("/transactions");
        });
    } catch (error) {
      res.json(error);
    }
  }

  static async update(req, res) {
    try {
      //id transaction_products
      const id = Number(req.params.id);
      const { memberId, transactionId, payment, productId, qty } = req.body;

      let total = 0,
        stokHitung = 0,
        price = 0;

      await products.findByPk(productId).then((result) => {
        price = result.dataValues.price;
        total = qty * price;
        stokHitung = Number(result.dataValues.stock) - qty;

        transaction_product
          .update(
            {
              total,
              qty,
              transactionId,
              productId,
            },
            {
              where: { id: id },
            }
          )
          .then(() => {
            products.update(
              {
                stock: stokHitung,
              },
              { where: { id: productId } }
            );

            let trx = transactions.update(
              {
                payment,
                memberId,
              },
              { where: { id: transactionId } }
            );

            return res.json(trx);
          });
      });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = TransactionController;
