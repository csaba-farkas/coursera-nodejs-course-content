var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';


//Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
   
    //Use assert to check if error is null
    //If it is null, the application exits with appropriate error messae
    assert.equal(err, null);
    console.log("Connected correctly to the database server");
    
    var collection = db.collection("dishes");
    
    collection.insertOne({name: "Uthapizza", description: "test"},
        function(err, result) {
            assert.equal(err, null);
            console.log("After insert");
            console.log(result.ops);
        
        //Find all function is part of the insert function callback
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found");
            console.log(docs);
            
            db.dropCollection("dishes", function(err, result) {
                assert.equal(err, null);
                db.close();
            })
        })
    });
});