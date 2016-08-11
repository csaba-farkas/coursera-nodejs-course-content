var express = require('express');
var bodyParser = require('body-parser');

//Express router
var promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());

//Use promotionsRouter to route to all the resources
promotionsRouter.route('/')
.all(function(req, res, next) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    next(); 
 })
.get(function(req, res, next) {
    res.end('Will send all the promotions to you');
})
.post(function(req, res, next) {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);  
})
.delete(function(req, res, next) {
    res.end('Deleting all promotions');
});

//Use promotionsRouter to route to particular resources
promotionsRouter.route('/:promotionId')
.all(function(req, res, next) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    next();
})
.get(function(req, res, next) {
    res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you.');
})
.put(function(req, res, next) {
    res.write('Updating promotion: ' + req.params.promotionId + '\n');
    res.end('New promotion: ' + req.body.name + ', details: ' + req.body.description);
})
.delete(function(req, res, next) {
    res.end('Deleting promotion: ' + req.params.promotionId);
}); 

module.exports = promotionsRouter;