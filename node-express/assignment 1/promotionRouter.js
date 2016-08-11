module.exports = function(app) {
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
        res.end('Will send all the promotions to you');
    })
    .post(function(req, res, next) {
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);  
    })
    .delete(function(req, res, next) {
        res.end('Deleting all promotions');
    });

    //Use dishRouter to route to particular resources
    dishRouter.route('/:promotionId')
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
    
    //Give the context to the dishRouter
    app.use('/promotions', dishRouter); 
}