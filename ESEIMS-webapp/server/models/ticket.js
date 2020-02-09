var Ticket = function (ticket) {
    this.id = ticket.id;
    this.short_description = ticket.short_description;
    this.description = ticket.description;
    this.comment = ticket.comment;
    this.status = ticket.status;
    this.assignment = ticket.assignment;
    this.creator = ticket.creator;
    this.created = ticket.created;
    this.modified = ticket.modified;
};

module.exports = Ticket;