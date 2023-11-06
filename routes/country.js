const express = require('express');
const { createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry } = require('../controller/country');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Create a new country
router.post('/store', createCountry);

// Get all countries
router.get('/', getAllCountries);

// Get a country by ID
router.get('/get-by-id/:id', getCountryById);

// Update a country by ID
router.post('/update/:id',authenticateToken(['admin']), updateCountry);

// Delete a country by ID
router.post('/delete/:id',authenticateToken(['admin']), deleteCountry);

module.exports = router;
