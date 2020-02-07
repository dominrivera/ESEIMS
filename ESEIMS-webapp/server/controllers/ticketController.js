var Ticket = require('../persistence/ticketDAO');
var ticketCtrl = {};

ticketCtrl.listTickets = function (req, res) {
    Ticket.getTickets(function (err, tickets) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', tickets);
        res.send(tickets);
    });
};

ticketCtrl.listTicket = function (req, res) {
    Ticket.getTicket(req.params.id, function (err, ticket) {
        if (err)
            res.send(err);
        console.log('res', ticket)
        res.json(ticket);
    });
};

ticketCtrl.createTicket = function (req, res) {
    var ticket = new Ticket(req.body);
    if (!ticket.short_description) {
        res.status(400).send({ error: true, message: 'Error creating ticket' });
    }
    else {
        Ticket.addTicket(ticket, function (err, ticket) {
            if (err)
                res.send(err);
            console.log('res', ticket)
            res.json(ticket);
        });
    }
};


ticketCtrl.editTicket = function (req, res) {
    var ticket_edit = new Ticket(req.body);
    Ticket.updateTicket(req.params.id, ticket_edit, function(err, ticket) {
        if(err)
            res.send(err);
        console.log('res', ticket);
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