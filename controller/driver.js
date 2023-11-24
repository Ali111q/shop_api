const { Order } = require("../model/products");

async function acceptOrder(req, res){
     const order = await Order.findByPk();
    order.update({
        state:"accepted"
    })
    res.json(order);
    
}
async function deliveredOrder(req, res){
    const order = await Order.findByPk(req.body.id);
    
    order.update({
        state: "done"
    })
    res.json(order);
}

async function getOrders(req, res){
    const orders = await Order.findAll({
        driverId:req.user.id
    })
    res.json(orders);
}

async function getOrderById(req, res){
    const order = await Order.findByPk(req.params.id)
    res.json(order)
}
