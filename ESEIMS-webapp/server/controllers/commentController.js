var Comment = require('../persistence/commentDAO');
var commentCtrl = {};

commentCtrl.listCommentsByTicketId = function (req, res) {
    Comment.getCommentsByTicketId(req.params.ticket_id, function (err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
};

commentCtrl.createComment = function (req, res) {
    var comment = new Comment(req.body);
    if (!comment.message) {
        res.status(400).send({ error: true, message: 'Error creating comment' });
    }
    else {
        comment.created = new Date();
        Comment.addComment(comment, function (err, comment) {
            if (err)
                res.send(err);
            res.json(comment);
        });
    }
};

module.exports = commentCtrl;