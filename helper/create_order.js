const { Order } = require("../model/products");
const { User } = require("../model/user");

async function createOrderFunction ({items, userId, disc, cityId}){
    try {
        const driver =await User.findOne({where:{
            rule:'driver', city_id:cityId
        }})
        const order = await Order.create({state : "new",disc:disc, userId:userId, driverId:driver.getValues.id })
        for (const e in items) {
          await  order.addProductCityPrice(e);
        }
            return order;
    } catch (error) {
        throw error    
    }
} 

module.exports.createOrderFunction = createOrderFunction;