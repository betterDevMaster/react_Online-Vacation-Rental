'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
// var db = require('../app/db');
var { Users } = require('../models/users');
// var config = require('./settings');
var config = require('./keys');


// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    console.log("In here in passport")
    var opts = {
        // jwtFromRequest: ExtractJwt.fromAuthHeader(),
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: config.secret
    }
    console.log("In here in passport  1")

    passport.use(new JwtStrategy(opts, (token, done) => {
        return done(null, token);


    }))
};
