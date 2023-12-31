const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

// Create a new user
router.post('/add-admin', userController.createAdmin);

// Get all users
router.get('/admins', userController.getAllAdmins);

router.post('/add-driver', userController.createDriver);

// Get all users
router.get('/drivers', userController.getAllDrivers);
// Get user by ID
router.get('/get-by-id/:id', userController.getUserById);

// Update user by ID
router.post('/update/:id', userController.updateUser);

// Delete user by ID
router.post('/delete/:id', userController.deleteUser);
router.get('/count', userController.usersCount);
router.get('/driver/count', userController.driversCount);

module.exports = router;
