var Comment = function (comment) {
    this.id = comment.id;
    this.ticketId = comment.ticketId;
    this.message = comment.message;
    this.creator = comment.creator;
    this.created = comment.created;
};

module.exports = Comment;