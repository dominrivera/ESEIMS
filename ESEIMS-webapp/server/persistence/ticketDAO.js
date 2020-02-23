const dbConnection = require('../databaseConnection');
const queries = require('../queries');
const Ticket = require('../models/ticket');

Ticket.getTickets = function (result) {
    dbConnection.query(queries.select_tickets, function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Ticket.getTicket = function(id, result) {
    dbConnection.query(queries.select_ticket, id, function(err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Ticket.getTicketByUserId = function(userId, result) {
    dbConnection.query(queries.select_ticket_by_creatorId, userId, function(err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Ticket.addTicket = function(ticket, result){
    dbConnection.query(queries.insert_ticket, ticket, function(err, res) {
        if(err){
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};

Ticket.updateTicket = function(id, ticket, result){
    dbConnection.query(queries.update_ticket, [ticket.status, ticket.assignment, ticket.modified, id], function(err, res) {
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Ticket.deleteTicket = function(id, result){
    dbConnection.query(queries.delete_ticket, [id], function(err, res) {
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Ticket;