var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken= function(user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyAdmin = function(req, res, next) {
    //Check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //Decode the token
    if(token) {
        //Verifies secret and check if token is expired
        jwt.verify(token, config.secretKey, function(err, decoded) {
            //If error or user is not admin, return error
            if(err || !req.decoded._doc.admin) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                //everything is ok, save request for use in other routes
                req.decoded = decoded;
                next();
            }
        })
    } else {
        //no token was sent with the request, return an error
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};
