var express = require('express');
var bodyParser = require('body-parser');

//Express router
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

//Use dishRouter to route to all the resources
dishRouter.route('/')
.all(function(req, res, next) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    next(); 
 })
.get(function(req, res, next) {
    res.end('Will send all the dishes to you');
})
.post(function(req, res, next) {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);  
})
.delete(function(req, res, next) {
    res.end('Deleting all dishes');
});

//Use dishRouter to route to particular resources
dishRouter.route('/:dishId')
.all(function(req, res, next) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    next();
})
.get(function(req, res, next) {
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you.');
})
.put(function(req, res, next) {
    res.write('Updating dish: ' + req.params.dishId + '\n');
    res.end('New dish: ' + req.body.name + ', details: ' + req.body.description);
})
.delete(function(req, res, next) {
    res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = dishRouter;
