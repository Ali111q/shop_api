const express = require("express");
const router = express.Router();
const {acceptOrder, getOrderById, getOrders, deliveredOrders} = require("..controller/driver");

router.post("/accept", acceptOrder);
router.get("/orders", getOrders);
router.post("/done", deliveredOrders);
router.get("/order", getOrderById)