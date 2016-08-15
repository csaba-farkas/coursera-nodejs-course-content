var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Require the 'dishes' model from 'models' folder
var Dishes = require('../models/dishes');

var INFO = 'INFO: ';

//Express router
var dishRouter = express.Router();
//Attach body-parser to route, so body parameters are extracted automatically
dishRouter.use(bodyParser.json());

//Use dishRouter to route to all the resources
dishRouter.route('/')
.get(function(req, res, next) {
    //First param: empty set functions as a filter --> return ALL dishes
    //Second param: callback function which throws the error or attach 'dishes' to the response as json
    //Content-Type is set automatically
    //HTTP code 200 will be set automatically
    Dishes.find({}, function(err, dish) {
        if(err) throw err;
        res.json(dish);
        console.log(INFO + 'Dishes retured');
    });
})
.post(function(req, res, next) {
    Dishes.create(req.body, function(err, dish) {
        if(err) throw err;

        console.log('Dish created');
        var id = dish._id;
        //Set HTTP code to 201 - created
        //Content-Type is set to text
        //A message is attached to response with new dish's id
        res.writeHead(201, {
            'Content-Type':'text/plain'
        });
        res.end('Added the dish with id: ' + id);
        console.log(INFO + 'Dishes created with id ' + id);
    });
})
.delete(function(req, res, next) {
    //This removes all the dishes because filter is an empty set
    //Callback function has two parameters:
    //  1. Error -> throw it if exist
    //  2. Response -> a js object which is being returned by the server
    Dishes.remove({}, function(err, resp) {
        if(err) throw err;
        res.json(resp);
        console.log(INFO + 'All dishes removed');
    });
});

//Use dishRouter to route to particular resources
dishRouter.route('/:dishId')
.get(function(req, res, next) {
    //Use the findById method to get a particular dish by its id
    //Use request.params.dishId
    //Return dish if found, if not throw error
    Dishes.findById(req.params.dishId, function(err, dish) {
        if(err) throw err;
        res.json(dish);
        console.log(INFO + 'Dish ' + req.params.dishId + ' is returned');
    });
})
.put(function(req, res, next) {
    //Find the dish by its id and
    //Use the $set to update the
    //Parameters that are sent int the body of the request
    //Grab the updated dish object by 'new: true',
    //Attach dish object as json to response
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function(err, dish) {
        if(err) throw err;
        res.json(dish);
        console.log(INFO + 'Dish ' + req.params.dishId + ' is updated');
    });
})
.delete(function(req, res, next) {
    //Use the findByIdAndRemove function
    //Supply the id of the dish
    //Callback functio returns the response or throws an error
    Dishes.findByIdAndRemove(req.params.dishId, function(err, resp) {
        if(err) throw err;
        res.json(resp);
        console.log(INFO + 'Dish ' + req.params.dishId + ' is removed');
    });
});

module.exports = dishRouter;
