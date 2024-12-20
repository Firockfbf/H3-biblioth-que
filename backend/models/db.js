const mysql = require('mysql2/promise');
const dbConfig = require('../config/config.js/config');

const db = mysql.createPool(dbConfig);

module.exports = db;
