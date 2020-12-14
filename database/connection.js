const mysql = require('mysql2/promise');
const activeDbConfiguration = require('./config');

const connection = mysql.createPool(activeDbConfiguration);

module.exports = connection;
