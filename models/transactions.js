'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.members, { foreignKey : "memberId" })
      transactions.belongsToMany(models.products, {
        through: models.transaction_product,
      });
    }
  }
  transactions.init({
    memberId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    payment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};