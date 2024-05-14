import express, { Router } from 'express';
import cors from 'cors';


interface Props{
    routes: Router;
    port: number;
};


export class Server{

    private readonly app = express();
    private readonly routes: Router;
    private readonly port: number;

    // DI
    constructor(config: Props){
        const {port, routes} = config;

        this.routes = routes;
        this.port = port;

        this.config();
    };


    private config = () => {
        //* Middlewares
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: true}) );

        this.app.use( this.routes );
    };

    start = () => {
        this.app.listen( this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    };

};