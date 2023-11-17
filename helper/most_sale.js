const { Op } = require('sequelize');
const { Order, ProductCityPrice, Product } = require('../model/products'); // Adjust the path accordingly

async function getMostSoldProducts(limit = 10) {
  try {
    const mostSoldProducts = await Product.findAll({
      attributes: [
        'id',
        'title',
        [sequelize.fn('SUM', sequelize.col('ProductCityPrices.price')), 'totalSales'],
      ],
      include: [
        {
          model: ProductCityPrice,
          attributes: [],
        },
      ],
      group: ['Product.id'],
      order: [[sequelize.literal('totalSales'), 'DESC']],
      limit,
    });

    return mostSoldProducts;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getMostSoldProducts,
};
