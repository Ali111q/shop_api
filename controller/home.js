const { createOrderFunction } = require("../helper/create_order");
const { getMostSoldProducts } = require("../helper/most_sale");
const { errorHelper, responseHelper } = require("../helper/response_helper");
const { Country, City } = require("../model/country");
const { Category, ProductImage, Product, ProductCityPrice } = require("../model/products"); // Replace with the correct path to your model file


exports.getAllCategories =async (req, res)=>{
    try {
        const categories = await Category.findAll({
          attributes: ["id", "name"],
        });
    
        res
          .status(200)
          .json(responseHelper(categories, "All categories retrieved successfully"));
      } catch (error) {
        console.log(error);
        res.status(500).json(errorHelper(error));
      }
}
exports.getAllProducts = async (req, res) => {
  try {
    const catId = req.params.categoryId;
    const countryId = req.user.city_id;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to limit 10 if not specified

    const options = {
      include: [ProductImage],
      offset: (page - 1) * limit, // Calculate the offset based on the page
      limit: limit, // Set the limit based on the limit parameter
    };

    if (countryId) {
      options.include.push({
        model: City,
        through: { where: { CityId:countryId } },
      });
    }

    if (catId) {
      options.include.push({
        model: Category,
        through: { where: { categoryId: catId } },
      });
    }

    const products = await Product.findAndCountAll(options); // Use findAndCountAll to get the total count

    const totalProducts = products.count;
    const totalPages = Math.ceil(totalProducts / limit);

    const modifiedProducts = products.rows.map((product) => {
      const modifiedProduct = {
        id: product.id,
        title: product.title,
        video: product.video,
        disc: product.disc,
        sub_title: product.sub_title,
        price: countryId ? product.Countries[0].ProductCountryPrice.price : null,
        ProductImages: product.ProductImages.map(e => e.imageUrl),
      };
      return modifiedProduct;
    });

    res.status(200).json(
      responseHelper({
        products: modifiedProducts,
        totalProducts,
        totalPages,
        currentPage: page,
      },
      'true'
    ));
  } catch (error) {
    console.error(error);
    res.json(errorHelper(error.message));
  }
};
exports.getMostSale =async (req, res)=>{
  try {
    
  const pro = await  getMostSoldProducts();
  res.status(200).json( responseHelper(pro,
  'true'
));
  } catch (error) {
    res.json(errorHelper(error));
    
  }
}

exports.createOrder = async (req, res)=>{
  try {
    
    const {items, disc} = req.body;
    var pros = [];
    for (const item in items) {
    const product = await Product.getByPk(item, {
      include:{
        model: ProductCityPrice,
        as:'prices',
        where:{
          CityId: req.user.city_id
        }
      }
    });
    pros.push(product.dataValues.prices[0].id)
    }
    const order = await createOrderFunction({userId: req.user.id,items:pros, disc:disc, cityId:user.city_id });
    req.json(responseHelper(order, "success"))
  } catch (error) {
    res.json(errorHelper(error))
  }
}