var express = require('express');
var router = express.Router();
var auth = require('./controllers/authController');
var user = require('./controllers/userController');
var ticket = require('./controllers/ticketController');

router.post('/register', auth.createUser);
router.post('/login', auth.loginUser);

router.get('/users', user.listUsers);
//router.get('/users/:id', user.listUser);
router.put('/users/:id', user.editUser);
router.delete('/users/:id', user.removeUser);

router.get('/tickets', ticket.listTickets);
router.get('/tickets/:id', ticket.listTicket);
router.post('/tickets', ticket.createTicket);
router.put('/tickets/:id', ticket.editTicket);
router.delete('/tickets/:id', ticket.removeTicket);

module.exports = router;