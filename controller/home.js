const { errorHelper, responseHelper } = require("../helper/response_helper");
const { Country } = require("../model/country");
const { Category, ProductImage, Product } = require("../model/products"); // Replace with the correct path to your model file


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
      // Extract the country ID from the request, assuming it's available in req.query or req.params
      const countryId = req.user.country_id; // Update this based on how the country ID is provided in your request
  
      // Define an options object to specify thse included models conditionally
      const options = {
        include: [ProductImage],
      };
  
      // If countryId is provided, include ProductCountryPrice with a filter
      if (countryId) {
        options.include.push({
          model: Country,
          through: { where: { countryId } },
        });
      }
  
      if (catId) {
        options.include.push({
          model: Category,
          through: { where: { categoryId:catId } },
        });
      }
  
      // Fetch products based on the provided options
      const products = await Product.findAll(options);
     
      // Restructure the data to move "price" to the top level
      const modifiedProducts = products.map((product) => {
        console.log(product);
        const modifiedProduct = {
          id: product.id,
          title: product.title,
          video: product.video,
          disc: product.disc,
          sub_title: product.sub_title,
          price: countryId ? product.Countries[0].ProductCountryPrice.price : null,
          ProductImages: product.ProductImages.map(e=>e.imageUrl),
        };
        return modifiedProduct;
      });
  
      res.status(200).json(responseHelper(modifiedProducts, 'true'));
    } catch (error) {
      console.error(error);
      res.json({ error: error });
    }
  };