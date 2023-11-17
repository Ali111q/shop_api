const express = require('express');
const authenticateToken = require('../middleware/auth');
const bannerController = require("../controller/banner");
const {getAllProducts, getAllCategories, getMostSale} = require('../controller/home')
const router = express.Router();

router.get("/banner", bannerController.getAllBanners);
router.get("/categories",getAllCategories );
router.get("/products", authenticateToken(['user', 'admin']), getAllProducts );
router.get("/most-sale", getMostSale );

module.exports = router;