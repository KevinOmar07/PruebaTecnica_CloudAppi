const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.routes.js');

require('dotenv').config();


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.user = '/users';

        // Implementacion de middlewares
        this.middleware();

        // Lectura y parsea del Body
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        // Rutas del servidor
        this.routes();

    }

    middleware(){
        // CORS
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.user, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    getApp(){
        return this.app;
    }

}

module.exports = Server;