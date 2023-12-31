const express = require("express");
const router = express.Router();
const {acceptOrder, getOrderById, getOrders, deliveredOrder, rejectOrder} = require("../controller/driver");
const authenticateToken = require("../middleware/auth");
const userController = require('../controller/user');


router.post("/accept", authenticateToken(['driver']), acceptOrder);
router.get("/orders", authenticateToken(['driver']), getOrders);
router.post("/done", authenticateToken(['driver']), deliveredOrder);
router.post("/reject", authenticateToken(['driver']), rejectOrder);
router.get("/order/:id", authenticateToken(['driver']), getOrderById);
router.get('/count',userController.driversCount );

module.exports = router;