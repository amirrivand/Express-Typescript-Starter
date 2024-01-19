declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            SESSION_SECRET: string;
            COOKIE_SECRET: string;
            ADMIN_JWT_SECRET: string;
            CLIENT_JWT_SECRET: string;

            PORT: number;

            ORIGINS: string;
            ALLOW_CREDENTIALS: boolean;

            DB_HOST: string;
            DB_PORT: number;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_DBNAME: string;

            CDN_DOMAIN: string;
            DOMAIN: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
