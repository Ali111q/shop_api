// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {register, login, verifyNumber, forgotPassword, recovery} = require('../controller/auth')
const router = express.Router();
router.use(bodyParser.json());

// User registration
router.post('/register', register);

// User authentication
router.post('/login', login);
router.post('/otp', verifyNumber);
router.post('/forgot-password', forgotPassword);
router.post('/recovery', recovery);

module.exports = router;
