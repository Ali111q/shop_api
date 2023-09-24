// const { City } = require("../model"); // Import the City model
const { responseHelper, errorHelper } = require("../helper/response_helper"); // Import your response and error helper functions
const { City } = require("../model/country");

// Create a new city
async function createCity(req, res) {
  try {
    const { name, country_id } = req.body;
    const city = await City.create({ name:name, country_id:country_id });

    res.status(201).json(responseHelper(city, 'City created successfully'));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

// Get all cities
async function getAllCities(req, res) {
  try {
    const cities = await City.findAll();

    res.status(200).json(responseHelper(cities, 'All cities retrieved successfully'));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

// Get a city by ID
async function getCityById(req, res) {
  try {
    const { id } = req.params;
    const city = await City.findByPk(id);

    if (!city) {
      return res.status(404).json(errorHelper('City not found'));
    }

    res.status(200).json(responseHelper(city, 'City retrieved successfully'));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

// Update a city by ID
async function updateCity(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const city = await City.findByPk(id);

    if (!city) {
      return res.status(404).json(errorHelper('City not found'));
    }

    city.name = name;
    await city.save();

    res.status(200).json(responseHelper(city, 'City updated successfully'));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

// Delete a city by ID
async function deleteCity(req, res) {
  try {
    const { id } = req.params;
    const city = await City.findByPk(id);

    if (!city) {
      return res.status(404).json(errorHelper('City not found'));
    }

    await city.destroy();

    res.status(200).json(responseHelper({}, 'City deleted successfully'));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
