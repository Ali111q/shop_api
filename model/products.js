const { Sequelize } = require("sequelize");
const { sequelize } = require("../db/db");
const { Country, City } = require("./country");
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

const ProductCityPrice = sequelize.define("ProductCityPrice", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
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
const Category = sequelize.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
const CategoryProduct = sequelize.define("category_products", {
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
Product.belongsToMany(City, { through: ProductCityPrice });
City.belongsToMany(Product, { through: ProductCityPrice });
Product.belongsToMany(Category, { through: CategoryProduct })
Category.belongsToMany(Product, { through: CategoryProduct })

// Sync the models
sequelize.sync();




module.exports.ProductCityPrice = ProductCityPrice;
module.exports.Product = Product;
module.exports.ProductImage = ProductImage;
module.exports.Category = Category;