class TransactionController {
//   static async index(req, res) {
//     try {
//       let data = await .findAll({
//         order: [["id", "ASC"]],
//       });
//       if (data.length == 0) {
//         throw {
//           message: "Data tidak tersedia",
//         };
//       }
//       return res.json(data);
//       //   return res.render("categories/index.ejs", { result: data });
//     } catch (error) {
//       res.json(error);
//     }
//   }
}

module.exports = TransactionController;
