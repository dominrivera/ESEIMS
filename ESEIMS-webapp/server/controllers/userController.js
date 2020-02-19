var User = require('../persistence/userDAO');
var userCtrl = {};

userCtrl.listUsers = function (req, res) {
    User.getUsers(function (err, users) {
        if (err)
            res.send(err);
        console.log('res', users);
        res.json(users);
    });
};

userCtrl.listUser = function (req, res) {
    User.getUser(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        console.log('res', user)
        res.json(user);
    });
};

userCtrl.editUser = function (req, res) {
    var user_edit = new User(req.body);
    User.updateUser(req.params.id, user_edit, function(err, user) {
        if(err)
            res.send(err);
        console.log('res', user);
        res.json(user);
    });
};

userCtrl.removeUser = function (req, res) {
    User.deleteUser(req.params.id, function(err, user) {
        if(err)
            res.send(err);
        res.json({ message: 'User removed' });
    });
};

module.exports = userCtrl;