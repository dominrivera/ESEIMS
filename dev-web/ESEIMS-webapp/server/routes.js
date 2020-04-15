var express = require('express');
var router = express.Router();
var auth = require('./controllers/authController');
var user = require('./controllers/userController');
var ticket = require('./controllers/ticketController');
var comment = require('./controllers/commentController');
var alarm = require('./controllers/alarmController');
var validator = require('./middlewares/validator');

router.post('/login', validator.checkDataLogin, auth.loginUser);
router.post('/register', validator.checkDataRegister, auth.createUser);

router.get('/users', auth.verifyToken, user.listUsers);
router.get('/users/:id', auth.verifyToken, user.listUser);
router.get('/user/:dni', auth.verifyToken, user.listUserByDNI);
router.put('/users/:id', auth.verifyToken, validator.checkUserData, user.editUser);
router.delete('/users/:id', auth.verifyToken, user.removeUser);

router.get('/tickets', auth.verifyToken, ticket.listTickets);
router.get('/ticketValidation', auth.verifyToken, ticket.validateTickets);
router.get('/tickets/:id', auth.verifyToken, ticket.listTicket);
router.get('/tickets-userId/:userId', auth.verifyToken, ticket.listTicketByUserId)
router.post('/tickets', auth.verifyToken, validator.checkTicket, ticket.createTicket);
router.put('/tickets/:id', auth.verifyToken, ticket.editTicket);
router.delete('/tickets/:id', auth.verifyToken, ticket.removeTicket);

router.get('/comments/:ticketId', auth.verifyToken, comment.listCommentsByTicketId);
router.post('/comments', auth.verifyToken, validator.checkComment, comment.createComment);
router.delete('/comments/:ticketId', auth.verifyToken, comment.removeCommentsByTicketId);

router.get('/alarms', auth.verifyToken, alarm.listAlarms);
router.post('/alarms', alarm.saveAlarm); // do not verify token otherwise kapacitor cannot post
router.put('/alarms/:id', auth.verifyToken, alarm.editAlarm);
router.delete('/alarms/:id', auth.verifyToken, alarm.removeAlarm);

module.exports = router;
