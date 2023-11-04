const express = require("express");
const router = express.Router();
const bannerController = require("../controller/banner");
const {upload} = require("../middleware/upload");
const authenticateToken = require("../middleware/auth");

// Create a new banner with image upload
router.post("/store", authenticateToken(['admin']),  upload.single("image"),  bannerController.createBanner);

// Get all banners
router.get("/", bannerController.getAllBanners);

// Get a single banner by ID
router.get("/get-by-id/:id", bannerController.getBannerById);

// Update a banner by ID
router.put("/update/:id", bannerController.updateBanner);

// Delete a banner by ID
router.delete("/delete/:id", bannerController.deleteBanner);

module.exports = router;
