"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories, { foreignKey: "categoryId" });
      
      products.belongsToMany(models.transactions, {
        through: models.transaction_product,
      });
    }
  }
  products.init(
    {
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      stock: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
