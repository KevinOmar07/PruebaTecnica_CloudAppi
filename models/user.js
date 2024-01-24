const { Sequelize } = require("sequelize");
const conexion_bd = require("../config/db.config.js");


const user = conexion_bd.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    birthDate: Sequelize.DATE
},{
    indexes: [
        {
            name: 'i_user_email',
            unique: false,
            fields: ['email']
        }
    ],
    Sequelize,
    paranoid: true,
    deletedAt: 'active',
    createdAt: 'createdDate',
    updatedAt: 'updatedDate'
});

module.exports = {
    user
}