const express = require("express");
const router = express.Router();
const {acceptOrder, getOrderById, getOrders, deliveredOrder} = require("../controller/driver");
const authenticateToken = require("../middleware/auth");

router.post("/accept", authenticateToken(['driver']), acceptOrder);
router.get("/orders", authenticateToken(['driver']), getOrders);
router.post("/done", authenticateToken(['driver']), deliveredOrder);
router.get("/order/:id", authenticateToken(['driver']), getOrderById);

module.exports = router;