import express from 'express';
import cors from 'cors';
import { Request, Response} from 'express';
import * as socketio from 'socket.io';
import { createServer, Server as ServerHttp } from 'http';
import path from 'path';

import Sockets from './sockets'

export default class Server {
    app: express.Application;
    port: string;
    paths: any;
    server: ServerHttp;
    io: socketio.Server;
    sockets: Sockets;

    constructor() {

        this.app  = express();
        this.port = process.env.PORT || '8080';
        this.server = createServer(this.app);
        this.io = new socketio.Server(this.server);
        this.sockets = new Sockets( this.io );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

    }

    routes() {
        
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        this.routes();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}