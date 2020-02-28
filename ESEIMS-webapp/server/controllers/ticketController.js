var Ticket = require('../persistence/ticketDAO');
var ticketCtrl = {};

ticketCtrl.listTickets = function (req, res) {
    Ticket.getTickets(function (err, tickets) {
        if (err)
            res.send(err);
        res.json(tickets);
    });
};

ticketCtrl.listTicket = function (req, res) {
    Ticket.getTicket(req.params.id, function (err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

ticketCtrl.listTicketByUserId = function (req, res) {
    Ticket.getTicketByUserId(req.params.userId, function (err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

ticketCtrl.createTicket = function (req, res) {
    var ticket = new Ticket(req.body);
    if (!ticket.title) {
        res.status(400).send({ error: true, message: 'Error creating ticket' });
    }
    else {
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

ticketCtrl.editTicket = function (req, res) {
    var ticket_edit = new Ticket(req.body);
    ticket_edit.modified = new Date();
    Ticket.updateTicket(req.params.id, ticket_edit, function (err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

ticketCtrl.removeTicket = function (req, res) {
    Ticket.deleteTicket(req.params.id, function (err, ticket) {
        if (err)
            res.send(err);
        res.json({ message: 'Ticket removed' });
    });
};

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