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
        // password encryption
        var salt = bcrypt.genSaltSync()
        userData.password = bcrypt.hashSync(userData.password, salt);
        // user creation date
        userData.created = new Date();
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
    console.log(userData);
    Auth.logUser(userData.email, function (err, user) {
        if(err) {
          console.log(err);
        } else if(user==null) {
            res.send({message: "error: user not found"});
        } else {
            console.log("checking password");
            var user = user[0];
            var checkPassword = bcrypt.compareSync(userData.password, user.password);
            if (checkPassword) {
                console.log(userData);
                var expiresIn = 24 * 60 * 60;
                var accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});
                var responseData = {
                    //no debemos devolver la password al frontend
                   // password: user.password,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.json(responseData);
            } else {
                res.send({message: "error password"});
            }
        }
    });
};

module.exports = authCtrl;