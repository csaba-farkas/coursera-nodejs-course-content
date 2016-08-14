var mongoose = require('mongoose');
var assert = require('assert');

var Leaders = require('./leadership');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
    console.log('We are in boss');

    /*
    {
          "name": "Peter Pan",
          "image": "images/alberto.png",
          "designation": "Chief Epicurious Officer",
          "abbr": "CEO",
          "description": "Our CEO, Peter, . . ."
    }
    */
    Leaders.create({
        name: "Lili Farkas",
        image: "images/lili-pic.jpg",
        designation: "Boss",
        description: "Dreaded Lili!"
    }, function(err, leader) {
        if(err) throw err;

        //Log leader
        console.log('Leader created');
        console.log(leader);

        var id = leader._id;
        console.log('Id of leader is saved: ' + id);

        Leaders.findByIdAndUpdate(id, {
            $set: {
                abbr: "BBB"
            }
        }, {
            new: true
        })
        .exec(function(err, leader) {
            //Log updated leader
            console.log('leader updated');
            console.log(leader);

            //Drop collection and close connection
            db.collection('leaders').drop(function() {
                db.close();
                console.log('All done boss...');
            });
        });
    });


});
