var Comment = require('../persistence/commentDAO');
var { validationResult } = require('express-validator');
var commentCtrl = {};

commentCtrl.listCommentsByTicketId = function (req, res) {
    Comment.getCommentsByTicketId(req.params.ticketId, function (err, comments) {
        if (err)
            res.status(404);
        res.json(comments);
    });
};

commentCtrl.createComment = function (req, res) {
    var errors = validationResult(req)
    if(!errors.isEmpty()){
        var list = [];
        errors.errors.forEach(error => {
            list.push(error.param)
        });
        console.log('ASDF: ', list)
        return res.status(422).send(list)
    }
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

commentCtrl.removeCommentsByTicketId = function (req, res) {
    Comment.deleteComments(req.params.ticketId, function (err, comments) {
        if (err)
            res.send(err);
        res.json({ message: 'Comments removed' });
    });
};

module.exports = commentCtrl;