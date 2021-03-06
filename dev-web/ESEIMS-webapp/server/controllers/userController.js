var User = require('../persistence/userDAO');
var Auth = require('../persistence/authDAO');
var bcrypt = require('bcryptjs');
var { validationResult } = require('express-validator');
var userCtrl = {};

// returns all the users
userCtrl.listUsers = function (req, res) {
    User.getUsers(function (err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

// returns the user given an id
userCtrl.listUser = function (req, res) {
    User.getUser(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

// returns the user given a dni
userCtrl.listUserByDNI = function (req, res) {
    var dni = req.params.dni;
    var n = dni.length;
    if (n != 9) {
        return res.status(422).send('error');
    } else {
        User.getUserByDNI(req.params.dni, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    }
};

// edits the user given an id
userCtrl.editUser = function (req, res) {
    // check if validator.js returns errors
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        var list = [];
        errors.errors.forEach(error => {
            list.push(error.param)
        });
        return res.status(422).send(list)
    }
    var user_edit = new User(req.body);
    Auth.loginUser(user_edit.email, function (err, user) {
        if (user) {
            // if user tries to save the same email it has, he can do it,
            // but if user tries to save same email as the email of user with different dni we send email exists
            if ((user[0].dni != user_edit.dni) && (user[0].email == user_edit.email)) {
                return res.status(422).send('email_exists')
            } else {
                // if we receive a password we encrypt and update it
                if (user_edit.password) {
                    var salt = bcrypt.genSaltSync()
                    user_edit.password = bcrypt.hashSync(user_edit.password, salt);
                }
                User.updateUser(req.params.id, user_edit, function (err, user) {
                    if (err) {
                        return res.send(err);
                    } else {
                        return res.json(user);
                    }
                });
            }
        }
    });
};

// removes the user given an id
userCtrl.removeUser = function (req, res) {
    User.deleteUser(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User removed' });
    });
};

module.exports = userCtrl;
