import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    KEY_SECRET_SRTIPE: get('KEY_SECRET_SRTIPE').required().asString(),
    KEY_HOOK_STRIPE: get('KEY_HOOK_STRIPE').required().asString(),
};