const mysql = require('mysql');
var config = require('./config');

var mysqlConnection = mysql.createConnection({
    host: config.db_config.host,
    //port: config.db_config.port,
    user: config.db_config.user,
    password: config.db_config.password,
    database: config.db_config.database
});

mysqlConnection.connect((err)=>{
    if (!err)
    console.log('connection succeded');
    else
    console.log('connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;