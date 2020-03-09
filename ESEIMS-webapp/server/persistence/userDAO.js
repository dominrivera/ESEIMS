const dbConnection = require('../databaseConnection');
const queries = require('../queries');
const User = require('../models/user');

User.getUsers = function (result) {
    dbConnection.query(queries.select_users, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

User.getUser = function (id, result) {
    dbConnection.query(queries.select_user, id, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            delete res[0].password;
            result(null, res);
        }
    });
};

User.updateUser = function (id, user, result) {
    if (user.password) {
        dbConnection.query(queries.update_user, [user.name, user.surname, user.dni, user.password, user.email, user.role, id], function (err, res) {
            if (err) {
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    } else {
        dbConnection.query(queries.update_user_no_pass, [user.name, user.surname, user.dni, user.email, user.role, id], function (err, res) {
            if (err) {
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
};

User.deleteUser = function (id, result) {
    dbConnection.query(queries.delete_user, [id], function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = User;