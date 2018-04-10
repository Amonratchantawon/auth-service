const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var glob = require('glob'),
    path = require('path'),
    cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

glob.sync(path.join(__dirname, '../modules/**/routes/*.js')).forEach(function (file) {
    require(path.resolve(file))(app);
});

module.exports = app;