const dbConnection = require('../databaseConnection');
const queries = require('../queries');
const Auth = require('../models/user');


Auth.addUser = function(user, result){
    dbConnection.query(queries.insert_user, user, function(err, res) {
        if(err){
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};

Auth.logUser = function(email, result) {
    dbConnection.query(queries.select_login, email, function(err, res) {
        if(res.length == 0) {
            result(err, null);
        }
        else{
            result(null, JSON.parse(JSON.stringify(res)));
        }
    });
};

module.exports = Auth;