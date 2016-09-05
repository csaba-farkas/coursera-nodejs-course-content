var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*

*/

var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var leadership = mongoose.model('leader', leadershipSchema);

module.exports = leadership;
