var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');


/* GET users listing. */
router.get('/', Verify.verifyAdmin, function(req, res, next) {
    //Task 3 in assignment: only admin users can retreive information about users
    User.find({}, function(err, users) {
        if(err) {
            res.json(err);
        } else {
            res.json(users);
            console.log("INFO: " + 'Users retured');
        }
    });
});

router.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}),
    req.body.password, function(err, user) {
        if(err) {
            return res.status(500).json({err: err});
        }

        passport.authenticate('local')(req, res, function() {
            return res.status(200).json({status: 'Registration successful'});
        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            return next(err);
        }

        if(!user) {
            return res.status(401).json({
                err: info
            });
        }

        req.logIn(user, function(err) {
            if(err) {
                return res.status(500).json({
                    err: 'Could not login user'
                });
            }

            console.log('User in users: ', user);

            var token = Verify.getToken(user);

            res.status(200).json({
                status: 'Login Successful',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye'
    });
});
module.exports = router;
