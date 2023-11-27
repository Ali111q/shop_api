const { ProductCountryPrice, ProductImage, Product, ProductCityPrice, CategoryProduct, Category } = require("../model/products");
const { upload } = require("../middleware/upload"); // Import the Multer middleware
const fs = require("fs");
const { responseHelper, errorHelper } = require("../helper/response_helper");
const { Country, City } = require("../model/country");

// Create a new product with images and country prices
exports.createProduct = async (req, res) => {
  const video = req.files.video;
  const image = req.files.video;

  // Save the uploaded file to the desired location
  if (video) {
    video.mv('uploads/videos/' + video.name, function (err) {
      if (err) {
        return res.status(500).send(err);
      }


    });
  }
  if (image) {

    image.mv('uploads/images/' + image.name, function (err) {
      if (err) {
        return res.status(500).send(err);
      }


    });
  }

  try {
    // Create the product
    const product = await Product.create({
      title: req.body.title,
      disc: req.body.disc,
      sub_title: req.body.sub_title,
      video: video && `http://localhost:3022/uploads/videos/${video.name}`
    });

    // Create product images and associate them with the product
    // const imageUrls = req.files.map((file) => `http://localhost:3022/${file.path}`);
    // const productImages = await Promise.all(
    //   imageUrls.map((imageUrl) => ProductImage.create({ imageUrl, productId: product.id }))
    // );
    if (image) {

      ProductImage.create({ imageUrl: `http://localhost:3022/uploads/images/${image.name}`, productId: product.id })
    }


    // Create product prices for different countries and associate them with the product
    for (const priceInfo in req.body.prices) {
      await ProductCityPrice.create({
        price: req.body.prices[priceInfo].price,
        CityId: req.body.prices[priceInfo].countryId,
        productId: product.dataValues.id,
      });
    }
    if (req.body.categoryId) {
      await CategoryProduct.create({
        productId: product.dataValues.id,
        categoryId: req.body.categoryId
      })
    }



    return res.json(responseHelper(product, 'created'));
  } catch (error) {
    console.log(error);
    return res.json(errorHelper(error));
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    // Extract the country ID from the request query parameters, if provided
    const countryId = req.query.cityId;
    const categoryId = req.query.categoryId;
    // Define options for the query
    const options = {
      include: [{
        
        model: ProductImage, 
        attributes:["imageUrl"]
      }],
    };

    // If a countryId is provided, include the associated Country with a filter
 
      options.include.push({
        as:"prices",
        model: City,
     
      });
    
 
      options.include.push({
        model: Category,
        as:"category"
   
      });
    
const where = {}

if (countryId) {
  where["$prices.ProductCityPrice.id$"] =countryId;
}
if (categoryId) {
  where["$category.id$"] =categoryId;
}
    // Fetch products based on the provided options
    const products = await Product.findAll({...options, where:where});

    // Check if the result is an empty array when countryId is specified
    if (countryId && products.length === 0) {
      return res.status(200).json(responseHelper([], 'true'));
    }

    res.status(200).json(responseHelper(products, 'true'));
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};



// Get a single product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId, {
      include: [ProductImage, ProductCountryPrice],
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the product" });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { title, disc, sub_title, prices } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.title = title;
    product.disc = disc;
    product.sub_title = sub_title;
    await product.save();

    // Update product prices for different countries
    await ProductCountryPrice.destroy({ where: { ProductId: productId } });
    const countryPrices = prices.map((priceInfo) => ({
      price: priceInfo.price,
      countryId: priceInfo.countryId,
      ProductId: productId,
    }));
    await ProductCountryPrice.bulkCreate(countryPrices);

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the product" });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete associated product images
    await ProductImage.destroy({ where: { ProductId: productId } });

    // Delete associated product country prices
    await ProductCountryPrice.destroy({ where: { ProductId: productId } });

    await product.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the product" });
  }
};
