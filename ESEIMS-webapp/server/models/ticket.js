var Ticket = function (ticket) {
    this.id = ticket.id;
    this.short_description = ticket.short_description;
    this.description = ticket.description;
    this.status = ticket.status;
    this.assignment = ticket.assignment;
    this.created = ticket.created;
    this.modified = ticket.modified;
};

module.exports = Ticket;