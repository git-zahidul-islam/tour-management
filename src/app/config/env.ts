import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "productions" | "development",
};

const loadEnvVariable = () : EnvConfig => {
    const requareEnvVariable = ["PORT", "DB_URL", "NODE_ENV"];

    requareEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missign requare environment variable ${key}`);
        };
    });

    return {
        PORT: process.env.PORT!,
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "productions" | "development",
    };

};

export const envVars = loadEnvVariable();