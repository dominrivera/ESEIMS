const dbConnection = require('../databaseConnection');
const queries = require('../queries');
const Comment = require('../models/comment');

Comment.getCommentsByTicketId = function (ticketId, result) {
    dbConnection.query(queries.select_comments, ticketId, function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Comment.addComment = function(comment, result){
    dbConnection.query(queries.insert_comments, comment, function(err, res) {
        if(err){
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};

module.exports = Comment;