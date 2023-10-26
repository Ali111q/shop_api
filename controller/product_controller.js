const { ProductCountryPrice, ProductImage, Product } = require("../model/products");
const multer = require("multer");
const upload = require("../middleware/upload"); // Import the Multer middleware
const fs = require("fs");
const { responseHelper, errorHelper } = require("../helper/response_helper");

// Create a new product with images and country prices
exports.createProduct = async (req, res) => {
  try {
    // Create the product
    const product = await Product.create({
      title: req.body.title,
      disc: req.body.disc,
      sub_title: req.body.sub_title,
    });

    // Create product images and associate them with the product
    const imageUrls = req.files.map((file) => `http://localhost:3000/${file.path}`);
    const productImages = await Promise.all(
      imageUrls.map((imageUrl) => ProductImage.create({ imageUrl, ProductId: product.id }))
    );

    // Create product prices for different countries and associate them with the product
    const countryPrices = req.body.prices.map((priceInfo) => ({
      price: priceInfo.price,
      countryId: priceInfo.countryId,
      ProductId: product.id,
    }));
    await ProductCountryPrice.bulkCreate(countryPrices);

    return res.json(responseHelper(product, 'created'));
  } catch (error) {
    return res.json(errorHelper(error));
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: [ProductImage, ProductCountryPrice] });
    res.status(200).json(responseHelper(products, 'true'));
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to fetch products" });
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
