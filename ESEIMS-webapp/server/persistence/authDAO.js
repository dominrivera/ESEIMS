const dbConnection = require('../databaseConnection');
const queries = require('../queries');
const Auth = require('../models/user');


Auth.addUser = function(user, result){
    dbConnection.query(queries.insert_user, user, function(err, res) {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Auth.logUser = function(email, result) {
    console.log(email);
    dbConnection.query(queries.select_login, email, function(err, res) {
        if(res.length == 0) {
            console.log("error: ");
            result(err, null);
        }
        else{
            console.log('resdao: ', res);
            result(null, JSON.parse(JSON.stringify(res)));
        }
    });
};

module.exports = Auth;