//const express = require('express');
//const router = express.Router();

//const user = require('./controllers/userController');
//const ticket = require('./controllers/ticketController');

// Routes for User
//router.get('/users', user.getUsers);
/*router.get('/users/:id', user.getUser);
router.post('/users', user.createUser);
router.put('/users/:id', user.editUser);
router.delete('/users/:id', user.deleteUser);


// Routes for Ticket
router.get('/tickets', ticket.getTickets);
router.get('/tickets/:id', ticket.getTicket);
router.post('/tickets', ticket.createTicket);
router.put('/tickets/:id', ticket.editTicket);
router.delete('/tickets/:id', ticket.deleteTicket);
*/

//module.exports = router;

const mysqlConnection = require('../databaseConnection');
module.exports = app => {

    // Get list of users
    app.get('/users', (req, res) => {
        mysqlConnection.query('SELECT * FROM users', (err, data) => {
            if (!err)
                res.send(data);
            else
                console.log(err);
        });
    });

    // Get user
    app.get('/users/:id', (req, res) => {
        mysqlConnection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, data) => {
            if (!err)
                res.send(data);
            else
                console.log(err);
        });
    });


    // Delete user
    app.delete('/users/:id', (req, res) => {
        mysqlConnection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, data) => {
            if (!err)
                res.send('User deleted');
            else
                console.log(err);
        });
    });

}