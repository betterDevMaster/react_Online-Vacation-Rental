var express = require('express');
var router = express.Router();
var users = require('./users');
var properties = require('./properties');
var bookings = require('./bookings');
var messages = require('./messages');




router
    .route('/signup')
    .post(users.signup);
router
    .route('/ownersignup')
    .post(users.ownersignup);
router
    .route('/login')
    .post(users.login);
router
    .route('/profile/:email')
    .get(users.profile);
router
    .route('/profile')
    .post(users.profilepost);

router
    .route('/ownerdashboard')
    .post(properties.ownerdashboard);
router
    .route('/ownerdashboard/location')
    .post(properties.ownerdashboardloc);

router
    .route('/searchproperty')
    .post(properties.searchproperty);
router
    .route('/requestedproperty/:property_id')
    .post(properties.requestedproperty);

router
    .route('/bookproperty')
    .post(bookings.bookproperty);
router
    .route('/bookedtrips/:email')
    .get(bookings.bookedtrips);
router
    .route('/bookedproperties/:email')
    .get(bookings.bookedproperties);
router
    .route('/propertylisting/:email')
    .get(properties.propertylisting);

router
    .route('/requestedproperty/:property_id')
    .get(properties.requestedproperty);


router
    .route('/message')
    .post(messages.message);
router
    .route('/messagefromt')
    .post(messages.messagefromt);
router
    .route('/chatmessage/:messageid')
    .get(messages.chatmessage);

router
    .route('/messagebox')
    .post(messages.messagebox);





module.exports = router;