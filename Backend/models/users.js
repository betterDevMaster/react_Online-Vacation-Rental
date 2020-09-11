var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phone_no: {
        type: Number
    },
    about_me: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    company: {
        type: String
    },
    school: {
        type: String
    },
    hometown: {
        type: String
    },
    languages: {
        type: String
    },
    gender: {
        type: String
    },
    user_type: {
        type: String
    },
    password: {
        type: String
    },
    profile_photo: {
        type: String
    },
    properties: [{
        type: Schema.ObjectId,
        ref: 'properties'
    }]
});
var Users = mongoose.model('Users', usersSchema);

module.exports = { Users };
