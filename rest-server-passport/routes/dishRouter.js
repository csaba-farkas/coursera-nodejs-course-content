var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Require the 'dishes' model from 'models' folder
var Dishes = require('../models/dishes');

var Verify = require('./verify');

var INFO = 'INFO: ';

//Express router
var dishRouter = express.Router();
//Attach body-parser to route, so body parameters are extracted automatically
dishRouter.use(bodyParser.json());

//Use dishRouter to route to all the resources
dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
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
.post(Verify.verifyOrdinaryUser,function(req, res, next) {
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
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
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


//Handling comments
dishRouter.route('/:dishId/comments')
.get(function(req, res, next) {
    Dishes.findById(req.params.dishId, function(err, dish) {
        if(err) throw err;
        res.json(dish.comments);
    });
})
.post(function(req, res, next) {
    Dishes.findById(req.params.dishId, function(err, dish) {
        if(err) throw err;
        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            if(err) throw err;
            console.log(INFO + 'Dish ' + req.params.dishId + ': comment added');
            res.json(dish);
        });
    });
})
.delete(function(req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        console.log(dish);
        console.log('DEBUG: comment id: ' + commentId);
        console.log('DEBUG: comment to remove: ' + dish.comments.id(req.params.commentId));
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = dishRouter;
