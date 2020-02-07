var Ticket = require('../persistence/ticketDao');
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
    if (!ticket.id) {
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

// TO DO
/*
ticketCtrl.editTicket = function (req, res) {
    Ticket.updateTicket(req.params.id, new Ticket(req.body), function(err, ticket) {
        if(err)
            res.send(err);
        console.log('res', ticket);
        res.json(ticket);
    });
};
*/

ticketCtrl.removeTicket = function (req, res) {
    Ticket.deleteTicket(req.params.id, function(err, ticket) {
        if(err)
            res.send(err);
        res.json({ message: 'Ticket removed' });
    });
};

module.exports = ticketCtrl;