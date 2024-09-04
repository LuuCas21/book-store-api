import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../config.env' )});

interface ENV {
    DATABASE_URL: string | undefined;
    DATABASE_PASSWORD: string | undefined;
    PORT: number | undefined;
};

interface Config {
    DATABASE_URL: string;
    DATABASE_PASSWORD: string;
    PORT: number;
};

const getConfig = (): ENV => {
    return {
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        PORT: process.env.PORT,
    }
};

const getSanitizedConfig = (config: ENV): Config => {
    for(const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }

    return config as Config;
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;