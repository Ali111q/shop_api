const { Sequelize } = require("sequelize");
const { sequelize } = require("../db/db");
const { Country } = require("./country");
const { User } = require("./user");

const Product = sequelize.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  video: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  disc: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sub_title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

const ProductCountryPrice = sequelize.define("ProductCountryPrice", {
  price: {
    type: Sequelize.FLOAT, // You may want to use the appropriate data type for prices
    allowNull: false,
  },
});

const ProductImage = sequelize.define("ProductImage", {
    imageUrl: {
      type: Sequelize.STRING, // Adjust the data type as needed
      allowNull: false,
    },
  });
  const ProductRating = sequelize.define("ProductRating", {
    rating: {
      type: Sequelize.INTEGER, // You can use the appropriate data type for ratings
      allowNull: false,
    },
  });
  
  // Define the associations between User, Product, and ProductRating
  User.hasMany(ProductRating);
  Product.hasMany(ProductRating);
  ProductRating.belongsTo(User);
  ProductRating.belongsTo(Product);
  
  // Define the association between Product and ProductImage
  Product.hasMany(ProductImage);
  ProductImage.belongsTo(Product);
  

  
// Define the associations
Product.belongsToMany(Country, { through: ProductCountryPrice });
Country.belongsToMany(Product, { through: ProductCountryPrice });

// Sync the models
sequelize.sync();
Product.sync();


module.exports.ProductCountryPrice = ProductCountryPrice;
module.exports.Product = Product;
  module.exports.ProductImage = ProductImage;