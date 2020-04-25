const mysql = require('mysql');
var config = require('./config');

var mysqlConnection = mysql.createPool({
    host: config.db_config.host,
    port: config.db_config.port,
    user: config.db_config.user,
    password: config.db_config.password,
    database: config.db_config.database
});

mysqlConnection.getConnection(function(err) {
    if (err) throw err;
});

module.exports = mysqlConnection;
