import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(import.meta.dirname, '../config.env') });
;
;
const getConfig = () => {
    return {
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        JWT_SECRET: process.env.JWT_SECRET,
        PORT: process.env.PORT,
    };
};
const getSanitizedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);
export default sanitizedConfig;
