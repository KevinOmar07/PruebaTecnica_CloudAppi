import { request, response } from "express";
import { user } from "../models/user.js";

export const userExists = async(req = request, res = response, next) => {

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

export const validateUserId = (req = request, res = response, next) => {
    const userId = req.params.userId;

    const intUserId = parseInt(userId);

    if (intUserId < 0 || isNaN(intUserId)) {
        return res.status(400).json({
            description: 'Invalid user id'
        });
    }

    next();
}