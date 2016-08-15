var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-3');

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

    //create new dish
    Dishes.create({
        name: 'Uthapizza2',
        description: 'Some description',
        //Add comments
        comments: [
            {
                rating: 3,
                comment: 'This is awesome',
                author: 'Not your business'
            }
        ]
    }, function(err, dish) {
        console.log(err);
        if(err) throw err;

        //Display success message and then the dish itself
        console.log('Dish created!');
        console.log(dish);
        //Grab the id of the newly created dish to use it for the next operations
        var id = dish._id;

        //Get all the dishes (DELAYED!! --> to show the difference between 'created-at' and 'updated-at')
        setTimeout(function() {
            //Find the dish we inserted and update it using the following function 'findByIdAndUpdate(id, callbackFunction)'
            Dishes.findByIdAndUpdate(id, {
                    //$set contains the field names and values that are to be updated.
                    $set: {
                        description: 'Updated Test',
                        
                    }
                }, {
                    //When we call the 'findByIdAndUpdate' we can ask the function to return
                    //the updated dish be specifying 'new: true', if this is not set, the old value is returned
                    new: true
                })
                //Execute the operation with .exec(callbackFunction)
                .exec(function (err, dish) {
                    if (err) throw err;

                    //Log the updated dish
                    console.log('Updated Dish!');
                    console.log(dish);

                    //This is how we add a new comment to the dish while updating --> using the 'push' method of mongoose
                    dish.comments.push({
                      rating: 5,
                      comment: "This is even more awesome",
                      author: "Still not your business"
                    });

                    //Use the 'save' function to add the comments to the document
                    dish.save(function (err, dish) {
                      if(err) throw err;
                      console.log('Added new comment to dish');
                      console.log(dish);

                      //Drop dishes collection and close connection
                      db.collection('dishes').drop(function () {
                          db.close();
                      });
                    });
                });
        }, 3000);
    });
});
