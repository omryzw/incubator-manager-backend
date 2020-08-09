require('dotenv').config();
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    misc = require('./routes/misc'),
    fxns = require('./routes/fxns'),
    mysql = require('mysql'),
    path = require('path');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};


var app = express();
app.use(cors(corsOptions));

connection = require('./database');
global.db = connection;
global.jwt = require('jsonwebtoken');
global.serverJWT_Secret = 'rfsvwoDtdjcx=-)popoloXJJEEJ-';
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/addproject',fxns.addProject);
app.post('/addrecord',fxns.addRecord);
app.post('/addhatch', fxns.addRecord);
app.get('/getactive',fxns.getActive);
app.get('/hatching',fxns.getHatching);
app.get('/getex',fxns.getExpiredButNotClosed);
app.get('/hatched',fxns.getExpiredButNotClosed);
app.post('/singleproject',fxns.getSingleProject);
app.get('/history', fxns.history);
app.get('/getoverall', fxns.overallSuccess);




const port = process.env.PORT || 1337;
app.listen(port);
