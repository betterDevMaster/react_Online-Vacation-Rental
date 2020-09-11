var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bookings = new Schema({
    location: {
        type: String
    },
    fromdate: {
        type: String
    },
    todate: {
        type: String
    },
    guests: {
        type: String
    },
    email: {
        type: String
    },
    property_id: {
        type: String
    },
    owneremail: {
        type: String
    },
    prp_headline: {
        type: String
    },
    prp_streetaddress: {
        type: String
    },

    prp_state: {
        type: String
    },
    prp_zipcode: {
        type: String
    },
    propertydescription: {
        type: String
    },

    // photo_uploads: {
    //     type: String
    // },
});

var Bookings = mongoose.model('Bookings', Bookings);
module.exports = { Bookings };