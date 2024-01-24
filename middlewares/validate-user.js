const { request, response } = require("express");
const { user } = require("../models/user.js");

const userExists = async(req = request, res = response, next) => {

    const userId = req.params.userId;

    const userExists = await user.findByPk(userId);

    if(!userExists){
        return res.status(404).json({
            description: 'User not found'
        });
    }

    req.user = userExists;
    next();
}

const validateUserId = (req = request, res = response, next) => {
    const userId = req.params.userId;

    const intUserId = parseInt(userId);

    if (intUserId < 0 || isNaN(intUserId)) {
        return res.status(400).json({
            description: 'Invalid user id'
        });
    }

    next();
}

module.exports = {
    userExists,
    validateUserId
}