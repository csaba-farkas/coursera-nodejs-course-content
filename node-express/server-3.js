var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

//Handle all requests and call next()
app.all('/dishes', function(req, res, next) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    next();
});

//Get request
app.get('/dishes', function(req, res, next) {
    res.end('We will send all the dishes to you');
});

//Post request
app.post('/dishes', function(req, res, next) {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

//Delete
app.delete('/dishes', function(req, res, next) {
    res.end('Delete all dishes');
});

//Get a particular dish
app.get('/dishes/:dishId', function(req, res, next) {
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you.');
});

//Update a particular dish
app.put('/dishes/:dishId', function(req, res, next) {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

//Delete a particular dish
app.delete('/dishes/:dishId', function(req, res, next) {
    res.end('Deleting dish: ' + req.params.dishId); 
});

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function() {
    console.log('Server is running on ' + hostname + ':' + port + '/');
}); 