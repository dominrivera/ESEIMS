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
            res.json('user created');
        });
    }
};


authCtrl.loginUser = function (req, res) {
    var userData = new Auth(req.body);
    console.log(userData);
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
                console.log(userData);
                var expiresIn = 24 * 60 * 60;
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
    console.log('token verification');
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized');
    }
    var token = req.headers.authorization.split(' ')[1];
    console.log('tokenL ', token);
    if(token == 'null' | token == 'undefined') {
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