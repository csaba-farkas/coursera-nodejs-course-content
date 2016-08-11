var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Insert Comment Schema
var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Create Schema for dishes
var dishSchema = new Schema({
    name: {
        type: String,   //data type of name
        required: true, //required value
        unique: true    //unique value
    },
    description: {
        type: String,   //description type
        required: true  //required value
    },
    comments: [commentSchema]   //Add commentSchema as an array of comments
}, {
    timestamps: true    //use "created at" and "updated at" timestamp to every document
});

//The schema is useless so far --> we need to create a model using it
//First parameter is used to create the collection in the MongoDB, it
//is pluralized. E.g. Dish will become Dishes
var Dishes = mongoose.model('Dish', dishSchema);

//Make this available to our Node application
module.exports = Dishes;
