const { sequelize } = require("../db/db");
const Sequelize = require("sequelize");
// const { City } = require("./city");


const Country = sequelize.define("Country",{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    currency:{
        type:Sequelize.STRING,
        allowNull:false
    },
    key:{
        type : Sequelize.STRING ,
        allowNull : true
    }
})

const City = sequelize.define("City",{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
})

City.belongsTo(Country, { foreignKey: "country_id" });
Country.hasMany(City, {foreignKey: "country_id"})
Country.sync();

City.sync();



module.exports.Country = Country;
module.exports.City = City;
