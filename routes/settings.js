const { createSettings, updateSettings, getSettings } = require("../controller/settings");
const express = require('express');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/create', createSettings);
router.post('/update', updateSettings);
router.get('/', getSettings);

module.exports = router;