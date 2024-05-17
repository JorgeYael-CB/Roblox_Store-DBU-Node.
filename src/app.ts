import { DiscordWebhook, envs } from "./config";
import { MongoDb } from "./data/mongo/db";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";

(()=>{
    main();
})();


function main() {
    //* Coneccion a la base de datos
    new MongoDb(envs.MONGO_DB_STORE_DBU_URI)
        .connect();


    const routes = Routes.routes;
    const server = new Server({
        port: envs.PORT,
        routes,
    });

    server.start();
};