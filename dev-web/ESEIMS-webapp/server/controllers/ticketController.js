var Ticket = require('../persistence/ticketDAO');
var { validationResult } = require('express-validator');
var ticketCtrl = {};

// returns all the tickets
ticketCtrl.listTickets = function (req, res) {
    Ticket.getTickets(function (err, tickets) {
        if (err)
            res.status(404);
        res.json(tickets);
    });
};

// returns a ticket given an ticketid
ticketCtrl.listTicket = function (req, res) {
    Ticket.getTicket(req.params.id, function (err, ticket) {
        if (err)
            res.status(404);
        res.json(ticket);
    });
};

// returns a ticket given an user id
ticketCtrl.listTicketByUserId = function (req, res) {
    Ticket.getTicketByUserId(req.params.userId, function (err, ticket) {
        if (err)
            res.status(404);
        res.json(ticket);
    });
};

// creates a ticket
ticketCtrl.createTicket = function (req, res) {
    // check if validator.js returns errors
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        var list = [];
        errors.errors.forEach(error => {
            list.push(error.param)
        });
        return res.status(422).send(list)
    }
    var ticket = new Ticket(req.body);
    if (!ticket) {
        res.status(400).send({ error: true, message: 'Error creating ticket' });
    } else {
        // adding custom fields
        ticket.created = new Date();
        ticket.modified = new Date();
        ticket.status = 'open';
        Ticket.addTicket(ticket, function (err, ticket) {
            if (err)
                res.send(err);
            res.json(ticket);
        });
    }
};

// edit ticket by ticketid
ticketCtrl.editTicket = function (req, res) {
    var ticket_edit = new Ticket(req.body);
    ticket_edit.modified = new Date();
    Ticket.updateTicket(req.params.id, ticket_edit, function (err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

// removes ticket by ticketid
ticketCtrl.removeTicket = function (req, res) {
    Ticket.deleteTicket(req.params.id, function (err, ticket) {
        if (err)
            res.send(err);
        res.json({ message: 'Ticket removed' });
    });
};

// validate if the tickets are owned by the user
ticketCtrl.validateTickets = function (req, res) {
    var ticketId = req.query.ticketId;
    Ticket.getTicketByUserId(req.query.userId, function (err, ticket) {
        if (err)
            res.send(err);
        var i = 0;
        if (ticket.length > 0) {
            ticket.forEach(t => {
                if (t.id == ticketId) {
                    i++;
                }
            });
            if (i > 0) {
                res.send(true);
            } else {
                res.send(false);
            }
        }
        else {
            res.send(false)
        }
    });
};

module.exports = ticketCtrl;