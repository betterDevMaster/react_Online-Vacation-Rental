var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Properties = new Schema({
    type: {
        type: String
    },
    bedroom: {
        type: String
    },
    sleeps: {
        type: String
    },
    bathroom: {
        type: String
    },
    halfbaths: {
        type: String
    },
    min_stays: {
        type: String
    },
    price: {
        type: String
    },
    available_from: {
        type: Date
    },
    available_to: {
        type: Date
    },
    country: {
        type: String
    },
    streetaddress: {
        type: String
    },
    building: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    email: {
        type: String
    },
    headline: {
        type: String
    },
    propertydescription: {
        type: String
    },
    accomodates: {
        type: String
    },
    photo_uploads: {
        type: String
    },

});

var Properties = mongoose.model('Properties', Properties);
module.exports = { Properties };