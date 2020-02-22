var Ticket = function (ticket) {
    this.id = ticket.id;
    this.title = ticket.title;
    this.status = ticket.status;
    this.assignment = ticket.assignment;
    this.creator = ticket.creator;
    this.created = ticket.created;
    this.modified = ticket.modified;
};

module.exports = Ticket;