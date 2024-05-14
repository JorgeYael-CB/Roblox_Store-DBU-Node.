import { Router } from "express";
import { AuthRoutes } from "./auth/routes";



export class Routes{
    static get routes():Router{
        const routes = Router();


        //* Manejamos las rutas principales
        routes.use('/api/auth', AuthRoutes.routes);


        return routes;
    }
}