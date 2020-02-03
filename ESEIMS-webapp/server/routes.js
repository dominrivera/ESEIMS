const express = require('express');
const router = express.Router();

const user = require('./controllers/userController');
const ticket = require('./controllers/ticketController');

// Routes for User
router.get('/users', user.getUsers);
router.get('/users/:id', user.getUser);
router.post('/users', user.createUser);
router.put('/users/:id', user.editUser);
router.delete('/users/:id', user.deleteUser);


// Routes for Ticket
router.get('/tickets', ticket.getTickets);
router.get('/tickets/:id', ticket.getTicket);
router.post('/tickets', ticket.createTicket);
router.put('/tickets/:id', ticket.editTicket);
router.delete('/tickets/:id', ticket.deleteTicket);


module.exports = router;