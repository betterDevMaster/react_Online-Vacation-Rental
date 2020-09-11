var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Messages = new Schema({
    owneremail: {
        type: String
    },
    traveleremail: {
        type: String
    },
    travelermessage: {
        type: Array
    },
    headline: {
        type: String
    },
    location: {
        type: String
    },
    state: {
        type: String
    }
});

var Messages = mongoose.model('Messages', Messages);
module.exports = { Messages };