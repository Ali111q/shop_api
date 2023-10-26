const { sequelize } = require("../db/db");
const Sequelize = require("sequelize");
const { Country, City } = require("./country");


const User = sequelize.define("user", { 
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
  },
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  rule: {
    type: Sequelize.STRING,
    defaultValue: "user",
  },
});
const Invitation = sequelize.define('Invitation',{
  code: {
    type:Sequelize.STRING,
    allowNull:false
  }
})
User.belongsTo(Country, { foreignKey: "country_id" });
User.belongsTo(City, { foreignKey: "city_id" });
Invitation.belongsTo(User, {foreignKey: "user_id"});
User.hasOne(Invitation, {foreignKey: "user_id"});


User.sync({ alter: true });
Invitation.sync({ alter: true });

module.exports.User = User;
