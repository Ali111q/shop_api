const { Order, ProductCityPrice, Product, ProductImage } = require("../model/products");
const { errorHelper, responseHelper } = require("../helper/response_helper");
const { City } = require("../model/country");
const { User } = require("../model/user");

async function acceptOrder(req, res){
    try {
        
        const order = await Order.findByPk();
        order.update({
            state:"accepted"
        })


        res.json(responseHelper(order, "accepted"));
    } catch (error) {
        res.json(errorHelper(error))
    }
    
}
async function deliveredOrder(req, res){
    try {
        
        const order = await Order.findByPk(req.body.id);
        
        order.update({
            state: "done"
        })
        const user = await User.findByPk(order.userId);

        user.update({
          points: user.points+10
        })
        res.json(responseHelper(order, "done"));
    } catch (error) {
        res.json(errorHelper(error))
    }
}
async function rejectOrder(req, res){
    try {
        
        const order = await Order.findByPk(req.body.id);
        
        order.update({
            state: "rejected"
        })
        const user = await User.findByPk(order.userId);

        user.update({
          points: user.points+10
        })
        res.json(responseHelper(order, "rejected"));
    } catch (error) {
        res.json(errorHelper(error))
    }
}


async function getOrders(req, res) {
    const items = [];
    try {
      const orders = await Order.findAll({
        where: {
          driverId: req.user.id,
        },
        include: {
          model: ProductCityPrice,
          as: "proPrice",
        },
      });
  
      // Calculate the total price for each order
      const ordersWithTotalPrice = [];
      for (const order of orders) {
        let totalPrice = 0;
  
        const products = [];
        for (const productCityPrice of order.proPrice) {
            const product = await Product.findByPk(productCityPrice.productId, {include:{
                model:ProductImage
            }})
          products.push({
            name: product.title,
            price: productCityPrice.price,
            images: product.ProductImages.map((image) => image.imageUrl),
            count:productCityPrice.OrderProductCityPrice.count
          });
  
          totalPrice += 0
        }
  
        ordersWithTotalPrice.push({
          id: order.id,
          state: order.state,
          desc: order.desc,
          products,
          totalPrice,
        });
      }
  
      res.json(responseHelper(ordersWithTotalPrice, "orders"));
    } catch (error) {
      console.error(error);
      res.json(errorHelper(error.message));
    }
  }
  
async function getOrderById(req, res){
    try {
        
        const order = await Order.findByPk(req.params.id)
        res.json(responseHelper(order, "order data"));
    } catch (error) {
        res.json(errorHelper(error))
    }
}

module.exports = {
    acceptOrder, deliveredOrder, getOrders, getOrderById, rejectOrder
}
