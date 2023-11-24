const { Order } = require("../model/products");

async function getOrders(req, res){
    const orders = await Order.findAll();
    // to do: return data
}
async function deleteOrder(req, res){
    await Order.delete({
        where:{
            id: req.body.id
        }
    })
    //return data
}