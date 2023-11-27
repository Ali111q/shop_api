const { responseHelper, errorHelper } = require("../helper/response_helper");
const { Settings } = require("../model/settings");

module.exports.createSettings = async (req, res) => {
    try {
        const settings = await Settings.create({
            facebook: "",
            instagram: "",
            mail: "",
            number: "",
            whatsapp: "",
        })
        res.json(responseHelper(settings, "done"))
    } catch (error) {
        res.json(errorHelper(error))
    }
}
module.exports.updateSettings = async (req, res) => {
    try {
        const settings = await Settings.update(req.body, {
            where: {
                id: 1
            }
        })
        res.json(responseHelper(settings, "updated"))
    } catch (error) {
        res.json(errorHelper(error))
    }
}
module.exports.getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne({
            where: {
                id: 1
            },
            attributes:['facebook', 'instagram', 'mail', 'number', 'whatsApp']
        })
        res.json(responseHelper(settings, "settings data"))
    } catch (error) {
        res.json(errorHelper(error))
    }
}