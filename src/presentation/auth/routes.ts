import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../infrastucture/repositories/auth.repository.impl";
import { AuthDatasourceMongoImpl } from "../../infrastucture/datasources/auth.datasource.mongo.impl";
import { BcryptAdapter, JwtAdapter } from "../../config";


const hash = BcryptAdapter.hash;
const compareHas = BcryptAdapter.compare;

const authDatasourceMongo = new AuthDatasourceMongoImpl(hash, compareHas);
const authRepositoryImpl = new AuthRepositoryImpl(authDatasourceMongo);

const generateJwt = JwtAdapter.generateToken;


export class AuthRoutes{
    static get routes():Router{
        const routes = Router();
        const controller = new AuthController(authRepositoryImpl, generateJwt);


        //* Manejamos las rutas de AUTH
        routes.post('/login-user', controller.loginUser);
        routes.post('/register-user', controller.registerUser);


        return routes;
    }
}