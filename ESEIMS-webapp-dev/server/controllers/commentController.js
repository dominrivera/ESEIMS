var Comment = require('../persistence/commentDAO');
var { validationResult } = require('express-validator');
var commentCtrl = {};

// returns the comments related to a ticket by ticketid
commentCtrl.listCommentsByTicketId = function (req, res) {
    Comment.getCommentsByTicketId(req.params.ticketId, function (err, comments) {
        if (err)
            res.status(404);
        res.json(comments);
    });
};

// create a comment within a ticket
commentCtrl.createComment = function (req, res) {
    // check if validator.js returns errors
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        var list = [];
        errors.errors.forEach(error => {
            list.push(error.param)
        });
        return res.status(422).send(list)
    }
    var comment = new Comment(req.body);
    // return error if there is not message
    if (!comment.message) {
        res.status(400).send({ error: true, message: 'Error creating comment' });
    }
    else {
        // add comment
        comment.created = new Date();
        Comment.addComment(comment, function (err, comment) {
            if (err)
                res.send(err);
            res.json(comment);
        });
    }
};

// remove all the comments related to a given ticketid
commentCtrl.removeCommentsByTicketId = function (req, res) {
    Comment.deleteComments(req.params.ticketId, function (err, comments) {
        if (err)
            res.send(err);
        res.json({ message: 'Comments removed' });
    });
};

module.exports = commentCtrl;