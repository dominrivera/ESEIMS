const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const app = express();

var config = require('./config');
var routes = require('./routes');
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
app.use('/api', routes);

//app.get('/', function (req, res) {
//    res.send('Hello world');
//})

// Starting server

const server = http.createServer(app);
server.listen(config.port, () => console.log(`Server running on localhost:${config.port}`));