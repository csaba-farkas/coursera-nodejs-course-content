module.exports = function(app) {
    var express = require('express');
    var bodyParser = require('body-parser');

    //Express router
    var leaderRouter = express.Router();
    leaderRouter.use(bodyParser.json());

    //Use dishRouter to route to all the resources
    leaderRouter.route('/')
    .all(function(req, res, next) {
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        next(); 
     })
    .get(function(req, res, next) {
        res.end('Will send all the leaders to you');
    })
    .post(function(req, res, next) {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);  
    })
    .delete(function(req, res, next) {
        res.end('Deleting all leaders');
    });

    //Use dishRouter to route to particular resources
    leaderRouter.route('/:leaderId')
    .all(function(req, res, next) {
        res.writeHead(200, {'Content-Type':'text/plain'});
        next();
    })
    .get(function(req, res, next) {
        res.end('Will send details of the leader: ' + req.params.leaderId + ' to you.');
    })
    .put(function(req, res, next) {
        res.write('Updating leader: ' + req.params.leaderId + '\n');
        res.end('New leader: ' + req.body.name + ', details: ' + req.body.description);
    })
    .delete(function(req, res, next) {
        res.end('Deleting leader: ' + req.params.promotionId);
    });
    
    //Give the context to the dishRouter
    app.use('/leaders', leaderRouter); 
}