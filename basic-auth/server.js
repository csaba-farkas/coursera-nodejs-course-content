var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');


var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

//Use cookie-parser as a middleware - give secret key as a parameter
app.use(cookieParser('12345-67890-09876-54321'));

function auth (req, res, next) {
    console.log(req.headers);

    //Check if request does not contain a 'user' value of the signed cookie.
    if(!req.signedCookies.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            //If authenticated, create a 'user' value in the signed cookie and sign it with the secret key
            //Parameters are as follows: res.cookie(name, value, options)
            res.cookie('user', 'admin', {signed: true});
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    } else {
        //If the cookie in the request's header contains user value, check the username
        if(req.signedCookies.user === 'admin') {
            console.log(req.signedCookies);
            next();
        } else {
            //Validation failed, username is not 'admin'
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
}

app.use(auth);

app.use(express.static(__dirname + '/public'));
app.use(function(err,req,res,next) {
            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
