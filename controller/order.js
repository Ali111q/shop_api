const { Order } = require("../model/products");

async function getOrders(req, res){
    const orders = Order.findAll();
    // to do: return data
}