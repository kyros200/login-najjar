const activeDbConfiguration = require('./config');
const knex = require('knex')

const K = knex({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_BASE
    }
})

module.exports = K;
