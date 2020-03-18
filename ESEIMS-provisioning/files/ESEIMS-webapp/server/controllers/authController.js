var Auth = require('../persistence/authDAO');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var SECRET_KEY = 'mysecretkey'; // configure it in config.js
var { validationResult } = require('express-validator');
var authCtrl = {};

// registers a new user
authCtrl.createUser = function (req, res) {
    // check if validator.js returns errors
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        var list = [];
        errors.errors.forEach(error => {
            list.push(error.param)
        });
        return res.status(422).send(list)
    }
    var userData = new Auth(req.body);
    Auth.loginUser(userData.email, function (err, user) {
        if (user) {
            return res.status(422).send('email_exists')
        } else {
            // password encryption
            var salt = bcrypt.genSaltSync()
            userData.password = bcrypt.hashSync(userData.password, salt);
            // user creation date
            userData.created = new Date();
            // assign role user by default
            if (userData.role == undefined) {
                userData.role = 'user';
            }
            Auth.addUser(userData, function (err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        }
    });
};

// user login
authCtrl.loginUser = function (req, res) {
    console.log(req.body)
    // check if validator.js returns errors
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).send('wrong_login')
    }
    var userData = new Auth(req.body);
    // check if exists a registered user with such email
    Auth.loginUser(userData.email, function (err, user) {
        if (err) {
            res.status(401).send('error');
        } else if (user == null) {
            res.status(401).send("error: user not found");
        } else {
            // compare login password with user saved password
            var user = user[0];
            var checkPassword = bcrypt.compareSync(userData.password, user.password);
            // valid password
            if (checkPassword) {
                // Creating access token:
                var expiresIn = Math.floor(Date.now() / 1000) + (60 * 60);
                var accessToken = jwt.sign({ id: user.id, name: user.name, surname: user.surname, role: user.role }, SECRET_KEY, { expiresIn: expiresIn });
                var responseData = {
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.json(responseData);
            } else {
                // invalid password
                res.status(401).send('error');
            }
        }
    });
};

// token verification
authCtrl.verifyToken = function (req, res, next) {
    // if not auth header
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized');
    }
    var token = req.headers.authorization.split(' ')[1];
    // if token null or undefined
    if (token == null | token == undefined) {
        return res.status(401).send('Unauthorized');
    }
    var verification = jwt.verify(token, SECRET_KEY);
    // if token fails verification
    if (!verification) {
        return res.status(401).send('Unauthorized');
    }
    // if token verificated next function will be triggered
    next();
};

module.exports = authCtrl;