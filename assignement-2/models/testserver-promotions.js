var mongoose = require('mongoose');
var assert = require('assert');

var Promotions = require('./promotions.js');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
    console.log('We are in boss');

    /*
    {
          "name": "Weekend Grand Buffet",
          "image": "images/buffet.png",
          "label": "New",
          "price": "19.99",
          "description": "Featuring . . ."
    }
    */
    Promotions.create({
        name: "Early bird dinner",
        image: "images/early-bird.jpg",
        price: "$20",
        description: "3 course meal before 6pm"
    }, function(err, promotion) {
        if(err) throw err;

        //Log promotion
        console.log('Promotion created');
        console.log(promotion);

        var id = promotion._id;
        console.log('Id of promotion is saved: ' + id);

        Promotions.findByIdAndUpdate(id, {
            $set: {
                label: "permanent"
            }
        }, {
            new: true
        })
        .exec(function(err, promotion) {
            //Log updated promotion
            console.log('Promotion updated');
            console.log(promotion);

            //Drop collection and close connection
            db.collection('promotions').drop(function() {
                db.close();
                console.log('All done boss...');
            });
        });
    });


});
