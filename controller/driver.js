const { Order } = require("../model/products");

async function acceptOrder(req, res){
     const order = await Order.findByPk();
    order.update({
        // to do: update state value
    })
}

async function getOrders(req, res){
    const orders = await Order.get({
        driverId:req.user.id
    })
    // to do: return data
}

async function getOrderById(req, res){
    const orders = await Order.getByPk(req.params.id)
    // to do: return data
}
