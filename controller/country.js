const { errorHelper, responseHelper } = require("../helper/response_helper");
// const { City } = require("../model/city");
const { Country, City } = require("../model/country"); // Replace with the correct path to your model file

async function createCountry(req, res) {
  try {
    const { name, currency, key } = req.body;
    const country = await Country.create({ name, currency, key });

    res
      .status(200)
      .json(responseHelper(country, "Country created successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

async function getAllCountries(req, res) {
  try {
    const countries = await Country.findAll({
      attributes: ["id", "name"],
      include: {
        model: City,
        attributes: ["id", "name"],
      },
    });

    res
      .status(200)
      .json(responseHelper(countries, "All countries retrieved successfully"));
  } catch (error) {
    res.status(500).json(error(error));
  }
}

async function getCountryById(req, res) {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json(errorHelper("Country not found"));
    }

    res
      .status(200)
      .json(responseHelper(country, "Country retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

async function updateCountry(req, res) {
  try {
    const { id } = req.params;
    const { name, currency } = req.body;
    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json(errorHelper("Country not found"));
    }

    country.name = name;
    country.currency = currency;
    await country.save();

    res
      .status(200)
      .json(responseHelper(country, "Country updated successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

async function deleteCountry(req, res) {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json(errorHelper("Country not found"));
    }

    await country.destroy();

    res.status(200).json(responseHelper({}, "Country deleted successfully"));
  } catch (error) {
    res.status(500).json(errorHelper(error));
  }
}

module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};
