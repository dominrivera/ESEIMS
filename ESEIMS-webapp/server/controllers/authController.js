var Auth = require('../persistence/authDAO');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var SECRET_KEY = 'mysecretkey'; // configure it in config.js
var authCtrl = {};

authCtrl.createUser = function (req, res) {
    var userData = new Auth(req.body);
    
    if (!userData.email) {
        res.status(400).send({ error: true, message: 'Error creating user' });
    }
    else {
        var salt = bcrypt.genSaltSync()
        userData.password = bcrypt.hashSync(userData.password, salt);
        Auth.addUser(userData, function (err, user) {
            if (err)
                res.send(err);
            var expiresIn = 24 * 60 * 60;
            var accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {expiresIn: expiresIn });
            var responseData = {
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            res.json(responseData);
        });
    }
};


authCtrl.loginUser = function (req, res) {
    var userData = new Auth(req.body);
    Auth.logUser(userData.email, function (err, user) {
        var user = user[0];
     //   if (err)
       //     console.log('err 1');
         //   res.status(409).send({message: "error"});
        if(!user) {
            console.log('err 2');
            res.status(409).send({message: "error"});
        } else {
            var checkPassword = bcrypt.compareSync(userData.password, user.password);
            if (checkPassword) {
                console.log(userData);
                var expiresIn = 24 * 60 * 60;
                var accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});
                var responseData = {
                    password: user.password,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.json(responseData);
            } else {
                console.log('err 3');
                //res.status(409).send({message: "error"});
            }
        }
    });
};

module.exports = authCtrl;