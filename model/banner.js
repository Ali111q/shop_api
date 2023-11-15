const { Sequelize } = require("sequelize");
const { sequelize } = require("../db/db");

const Banner = sequelize.define("banner", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sub_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    
  });

  Banner.sync();
module.exports.Banner = Banner;
  