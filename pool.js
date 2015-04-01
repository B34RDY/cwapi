var mysql = require('mysql');
var dbConfig = {
    host     : (process.env.DB_HOST || 'localhost'),
    user     : (process.env.DB_USER || 'root'),
    password : (process.env.DB_PASSWORD || '5t&g3c0&ch8u5'),
    database : (process.env.DB_DATABASE || 'annabel'),
    connectionLimit: 50,
    queueLimit: 0,
    waitForConnection: true
};
var pool = mysql.createPool(dbConfig);

module.exports = pool;