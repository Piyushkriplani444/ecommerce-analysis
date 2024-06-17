"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ecommerce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ecommerce.init(
    {
      title: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      category: DataTypes.TEXT,
      image: DataTypes.TEXT,
      sold: DataTypes.BOOLEAN,
      dateOfSale: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ecommerce",
    }
  );
  return Ecommerce;
};
