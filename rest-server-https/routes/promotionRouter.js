var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');

var INFO = 'INFO: ';

//Express router
var promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());

//Use promotionsRouter to route to all the resources
promotionsRouter.route('/')
.get(function(req, res, next) {
    Promotions.find({}, function(err, promotion) {
        if(err) throw err;
        res.json(promotion);
        console.log(INFO + 'Returned all promotions');
    });
})
.post(function(req, res, next) {
    Promotions.create(req.body, function(err, promotion) {
        if(err) throw err;

        var id = promotion._id;
        res.writeHead(201, {
            'Content-Type':'text/plain'
        });
        res.end(INFO + 'Promotion ' + id + ' was added to the database');
        console.log(INFO + 'Promotion ' + id + ' was added to the database');
    });
})
.delete(function(req, res, next) {
    Promotions.remove({}, function(err, resp) {
        if(err) throw err;
        res.json(resp);
        console.log(INFO + 'All promotions were removed');
    });
});

//Use promotionsRouter to route to particular resources
promotionsRouter.route('/:promotionId')
.get(function(req, res, next) {
    Promotions.find(req.params.promotionId, function(err, promotion) {
        if(err) throw err;

        res.json(promotion);
        console.log(INFO + 'Promotion ' + req.params.promotionId + ' was returned');
    });
})
.put(function(req, res, next) {
    Promotions.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function(err, promotion) {
        if(err) throw err;

        res.json(promotion);
        console.log(INFO + 'Promotion ' + req.params.leaderId + ' was updated');
    });
})
.delete(function(req, res, next) {
    Promotions.findByIdAndRemove(req.params.promotionId, function(err, resp) {
        if(err) throw err;
        res.json(resp);
        console.log(INFO + 'Deleted promotion with id ' + req.params.promotionId);
    });
});


module.exports = promotionsRouter;
