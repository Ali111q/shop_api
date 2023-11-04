const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

// Create a new category
router.post("/store", categoryController.createCategory);

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get a single category by ID
router.get("/get-by-id/:id", categoryController.getCategoryById);

// Update a category by ID
router.put("/update/:id", categoryController.updateCategory);

// Delete a category by ID
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
