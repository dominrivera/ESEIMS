var Comment = function (comment) {
    this.id = comment.id;
    this.ticket_id = comment.ticket_id;
    this.message = comment.message;
    this.creator = comment.creator;
    this.created = comment.created;
};

module.exports = Comment;