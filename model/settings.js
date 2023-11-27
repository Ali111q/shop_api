const { sequelize } = require("../db/db");
const Sequelize = require("sequelize");

const Settings = sequelize.define("Settings", {
    facebook:{
     type:Sequelize.STRING,
    },
    instagram:{
        type:Sequelize.STRING
    },
    mail:{
       type: Sequelize.STRING
    },
    number:{
       type: Sequelize.STRING
    },
    whatsapp:{
       type: Sequelize.STRING
    }
})


module.exports.Settings = Settings;