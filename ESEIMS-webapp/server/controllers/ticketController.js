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

ticketCtrl.createTicket = function (req, res) {
    var ticket = new Ticket(req.body);
    if (!ticket.title) {
        res.status(400).send({ error: true, message: 'Error creating ticket' });
    }
    else {
        ticket.created = new Date();
        ticket.modified = new Date();
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
    Ticket.updateTicket(req.params.id, ticket_edit, function(err, ticket) {
        if(err)
            res.send(err);
        res.json(ticket);
    });
};

ticketCtrl.removeTicket = function (req, res) {
    Ticket.deleteTicket(req.params.id, function(err, ticket) {
        if(err)
            res.send(err);
        res.json({ message: 'Ticket removed' });
    });
};

module.exports = ticketCtrl;