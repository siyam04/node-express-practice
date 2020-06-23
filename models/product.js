'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};

