const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var mysqlConnection = mysql.createConnection({
    host: config.db_config.host,
    //port: config.db_config.port,
    user: config.db_config.user,
    password: config.db_config.password,
    database: config.db_config.database
});

mysqlConnection.connect((err)=>{
    if (!err)
    console.log('connection succeded');
    else
    console.log('connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000,()=>console.log("Server is running at port 3000"));


//app.get('/', function (req, res) {
  //  if (!req.session.)
  //})


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

//const server = http.createServer(app);
//server.listen(config.port, () => console.log(`Server running on localhost:${config.port}`));