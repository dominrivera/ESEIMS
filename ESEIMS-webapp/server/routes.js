var express = require('express');
var router = express.Router();
var user = require('./controllers/userController');

router.get('/users', user.listUsers);
router.get('/users/:id', user.listUser);
router.post('/users', user.createUser);
//router.put('/users/:id', user.editUser);
router.delete('/users/:id', user.removeUser);

module.exports = router;