const { errorHelper, responseHelper } = require("../helper/response_helper");
const { User, Invitation } = require("../model/user");
const bcrypt = require("bcryptjs");

async function createAdmin(req, res) {
    try {
        const { name, phone, password, lat, lng, market_code } = req.body;
        const user = await User.create({
            name: name,
            phone: phone,
            password: password,
            code: '111111',
            lat: lat,
            lng: lng,
            market_code: market_code,
            verified: true,
            rule: 'admin'
        });

        res
            .status(200)
            .json(responseHelper(user, "Admin created successfully"));
    } catch (error) {
        res.status(500).json(errorHelper(error));
    }
}

async function getAllAdmins(req, res) {
    try {
        const users = await User.findAll({
            where: {
                rule: 'admin'
            }
        });

        res
            .status(200)
            .json(responseHelper(users, "All admins retrieved successfully"));
    } catch (error) {
        res.status(500).json(errorHelper(error));
    }
}
async function createDriver(req, res) {
    try {
        const { name, phone, password, lat, lng, market_code } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            name: name,
            phone: phone,
            password: hashedPassword,
            code: '111111',
            lat: lat,
            lng: lng,
            market_code: market_code,
            verified: true,
            rule: 'driver'
        });

        res
            .status(200)
            .json(responseHelper(user, "Admin created successfully"));
    } catch (error) {
        res.status(500).json(errorHelper(error));
    }
}

async function getAllDrivers(req, res) {
    try {
        const users = await User.findAll({
            where: {
                rule: 'driver'
            }
        });

        res
            .status(200)
            .json(responseHelper(users, "All drivers retrieved successfully"));
    } catch (error) {
        res.status(500).json(errorHelper(error));
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json(errorHelper("User not found"));
        }

        res
            .status(200)
            .json(responseHelper(user, "User retrieved successfully"));
    } catch (error) {
        res.status(500).json(errorHelper(error));
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, phone, password, code, lat, lng, market_code } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json(errorHelper("User not found"));
        }

        user.name = name;
        user.phone = phone;
        user.password = password;
        user.code = code;
        user.lat = lat;
        user.lng = lng;
        user.market_code = market_code;

        await user.save();

        res
            .status(200)
            .json(responseHelper(user, "User updated successfully"));
    } catch (error) {
        res.status(500).json(errorHelper(error));
    }
}

async function deleteUser(req, res) {
    try {
        console.log(req.params);
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json(errorHelper("User not found"));
        }

        await user.destroy();

        res.status(200).json(responseHelper({}, "User deleted successfully"));
    } catch (error) {
        res.status(500).json(errorHelper(error));
    }
}

async function usersCount(req, res) {
    try {
        const usersCount = await User.count({
            where: {
                rule: "user"
            }
        });
        res.json(responseHelper(usersCount, "users count"));
    } catch (error) {
        res.json(errorHelper(error));
    }
}
async function driversCount(req, res) {
    try {
        const usersCount = await User.count({
            where: {
                rule: "driver"
            }
        });
        res.json(responseHelper(usersCount, "driver count"));
    } catch (error) {
        res.json(errorHelper(error));
    }
}
module.exports = {
    createAdmin,
    getAllAdmins,
    createDriver,
    getAllDrivers,
    getUserById,
    updateUser,
    deleteUser,
    usersCount,
    driversCount
};
