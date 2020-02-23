const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

var config = require('./server/config');
var routes = require('./server/routes');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', routes);

// Configure deployment to run angular under node process
app.use(express.static('dist/ESEIMS-webapp'));
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'ESEIMS-webapp', 'index.html'));
});

// Starting server

const server = http.createServer(app);
server.listen(config.port, () => console.log(`Server running on localhost:${config.port}`));
