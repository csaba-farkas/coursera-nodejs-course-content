var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./dishes');

//MongoDB connection
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
    console.log('We are connected to the database server!');

    Dishes.create({
          name: 'Csaba\'s Gulyas',
          image: 'images/gulyas.jpg',
          category: 'main',
          label: 'Hungarian',
          price: '799',
          description: 'Best gulyas ever',
          comments: [
            {
                rating: 5,
                comment: 'Best gulyas I\'ve ever had',
                author: 'Bill Kale'
            },
            {
                rating: 5,
                comment: 'I\'ve been looking for the perfect gulyas for a long time, and I have found it now. Wow...',
                author: 'Gill Aushlo Veer'
            }
          ]
      }, function(err, dish) {
          if(err) throw err;

          //Log message and new dish created
          console.log('Dish created');
          console.log(dish);

          var id = dish._id;

          Dishes.findByIdAndUpdate(id, {
            $set: {
                description: 'Officially the best gulyas ever'
              }
            }, {
                new: true
          })
          .exec(function(err, dish) {
              if(err) throw err;

              console.log('Updated dish');
              console.log(dish);

              //Add new comment to dish
              dish.comments.push(
                {
                    rating: 5,
                    comment: 'Still the best gulyas on Earth',
                    author: 'Steven Strong'
                }
              );

              //Use the save method to add changes to the document
              dish.save(function(err, dish) {
                  if(err) throw err;

                  console.log('Updated dish with comments');
                  console.log(dish);

                  //Drop collection and close connection
                  db.collection('dishes').drop(function() {
                      db.close();
                      console.log('Collection dropped. Connection closed.')
                  });
              });
          });
      });
});
