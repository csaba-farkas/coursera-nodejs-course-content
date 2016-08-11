var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

//Configure URL
var url = "mongodb://localhost:27017/conFusion";

//Connect to DB on the given URL
mongoose.connect(url);
var db = mongoose.connection;

//Once the connection is established, there is and event coming back and it
//needs to be handled.
//On error, display the error
db.on('error', console.error.bind(console, 'connection error: '));

//On open-connection event, be happy, we are connected
//In the callback function we can specify the persistence operations
db.once('open', function() {
    //we're connected
    console.log("Connected to the server");
    
    //Create a new dish
    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Uthapizza description'
    });
    
    //Save the dish in the db
    //In the callback function: 
    //  1. Throw the error if occurs
    //  2. Log the result on the screen
    newDish.save(function(err) {
        if(err) throw err;
        
        console.log("Dish created");
        
        //Get all the dishes --> we are still in the callback
        Dishes.find({}, function(err, dishes) {
            if(err) throw err;
            
            //Log all dishes found
            console.log(dishes);
            
            //Drop the collection and
            //Close db connection
            db.collection('dishes').drop(function() {
                db.close();
            });
        });
    });
});

