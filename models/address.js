
const { Sequelize } = require("sequelize");
const conexion_bd = require("../config/db.config.js");
const { user } = require("./user.js");

const Address = conexion_bd.define('address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    street: Sequelize.STRING,
    state: Sequelize.STRING,
    city: Sequelize.STRING,
    country: Sequelize.STRING,
    zip: Sequelize.STRING
},{
    Sequelize,
    freezeTableName: true,
    paranoid: true,
    deletedAt: 'active',
    createdAt: 'createdDate',
    updatedAt: 'updatedDate'
});

Address.hasOne(user, {
    foreignKey: {
        name: 'id_address'
    },
});

user.belongsTo(Address, {
    foreignKey: {
        name: 'id_address'
    },
});

module.exports = {
    Address
};