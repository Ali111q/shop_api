const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Change to your database dialect (e.g., postgres, sqlite)
});
module.exports.sequelize = sequelize;