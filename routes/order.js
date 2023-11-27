const express = require('express');
const authenticateToken = require('../middleware/auth');
const { getOrders, ordersCount, deleteOrder } = require('../controller/order');
const router = express.Router();

router.get('/', authenticateToken(["admin"]), getOrders)
router.get('/count', authenticateToken(["admin"]), ordersCount)
router.get('/delete', authenticateToken(["admin"]), deleteOrder)

module.exports = router;