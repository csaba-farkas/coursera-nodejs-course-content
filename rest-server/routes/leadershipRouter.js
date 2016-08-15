var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Require the leadership model from 'models' folder
var Leaders = require('../models/leadershipRouter');


//Express router
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

//Use leaderRouter to route to all the resources
leaderRouter.route('/')
.get(function(req, res, next) {
    //Find all leaders and return them
    Leaders.find({}, function(err, leader) {
        if(err) throw err;
        res.json(leader);
    });
})
.post(function(req, res, next) {
    //Use parameters sent in request body to create the new leader
    //Return success message with new leader's id to the client
    Leaders.create(req.body, function(err, leader) {
        if(err) throw err;
        var id = leader._id;

        console.log('Leader created');
        res.writeHead(201, {
            'Content-Type':'text/plain'
        });
        console.log('Added the leader with id: ' + id);
    });
})
.delete(function(req, res, next) {
    //Remove all dishes and return response
    Leaders.remove({}, function(err, resp) {
        if(err) throw err;
        res.json(resp);
    });
});

//Use leaderRouter to route to particular resources
leaderRouter.route('/:leaderId')
.get(function(req, res, next) {
    //Get the leader with the id sent in the body of request
    Dishes.findById(req.params.leaderId, function(err, leader) {
        if(err) throw err;
        res.json(leader);
    });
})
.put(function(req, res, next) {
    //Update the leader with leaderId with the params sent in body
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function(err, leader) {
        if(err) throw err;
        res.json(leader);
    });
})
.delete(function(req, res, next) {
    //Delete the leader with leaderId and send back response object in callback
    Leaders.findByIdAndRemove(req.params.leaderId, function(err, resp) {
        if(err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter
