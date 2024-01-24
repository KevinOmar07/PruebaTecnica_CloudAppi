import { Sequelize } from "sequelize";
import conexion_bd from "../config/db.config.js";

export const user = conexion_bd.define('user', {
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
