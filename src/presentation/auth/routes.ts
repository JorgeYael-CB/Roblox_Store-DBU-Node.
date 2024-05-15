import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../infrastucture/repositories/auth.repository.impl";
import { AuthDatasourceMongoImpl } from "../../infrastucture/datasources/auth.datasource.mongo.impl";
import { BcryptAdapter, JwtAdapter, MailerAdapter, envs } from "../../config";


const hash = BcryptAdapter.hash;
const compareHas = BcryptAdapter.compare;

const authDatasourceMongo = new AuthDatasourceMongoImpl(hash, compareHas);
const authRepositoryImpl = new AuthRepositoryImpl(authDatasourceMongo);

const generateJwt = JwtAdapter.generateToken;
const validateJWt = JwtAdapter.validateToken;

const mailerService = new MailerAdapter({
    mailerEmail: envs.MAILER_EMAIL,
    mailerPass: envs.MAILER_PASS,
})


export class AuthRoutes{
    static get routes():Router{
        const routes = Router();
        const controller = new AuthController(
            authRepositoryImpl,
            generateJwt,
            mailerService,
            validateJWt,
        );


        //* Manejamos las rutas de AUTH
        routes.post('/login-user', controller.loginUser);
        routes.post('/register-user', controller.registerUser);
        routes.post('/forgot-password', controller.forgotPassowrd);
        routes.post('/reset-password/:jwt', controller.resetPassword);

        routes.get('/get-user-by-jwt/:jwt', controller.getUserByToken);
        routes.get('/verify-user-account/:jwt', controller.verifyUserAccount);


        return routes;
    }
}