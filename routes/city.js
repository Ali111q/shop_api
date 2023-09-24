const express = require('express');
const { createCity, getAllCities, getCityById, updateCity, deleteCity } = require('../controller/city');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Create a new city
router.post('/store', authenticateToken(['admin']), createCity);

// Get all cities
router.get('/', getAllCities);

// Get a city by ID
router.get('/get-by-id/:id',authenticateToken(['admin']), getCityById);

// Update a city by ID
router.put('/update/:id',authenticateToken(['admin']), updateCity);

// Delete a city by ID
router.delete('/delete/:id',authenticateToken(['admin']), deleteCity);

module.exports = router;
