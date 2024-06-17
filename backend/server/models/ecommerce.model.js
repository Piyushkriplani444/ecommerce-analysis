"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ecommerce extends Model {
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
      modelName: "Ecommerce",
      tableName: "ecommerce",
    }
  );
  return Ecommerce;
};
