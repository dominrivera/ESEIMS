var Auth = require('../persistence/authDAO');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var SECRET_KEY = 'mysecretkey'; // configure it in config.js
var authCtrl = {};
const { validationResult } = require('express-validator');

authCtrl.createUser = function (req, res) {
    var errors = validationResult(req)
    if(!errors.isEmpty()){
        var list = [];
        errors.errors.forEach(error => {
            list.push(error.param)
        });
        console.log('ASDF: ', list)
        return res.status(422).send(list)
    }
    var userData = new Auth(req.body);
    Auth.loginUser(userData.email, function (err, user) {
        if(user) {
            console.log('email exists')
            return res.send('email already exists')
        } else {
        // password encryption
        var salt = bcrypt.genSaltSync()
        userData.password = bcrypt.hashSync(userData.password, salt);
        // user creation date
        userData.created = new Date();
        // assign role user
        if (userData.role==undefined) {
            userData.role='user';
        }
        Auth.addUser(userData, function (err, user) {
            if (err)
                res.send(err);
            res.json('user created');
        });
    }
    });
};


authCtrl.loginUser = function (req, res) {
    var userData = new Auth(req.body);
    Auth.loginUser(userData.email, function (err, user) {
        if(err) {
          console.log(err);
        } else if(user==null) {
            res.status(401).send("error: user not found");
        } else {
            console.log("checking password");
            var user = user[0];
            var checkPassword = bcrypt.compareSync(userData.password, user.password);
            if (checkPassword) {
                // Signing a token with 1 hour of expiration:
                var expiresIn = Math.floor(Date.now() / 1000) + (60 * 60);
                var accessToken = jwt.sign({id: user.id, name: user.name, surname: user.surname, role: user.role}, SECRET_KEY, {expiresIn: expiresIn});
                var responseData = {
                    //no debemos devolver la password al frontend
                   // password: user.password,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.json(responseData);
            } else {
                res.status(401).send('error');
            }
        }
    });
};

authCtrl.verifyToken = function (req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized');
    }
    var token = req.headers.authorization.split(' ')[1];
    console.log('tokenL ', token);
    if(token == null | token == undefined) {
        return res.status(401).send('Unauthorized');
    }
    var verification = jwt.verify(token, SECRET_KEY);
    if(!verification) {
        return res.status(401).send('Unauthorized');
    }
    console.log('id ', verification);
    //req.user.id = verification.id;
    next();
};

module.exports = authCtrl;