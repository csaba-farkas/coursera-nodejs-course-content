var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

/*
{
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring . . ."
}
*/

var promotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ""
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var promotions = mongoose.model('promotion', promotionSchema);

module.exports = promotions;
