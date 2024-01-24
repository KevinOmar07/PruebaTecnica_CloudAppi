import { createNamespace } from 'cls-hooked';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const namespace = createNamespace('my-namespace');

Sequelize.useCLS(namespace);

const conexion_bd = new Sequelize(process.env.DBNAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST, 
    dialect: 'mysql',
    port: process.env.DBPORT,
    logging: false
});

await conexion_bd.sync({force: false, alter: true})
.then(() => {
    console.log('db_config | Tablas sincronizadas');
}).catch((err) => {
    console.log('Ocurrio un error, no se pudo conectar con la base de datos:\n', err);
});

export default conexion_bd;