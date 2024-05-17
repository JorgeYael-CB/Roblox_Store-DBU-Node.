import { Router } from "express";
import { ProductController } from "./controller";
import { ProductRepositoryImpl } from "../../infrastucture/repositories/product.repository.impl";
import { ProductDatasourceMongoImpl } from '../../infrastucture/datasources/product.datasource.mongo.impl';
import { AuthRepositoryImpl } from "../../infrastucture/repositories/auth.repository.impl";
import { AuthDatasourceMongoImpl } from "../../infrastucture/datasources/auth.datasource.mongo.impl";
import { BcryptAdapter, DiscordWebhook, JwtAdapter, MailerAdapter, PaymentAdapter, envs } from "../../config";



const productsDataSource = new ProductDatasourceMongoImpl();
const productRepository = new ProductRepositoryImpl(productsDataSource);

const authDatasource = new AuthDatasourceMongoImpl(BcryptAdapter.hash, BcryptAdapter.compare)
const authRepository = new AuthRepositoryImpl(authDatasource);

const paymentAdapter = new PaymentAdapter(envs.KEY_HOOK_STRIPE, envs.KEY_SECRET_SRTIPE);

const validateJwt = JwtAdapter.validateToken;

const discordHook = new DiscordWebhook(envs.DISCORD_HOOK_MONEY_ALERT);

const mailerAdapter = new MailerAdapter({
    mailerEmail: envs.MAILER_EMAIL,
    mailerPass: envs.MAILER_PASS
});


export class ProductRoutes{

    static get routes():Router{
        const router = Router();
        const controller = new ProductController(productRepository, paymentAdapter, authRepository, validateJwt, mailerAdapter, discordHook);

        //* Manejamos las rutas
        router.post('/create-product', controller.createProduct);
        router.get('/sold-product/:jwt', controller.soldProduct);

        router.post('/sold-webhook', controller.hook);

        return router;
    };
}