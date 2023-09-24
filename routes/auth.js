// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {register, login, verifyNumber} = require('../controller/auth')
const router = express.Router();
router.use(bodyParser.json());

// User registration
router.post('/register', register);

// User authentication
router.post('/login', login);
router.post('/otp', verifyNumber);

module.exports = router;
