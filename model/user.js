const { sequelize } = require("../db/db");
const Sequelize = require("sequelize");
const { Country, City } = require("./country");


const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "الاسم مطلوب",
      },
    },
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "رقم الهاتف مطلوب",
      },
      isNumeric: {
        msg: "رقم الهاتف يجب أن يكون رقميًا",
      },
      len: {
        args: [10],
        min: 10,
        msg: "رقم الهاتف يجب أن يتكون من 10 أرقام على الأقل",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "كلمة المرور مطلوبة",
      },
      len: {
        args: [8],
        min: 8,
        msg: "كلمة المرور يجب أن تتكون من 8 أحرف على الأقل",
      },
    },
  },
  code: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [6],
        min: 6,   
        msg: "الكود يجب أن يتكون من 6 أحرف على الأقل",
      },
    },
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  points:{
  type:Sequelize.INTEGER,
  defaultValue:0
  }
  rule: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "user",
  },
  disc: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "",
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "الموقع مطلوب",
      },
    },
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "الموقع مطلوب",
      },
    },
  },
  market_code:{
    type:Sequelize.STRING
  }
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
