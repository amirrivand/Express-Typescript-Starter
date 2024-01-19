// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        database: process.env.DB_DBNAME,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        database: process.env.DB_DBNAME,
        dialect: 'mysql',
    },
};
