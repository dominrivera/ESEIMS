var express = require('express');
var router = express.Router();
var auth = require('./controllers/authController');
var user = require('./controllers/userController');
var ticket = require('./controllers/ticketController');
var comment = require('./controllers/commentController');

router.post('/login', auth.loginUser);
router.post('/register', auth.verifyToken, auth.createUser);

router.get('/users', auth.verifyToken, user.listUsers);
router.get('/users/:id', auth.verifyToken, user.listUser);
router.put('/users/:id', auth.verifyToken, user.editUser);
router.delete('/users/:id', auth.verifyToken, user.removeUser);

router.get('/tickets', auth.verifyToken, ticket.listTickets);
router.get('/tickets/:id', auth.verifyToken, ticket.listTicket);
router.post('/tickets', auth.verifyToken, ticket.createTicket);
router.put('/tickets/:id', auth.verifyToken, ticket.editTicket);
router.delete('/tickets/:id', auth.verifyToken, ticket.removeTicket);

router.get('/comments/:ticket_id', auth.verifyToken, comment.listCommentsByTicketId);
router.post('/comments', auth.verifyToken, comment.createComment);

module.exports = router;