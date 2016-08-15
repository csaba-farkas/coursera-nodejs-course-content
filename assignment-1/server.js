var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//Export router modules
var dishRouter = require('./dishRouter');
var promotionRouter = require('./promotionRouter');
var leadershipRouter = require('./leadershipRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

//Turn on logging with Morgan
app.use(morgan('dev')); 

//Create routers
dishRouter(app);
promotionRouter(app);
leadershipRouter(app);

app.listen(port, hostname, function() {
    console.log('Server listening at http://' + hostname + ':' + port + '/');
})