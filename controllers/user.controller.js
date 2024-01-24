const { request, response } = require("express");
const { user } = require("../models/user.js");
const { Address } = require("../models/address.js");


const getUsers = async(req = request, res = response) => {

    try {

        const {count, rows} = await user.findAndCountAll({
            include: Address
        });

        res.json(rows);
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Ocurrio un error interno"
        });
    }
}

const createUsers = async(req = request, res = response) => {
    try {
        
        const data = req.body.user;

        const newAddress = await Address.create(data.address);

        data.id_address = newAddress.id;
        const newUser = await user.create(data);
        newUser.dataValues.address = newAddress;

        res.status(201).json({
            description: 'CREATED',
            user: newUser
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Ocurrio un error interno"
        });
    }
}

const getusersById = async(req = request, res = response) => {
    try {
        
        const userId = req.params.userId;

        const userById = await user.findByPk(userId, {include: Address});

        return res.json({
            description: 'Ok',
            user: userById
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Ocurrio un error interno"
        });

    }
}

const updateUsersById = async(req = request, res = response) => {
    try {
        
        const userId = req.params.userId;
        const {address, ...data} = req.body.user;

        const updateUser = await user.findByPk(userId, {include:Address});

        await updateUser.update(data);
        if (address) await updateUser.address.update(address);

        res.json({
            description: 'Ok',
            user: updateUser
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Ocurrio un error interno"
        });
        
    }
}

const deleteUsersById = async(req = request, res = response) => {
    try {
        
        const userId = req.params.userId;

        const userDeleted = await user.findByPk(userId, {include: Address});

        await userDeleted.destroy();
        if (userDeleted.address) await userDeleted.address.destroy();

        res.json({
            description: 'Ok'
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Ocurrio un error interno"
        });
        
    }
}

module.exports = {
    getUsers,
    createUsers,
    getusersById,
    updateUsersById,
    deleteUsersById
};