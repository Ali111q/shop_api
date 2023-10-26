const { Sequelize } = require("sequelize");
const { sequelize } = require("../db/db");

const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Category.sync();
module.exports.Category = Category;
  