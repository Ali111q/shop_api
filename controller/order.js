const { responseHelper, errorHelper } = require("../helper/response_helper");
const { Order } = require("../model/products");

async function getOrders(req, res){
    try {
        
        const orders = await Order.findAll();
        res.json(responseHelper(orders, "done"))
       
    } catch (error) {
        res.json(errorHelper(error))
    }
    }
async function deleteOrder(req, res){
    try {
        
        await Order.delete({
            where:{
                id: req.body.id
            }
        })
        res.json(responseHelper({}, "deleted"))
    } catch (error) {
        res.json(errorHelper(error))
    }
    //to do: return data
}
async function ordersCount(req, res){
    try {
        
        const count =  await Order.count({
            
        })
        res.json(responseHelper(count, "done"))
    } catch (error) {
        res.json(errorHelper(error))
    }
}
module.exports = {ordersCount, deleteOrder, getOrders}