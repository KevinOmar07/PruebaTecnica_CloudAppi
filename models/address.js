
import { Sequelize } from "sequelize";
import conexion_bd from "../config/db.config.js";
import { user } from "./user.js";

export const Address = conexion_bd.define('address', {
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
