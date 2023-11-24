const express = require("express");
const router = express.Router();
const {acceptOrder, getOrderById, getOrders, deliveredOrders} = require("..controller/driver");

router.post("/accept", authenticateToken(['driver']), acceptOrder);
router.get("/orders", authenticateToken(['driver']), getOrders);
router.post("/done", authenticateToken(['driver']), deliveredOrders);
router.get("/order/:id", authenticateToken(['driver']), getOrderById);

module.exports = router;