var mysql = require('mysql');
var connection = mysql.createConnection(
    {
        host     : 'localhost',
        user     : 'root',
        password : '5t&g3c0&ch8u5',
        database : 'annabel'
    }
);

module.exports = connection;