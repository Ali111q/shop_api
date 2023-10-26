const { Banner } = require("../model/banner");
const multer = require("multer");
const upload = require("../middleware/upload"); // Import the Multer middleware
const fs = require("fs");
const { responseHelper, errorHelper } = require("../helper/response_helper");

// Create a storage engine for multer

// Create a new banner with image upload
exports.createBanner = async (req, res) => {
  
  try {
    const banner = await Banner.create({
      title:req.body.title, 
      sub_title:req.body.sub_title,
      image:`http://localhost:3000/${req.file.path}`
    })
return res.json(responseHelper(banner, 'created'))
  } catch (error) {
    return res.json(errorHelper(error))
  }

};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({attributes:['id', 'title', 'sub_title']});
    res.status(200).json(responseHelper(banners, 'true'));
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to fetch banners" });
  }
};

// Get a single banner by ID
exports.getBannerById = async (req, res) => {
  const bannerId = req.params.id;
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.status(200).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the banner" });
  }
};

// Update a banner by ID
exports.updateBanner = async (req, res) => {
  const bannerId = req.params.id;
  const { title, sub_title, image } = req.body;
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    banner.title = title;
    banner.sub_title = sub_title;
    banner.image = image;
    await banner.save();
    res.status(200).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the banner" });
  }
};

// Delete a banner by ID
exports.deleteBanner = async (req, res) => {
  const bannerId = req.params.id;
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    await banner.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the banner" });
  }
};
