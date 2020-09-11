var { Properties } = require('../models/properties');
var { Bookings } = require('../models/bookings');






//Code for getting ownerdashboard details
// app.post('/ownerdashboard', 
module.exports.ownerdashboard = function (req, res) {
    console.log("req.body.email" + req.body.email)
    var property_id = req.body.params.property_id
    console.log("property_id  +++ " + property_id)
    if (property_id) {
        Properties.findOne({
            email: req.body.params.email,
            _id: property_id
        }, function (err, property) {
            console.log("in func")
            if (err) {
                res.code = "400";
                res.value = "The data you entered did not match our records. Please double-check and try again.";
                console.log(res.value);
                res.sendStatus(400).end();
            }
            else {
                console.log("here in ELse" + err)
                console.log("here in ELse" + property)
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.value = property;
                res.end(JSON.stringify(property))
            }
        })

    }
    else {
        var property = new Properties({
            email: req.body.params.email
        })
        property.save().then((property) => {
            console.log("property created : ", property);
            //res.sendStatus(200)
            res.value = property;
            console.log("JSON.stringify(property)" + JSON.stringify(property))
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(property))
        }, (err) => {

            res.sendStatus(400);
            res.end(err)
            console.log("Error Creating property" + property);
        })
    }
};


//Code for Owner Dashboard 

// app.post('/ownerdashboard/location', 
module.exports.ownerdashboardloc = function (req, res) {
    console.log("Inside ownerdashboard location post Request");
    var username = req.body.username;
    var country = req.body.country;
    var streetaddress = req.body.streetaddress;
    var building = req.body.building;
    var city = req.body.city;
    var state = req.body.state;
    var zipcode = req.body.zipcode;
    var headline = req.body.headline;
    var type = req.body.type;
    var propertydescription = req.body.propertydescription;
    var bedroom = req.body.bedroom;
    var accomodates = req.body.accomodates;
    var bathroom = req.body.bathroom;
    var available_from = req.body.available_from;
    var available_to = req.body.available_to;
    var price = req.body.price;
    var min_stays = req.body.min_stays;
    var property_id = req.body.property_id

    console.log('req.body.email' + req.body.email)
    console.log('req.body.location' + req.body.location)
    console.log('req.body.country' + req.body.location[0])
    console.log('country ' + country)
    console.log('streetaddress ' + streetaddress)
    console.log('building ' + building)
    console.log('city ' + city)
    console.log('state ' + state)
    console.log("property_id from the post request" + property_id)


    Properties.findOneAndUpdate(
        {
            email: req.body.email,
            _id: property_id
        },
        {
            $set: {
                country: country,
                streetaddress: streetaddress,
                building: building,
                city: city,
                state: state,
                zipcode: zipcode,
                headline: headline,
                type: type,
                propertydescription: propertydescription,
                bedroom: bedroom,
                accomodates: accomodates,
                bathroom: bathroom,
                available_from: available_from,
                available_to: available_to,
                price: price,
                min_stays: min_stays
            }
        },
        function (err, data) {
            console.log("in func")
            if (err) {
                res.code = "400";
                res.value = "Could Not Update";
                console.log(res.value);
                res.sendStatus(400).end();
            }
            else {
                console.log("here in ELse" + err)
                console.log("here in ELse" + data)
                //res.sendStatus(400)
                res.value = data;
                res.end("Update Successful");
            }
        }
    )
};


//Code for Get available Search Property 
// app.post('/searchproperty', 
module.exports.searchproperty = function (req, res) {
    console.log("Inside POST Search Property Request");
    var location = req.body.location;
    var arrivaldate = req.body.arrivaldate;
    var departdate = req.body.departdate;
    var guests = req.body.guests;
    var bookingArray = []

    Bookings.find({
        $or: [
            {
                $and: [
                    { fromdate: { $lte: arrivaldate } },
                    { todate: { $gte: arrivaldate } }
                ]
            },
            {
                $and: [
                    { fromdate: { $lte: departdate } },
                    { todate: { $gte: departdate } }
                ]
            }
        ]
    },
        { property_id: 1, _id: 0 }
        , function (err, booking) {
            if (err) {
                res.code = "400";
                res.value = "The email  you entered did not match our records. Please double-check and try again.";
                console.log("booking  " + res.value);
                // res.sendStatus(400).end();
            }
            else {
                console.log("booking.length" + booking.length)
                if (booking.length != null) {
                    var booking1 = JSON.stringify(booking)
                    console.log("booking1 " + booking1)
                    // console.log("here in ELse bookinarra " + booking[0].property_id)
                    // console.log("here in ELse bookinarra " + booking[1].property_id)
                    for (let i = 0; i < booking.length; i++) {
                        bookingArray.push(booking[i].property_id)
                        // bookingArray.push(booking[1].property_id)
                    }
                    console.log("bookingArray  " + bookingArray)
                }
                console.log("bookingArray  " + bookingArray)
                Properties.find({
                    $and: [
                        { city: { '$regex': new RegExp('^' + location + '$', "i"), '$options': 'i' } },
                        { available_from: { $lte: arrivaldate } },
                        { available_to: { $gte: departdate } },
                        { min_stays: { $lte: guests } },
                        { accomodates: { $gte: guests } },
                        { _id: { $nin: bookingArray } }
                    ]

                }, function (err, property) {
                    console.log("in func")
                    if (err) {
                        res.code = "400";
                        res.value = "The data you entered did not match our records. Please double-check and try again.";
                        console.log(res.value);
                        res.sendStatus(400).end();
                    }
                    else {
                        console.log("property  " + property)
                        res.value = property;
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end(JSON.stringify(property))
                    }
                })


            }
        })

};

//Code for Get Property Details of requested property 
// app.get('/requestedproperty/:property_id', 
module.exports.requestedproperty = function (req, res) {
    console.log("Inside Get Requested Property Request");

    Properties.findOne({
        _id: req.params.property_id
    }, function (err, property) {
        console.log("in func")
        if (err) {
            res.code = "400";
            res.value = "The data you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(400).end();
        }
        else {
            console.log("here in ELse" + err)
            console.log("here in ELse" + property)
            //res.sendStatus(400)
            res.value = property;
            res.end(JSON.stringify(property))
        }
    })


};


//Code for Get Number of Property Details for a user property 
// app.get('/propertylisting/:email',
module.exports.propertylisting = function (req, res) {
    console.log("Inside Get Requested Property Listing Request");
    Properties.find({
        email: req.params.email,
    }, function (err, property) {
        console.log("in func")
        if (err) {
            res.code = "400";
            res.value = "The data you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(400).end();
        }
        else {
            console.log("here in ELse" + err)
            console.log("here in ELse" + property)
            //res.sendStatus(400)
            res.value = property;
            res.end(JSON.stringify(property))
        }
    })


};

