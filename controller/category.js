const { errorHelper, responseHelper } = require("../helper/response_helper");
const { Category } = require("../model/products"); // Replace with the correct path to your model file

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });

    res
      .status(200)
      .json(responseHelper(category, "Category created successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name"],
    });

    res
      .status(200)
      .json(responseHelper(categories, "All categories retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json(errorHelper("Category not found"));
    }

    res
      .status(200)
      .json(responseHelper(category, "Category retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json(errorHelper("Category not found"));
    }

    category.name = name;
    await category.save();

    res
      .status(200)
      .json(responseHelper(category, "Category updated successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json(errorHelper("Category not found"));
    }

    await category.destroy();

    res.status(200).json(responseHelper({}, "Category deleted successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
