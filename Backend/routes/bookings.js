var { Bookings } = require('../models/bookings');


//Code for Allow Booking Property 

module.exports.bookproperty = function (req, res) {
    console.log("Inside bookproperty Request");
    console.log("Inside POST BOOK Property Request");
    var location = req.body.location;
    var fromdate = req.body.fromdate;
    var todate = req.body.todate;
    var guests = req.body.guests;
    var propertyidReceived = req.body.propertyidReceived
    var owneremail = req.body.owneremail
    var bookingArray = { location, fromdate, todate, guests }

    console.log('propertyidReceived ' + propertyidReceived)
    console.log('location ' + location)
    console.log('fromdate ' + fromdate)
    console.log('todate ' + todate)
    console.log('guests ' + guests)
    var bookings = new Bookings({
        location: req.body.location,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
        guests: req.body.guests,
        email: req.body.email,
        property_id: req.body.propertyidReceived,
        owneremail: req.body.owneremail,
        prp_headline: req.body.headline,
        prp_streetaddress: req.body.streetaddress,
        prp_state: req.body.state,
        prp_zipcode: req.body.zipcode,
        propertydescription: req.body.propertydescription,
    })

    bookings.save().then((bookings) => {
        console.log("bookings created : ", bookings);
        res.sendStatus(200).end();
    }, (err) => {

        console.log("Error Creating bookings" + err);
        res.sendStatus(400).end();

    })


};

//Code for List All trips Booking  

module.exports.bookedtrips = function (req, res) {
    console.log("Inside Get Book Trips Request");

    Bookings.find({
        email: req.params.email
    }, function (err, booking) {
        console.log("in func")
        if (err) {
            res.code = "400";
            res.value = "The email  you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(400).end();
        }
        else {
            console.log("here in ELse" + err)
            console.log("here in ELse" + booking)
            // res.sendStatus(200)
            // res.value = booking;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(booking))
        }
    })

};

//Code for List All Booked properties 

module.exports.bookedproperties = function (req, res) {
    console.log("Inside Get Booked Properties Request");
    Bookings.find({
        owneremail: req.params.email
    }, function (err, results) {
        if (err) {
            console.log("Inside err " + err);

        }
        else {
            console.log("here in bookedproperties " + results)
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.value = results;
            res.end(JSON.stringify(results))
        }
    })

};