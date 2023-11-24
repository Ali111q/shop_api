const { Order } = require("../model/products");

async function acceptOrder(req, res){
     const order = await Order.findByPk();
    order.update({
        // to do: update state value
    })
}
async function deliveredOrder(req, res){
    const order = await Order.findByPk(req.body.id);
    // to do update order state and user points
}

async function getOrders(req, res){
    const orders = await Order.findAll({
        driverId:req.user.id
    })
    // to do: return data
}

async function getOrderById(req, res){
    const orders = await Order.findByPk(req.params.id)
    // to do: return data
}
