// backend/config.js
require('dotenv').config();

const config = {
    development: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_DATABASE || 'mydb'
    },
    production: {
        host: process.env.DB_HOST || 'prod-db-host',
        user: process.env.DB_USER || 'prod-user',
        password: process.env.DB_PASSWORD || 'prod-password',
        database: process.env.DB_DATABASE || 'mydb_prod'
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
