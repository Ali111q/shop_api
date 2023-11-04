// productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controller/product_controller");
const {upload, upload2} = require("../middleware/upload"); // Import the Multer middleware or any other file upload middleware
const authenticateToken = require("../middleware/auth");

// Create a new product with images and country prices
router.post("/store",authenticateToken(["admin"]), upload.array("images"), productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get a single product by ID
router.get("/get_by_id/:id", productController.getProductById);

// Update a product by ID
router.put("/update/:id", productController.updateProduct);

// Delete a product by ID
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
