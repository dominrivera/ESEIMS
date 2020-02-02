const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');

var mysqlConnection = require('./databaseConnection');
var config = require('./config');
var app = express();
/*var session = require('express-session');
var Filestore = require('session-file-store')(session);

session = session({
    store: new Filestore,
    resave: false,
    secret: 'anysecret',
    saveUninitialized: false,
    unset: 'destroy'
});


app.use(session);*/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', require('./routes'));


app.get('/', function (req, res) {
    res.send('Hello world');
})


/*********************** ROUTES **********************/

// Get list of users
app.get('/users',(req,res)=>{
    mysqlConnection.query('SELECT * FROM users',(err, data, fields)=>{
        if(!err)
        res.send(data);
        else
        console.log(err);
    });
});


// Get user
app.get('/users/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, data, fields)=>{
        if(!err)
        res.send(data);
        else
        console.log(err);
    });
});


// Delete user
app.delete('/users/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, data, fields)=>{
        if(!err)
        res.send('User deleted');
        else
        console.log(err);
    });
});


// Get list of tickets
app.get('/tickets',(req,res)=>{
    mysqlConnection.query('SELECT * FROM tickets',(err, data, fields)=>{
        if(!err)
        res.send(data);
        else
        console.log(err);
    });
});


// Get ticket
app.get('/tickets/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM tickets WHERE id = ?', [req.params.id], (err, data, fields)=>{
        if(!err)
        res.send(data);
        else
        console.log(err);
    });
});


// Starting server

const server = http.createServer(app);
server.listen(config.port, () => console.log(`Server running on localhost:${config.port}`));