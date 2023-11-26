const { Op } = require("sequelize");
const { Order } = require("../model/products");
const { User } = require("../model/user");

async function createOrderFunction ({items, userId, disc, cityId, shareId}){
    console.log(items);
    try {
        const driver =await User.findOne({where:{
            [Op.and]: [
                { rule: 'driver' },
                { city_id: cityId },
              ],
        }})
        if (driver) {
            
            const order = await Order.create({state : "new",disc:disc, userId:userId, driverId:driver.id, shareId:shareId })
            for (const e in items) {
                
                await  order.addProPrice(items[e].id, { through: { count: items[e].count } });
            }
            return order;
        }
        throw "no driver"
    } catch (error) {
        throw error    
    }
} 

module.exports.createOrderFunction = createOrderFunction;