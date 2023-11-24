const { Order } = require("../model/products");

async function acceptOrder(req, res){
     const order = await Order.findByPk();
    order.update({
        // to do: update state value
    })
}