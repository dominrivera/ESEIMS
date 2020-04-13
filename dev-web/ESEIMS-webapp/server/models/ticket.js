var Ticket = function (ticket) {
    this.id = ticket.id;
    this.title = ticket.title;
    this.description = ticket.description;
    this.status = ticket.status;
    this.assignment = ticket.assignment;
    this.creator = ticket.creator;
    this.creatorId = ticket.creatorId;
    this.created = ticket.created;
    this.modified = ticket.modified;
};

module.exports = Ticket;