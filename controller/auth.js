const { User } = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { responseHelper, errorHelper } = require("../helper/response_helper");
const cron = require("node-cron"); // Import the cron library
const { Country, City } = require("../model/country");
const e = require("express");

async function register(req, res) {
  try {
    const { name, password, phone, country_id, city_id, disc, lat, lng } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      password: hashedPassword,
      code: "111111",
      phone: phone, 
      disc: disc,
      country_id:country_id,
      city_id:city_id,
      lat:lat,
      lng:lng
    });

    const _resData = { id: user.id };
   return res.status(200).json(responseHelper(_resData, "تم التسجيل"));
  } catch (error) {
    console.log(error);
   return res.status(200).json(errorHelper( error.errors[0].message));
    
  }
}

async function verifyNumber(req, res) {
  try {
    const { code, id } = req.body;
    const user = await User.findOne({
      where: { id: id },
      arguments: ["id", "name", "phone", "verified", "rule"],
    });
    if (user.code == code) {
      user.update({
        code: null,
        verified: true,
      });
      const token = jwt.sign(
        { id: user.id, phone: user.phone },
        "your_secret_key",
      );
      return res.json(responseHelper({...user.dataValues, token:token}));
    }
    return res.json(errorHelper("error"));
  } catch (error) {
    return res.json(errorHelper(error));
  }
}

async function login(req, res) {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne(
      { where: { phone } },
      {
        arguments: ["id", "name", "phone"],
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      "your_secret_key",
    );

    res.json(responseHelper({ ...user.dataValues, token }, "تم تسجيل الدخول"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed.", error });
  }
}

async function forgotPassword(req, res){
  try {
    const user = await User.findOne({where:{
      phone: req.body.phone
    }})
  await  user.update({
      code: "111111",
    });
    return res.json(responseHelper(null, 'message sended'))
  } catch (error) {
    return res.json(errorHelper('error'))
  }
}
async function recovery(req, res){
  try {
    
    const { code, phone, password } = req.body;
    const user = await User.findOne({
      where: { phone: phone },
      arguments: ["id", "name", "phone", "verified", "rule"],
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (user.code == code) {
      user.update({
        code: null,
        verified: true,
        password: hashedPassword
      });
      const token = jwt.sign(
        { id: user.id, phone: user.phone },
        "your_secret_key",
        );
        return res.json(responseHelper({...user.dataValues, token:token}));
      }
      return res.json(errorHelper('error'));
    } catch (error) {
      return res.json(errorHelper(error));
    }
}
module.exports.register = register;
module.exports.login = login;
module.exports.verifyNumber = verifyNumber;
module.exports.forgotPassword = forgotPassword;
module.exports.recovery = recovery;
