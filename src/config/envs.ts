import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    KEY_SECRET_SRTIPE: get('KEY_SECRET_SRTIPE').required().asString(),
    KEY_HOOK_STRIPE: get('KEY_HOOK_STRIPE').required().asString(),
    MONGO_DB_STORE_DBU_URI: get('MONGO_DB_STORE_DBU_URI').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    MAILER_PASS: get('MAILER_PASS').required().asString(),
    DISCORD_HOOK_MONEY_ALERT: get('DISCORD_HOOK_MONEY_ALERT').required().asString(),
    DISCORD_HOOK_ERROR: get('DISCORD_HOOK_ERROR').required().asString(),
};