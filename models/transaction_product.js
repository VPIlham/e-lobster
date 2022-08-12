"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction_product.belongsTo(models.transactions, {
        foreignKey: "transactionId",
      });
      transaction_product.belongsTo(models.products, {
        foreignKey: "productId",
      });
    }
  }
  transaction_product.init(
    {
      productId: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      total: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transaction_product",
    }
  );
  return transaction_product;
};
