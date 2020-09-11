var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var pool = require('./pool');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtkey = require('./config/keys');
var passport = require('passport');
var routes = require('./routes/index');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');


// var kafka = require(
//     "./kafka/client"
// )
function requireAuth(request, response, next) {
    passport.authenticate('jwt', { session: false }, async (error, token) => {
        if (error || !token) {
            console.log("error+" + error)
            console.log("token in if" + token)

            //response.status(401).json({ message: 'Unauthorized' });
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            response.end("Invalid Token")
            // //response.sendStatus(401).end();
        }
        else {
            console.log("token" + JSON.stringify(token))
            const user = await Users.findById({
                _id: token.user._id
            });
            request.user = user;
        }
        // catch (error) {
        //     next(error);
        // }
        next();
    })(request, response, next);
}






//Photo
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
// JWT code
function verifyToken(req, res, next) {
    //console.log("req.headers['authorization']" + req.headers['authorization'])
    const headerValue = req.headers['authorization'];
    // console.log("headerValue++++++" + headerValue)
    if (headerValue) {
        const value = headerValue.split(' ');
        const bearerToken = value[1];
        console.log("bearerToken  " + bearerToken)
        req.token = bearerToken
        next();
    }
    else {
        console.log('Forbiden')
        // res.sendStatus(403);
    }
}

//photo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {

        // const newFilename = `test` + `-` + Date.now() + `${path.extname(file.originalname)}`;
        const newFilename = `${(file.originalname)}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage });
var { Users } = require('./models/users');
var { Properties } = require('./models/properties');
var { Bookings } = require('./models/bookings');
var { Messages } = require('./models/messages');


var { mongoose } = require('./db/mongoose');




//use corsUto allow cross origin resource sharing
// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'mysecretkeyyyneedstobemorethan45to50charlongenough',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));
console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);



app.use(bodyParser.json());

//Allow Access Control
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     // res.setHeader('Access-Control-Allow-Headers', "*");
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', routes);

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));
//code for Photo upload
var photo_array = "";
app.post('/photo', upload.single('selectedFile'), (req, res) => {
    //console.log("Req : ",req);

    console.log("Res : filename ", req.file.filename);
    console.log("Res :Field ", req.file.fieldname);
    photo_array = photo_array + "," + (req.file.filename)
    console.log("photo_array" + photo_array)
    res.status(200)
    res.end("Uploaded");
});
app.post('/upload/:property_id', function (req, res) {
    console.log('req.params.property_id' + req.params.property_id)
    var property_id = req.params.property_id

    Properties.findOneAndUpdate(
        {
            _id: property_id
        },
        { $set: { photo_uploads: photo_array } },
        function (err, data) {
            console.log("in func property photo upload")
            if (err) {
                res.code = "400";
                res.value = "Could Not Update property photo upload";
                console.log(res.value);
                res.sendStatus(400).end();
            }
            else {
                console.log("here in ELse property photo upload" + err)
                console.log("here in ELse property photo upload" + data)
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.value = data;
                res.end(photo_array);
                photo_array = ""
            }
        }
    )

});

app.post('/propertyresults/photo/:file(*)', (req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    console.log("file " + file)
    var fileLocation = path.join(__dirname + '/uploads', file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(base64img);
});

// Code for Traveler Login
// app.post('/login', function (req, res) {

//     console.log("Inside Login Post Request");
//     var email = req.body.email;
//     var password = req.body.password;
//     console.log('JSON.stringify(req.body) ' + JSON.stringify(req.body))
//     console.log('mysql.escape(password) ' + password)

//     Users.findOne({
//         email: req.body.email
//     }, function (err, user) {
//         console.log("in func")
//         if (err) {
//             res.code = "400";
//             res.value = "The email and password you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             console.log("err" + err);

//             res.sendStatus(400).end();
//         } else if (user) {
//             bcrypt.compare(password, user.password, function (err, results) {
//                 if (results) {
//                     res.code = "200";
//                     res.value = user;

//                     console.log("I am here in cookie")
//                     res.cookie('cookie', email, { maxAge: 900000, httpOnly: false, credentials: 'include', path: '/' });
//                     req.session.user = user;
//                     console.log("USER++" + user)
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     console.log("I am here in successful")
//                     jwt.sign({ user: user }, jwtkey.secret, { expiresIn: '10080s' }, (err, token) => {
//                         console.log("token" + token)
//                         var values = {
//                             Successful: "Successful",
//                             token: 'JWT ' + token
//                         }
//                         res.end(JSON.stringify(values))
//                     });
//                     // res.end('Successful');
//                 }
//                 else {
//                     console.log('Password Err', err)
//                     return res.status(400).send();
//                 }
//             })
//         }
//         else {
//             console.log("here in ELse" + err)
//             console.log("here in ELse" + user)
//             //res.sendStatus(400)
//             res.value = "The email and password you entered did not match our records. Please double-check and try again.";
//             res.end(res.value)

//         }
//     })

// });

// //Code for Traveler Signup

// app.post('/signup', function (req, res) {
//     console.log("Inside Signup Post Request");
//     var password = req.body.password;
//     var salt = bcrypt.genSaltSync(10);
//     var hashedpassword = bcrypt.hashSync(password, salt);

//     var users = new Users({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         password: hashedpassword,
//         user_type: 'traveler'
//     })
//     console.log('mysql.escape(first_name) ' + mysql.escape(req.body.first_name))
//     console.log('mysql.escape(last_name) ' + mysql.escape(req.body.last_name))
//     console.log('mysql.escape(password) ' + mysql.escape(req.body.password))
//     console.log('mysql.escape(password) ' + mysql.escape(hashedpassword))

//     console.log('mysql.escape(email) ' + mysql.escape(req.body.email))
//     //console.log('mysql.escape(user_type) ' + mysql.escape(user_type))

//     users.save().then((users) => {
//         console.log("users created : ", users);
//         res.cookie('cookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
//         res.sendStatus(200).end();
//     }, (err) => {
//         if (err && err.code === 11000) {
//             res.end("Email Already Exist Use Another Email ID to Register!")
//         }
//         else {
//             console.log("Error Creating users" + err);
//             res.sendStatus(400).end();
//         }
//     })

// });
// //Code for Owner Signup

// app.post('/ownersignup', function (req, res) {
//     console.log("Inside Signup Post Request");
//     // var username = req.body.username;
//     var first_name = req.body.first_name;
//     var last_name = req.body.last_name;
//     var email = req.body.email;
//     var password = req.body.password;
//     var user_type = 'owner';
//     var salt = bcrypt.genSaltSync(10);
//     var hashedpassword = bcrypt.hashSync(password, salt);

//     console.log('mysql.escape(first_name) ' + mysql.escape(first_name))
//     console.log('mysql.escape(last_name) ' + mysql.escape(last_name))
//     console.log('mysql.escape(password) ' + mysql.escape(password))
//     console.log('mysql.escape(email) ' + mysql.escape(email))
//     console.log('mysql.escape(user_type) ' + mysql.escape(user_type))
//     var users = new Users({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         password: hashedpassword,
//         user_type: 'owner'
//     })

//     users.save().then((users) => {
//         console.log("users created : ", users);
//         res.cookie('cookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
//         res.sendStatus(200).end();
//     }, (err) => {
//         if (err && err.code === 11000) {
//             res.end("Email Already Exist Use Another Email ID to Register!")
//         } else {

//             res.sendStatus(400);
//             res.end(err)
//             console.log("Error Creating users" + err);
//         }
//     })
// });

// function getEmail(value) {
//     var str = value
//     var email = str.replace("%40", "@");
//     email = email.substring(7)
//     console.log("from function getEmail" + email)
//     return email;
// }
//Code for getting profile details requireAuth
// app.get('/profile/:email', function (req, res) {
//     console.log("req " + JSON.stringify(req.body))
//     console.log("Headers" + req.headers['Authorization'])
//     console.log("Inside Profile Get Request");
//     // var emailValue = getEmail(req.params.email);
//     console.log("email in get profile" + req.params.email)
//     // jwt.verify(req.token, jwtkey.secret, (err, authData) => {
//     //     if (err) {
//     //         res.writeHead(403, {
//     //             'Content-Type': 'text/plain'
//     //         })
//     //     }
//     //     else {
//     console.log("JWT Successful")

//     Users.findOne({
//         email: req.params.email
//     }, function (err, user) {
//         console.log("in func")
//         if (err) {
//             res.code = "400";
//             res.value = "The email  you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             res.sendStatus(400).end();
//         }
//         else {
//             console.log("here in ELse" + err)
//             console.log("here in ELse" + user)
//             //res.sendStatus(400)
//             res.value = user;
//             res.end(JSON.stringify(user))
//         }
//     })
//     //     }
//     // })
// });

// //code for post profile details

// app.post('/profile', function (req, res) {
//     console.log("Inside Profile post Request");
//     var first_name = req.body.first_name;
//     var last_name = req.body.last_name;
//     var about_me = req.body.about_me;
//     var city = req.body.city;
//     var country = req.body.country;
//     var school = req.body.school;
//     var hometown = req.body.hometown;
//     var languages = req.body.languages;
//     var gender = req.body.gender;
//     var company = req.body.company;

//     // var emailValue = getEmail(req.body.email);
//     Users.findOneAndUpdate(
//         { email: req.body.email },
//         { $set: { about_me: about_me, city: city, country: country, school: school, hometown: hometown, languages: languages, gender: gender, company: company } },
//         function (err, data) {
//             console.log("in func")
//             if (err) {
//                 res.code = "400";
//                 res.value = "Could Not Update";
//                 console.log(res.value);
//                 res.sendStatus(400).end();
//             }
//             else {
//                 console.log("here in ELse" + err)
//                 console.log("here in ELse" + data)
//                 //res.sendStatus(400)
//                 res.value = data;
//                 res.end(JSON.stringify(data))
//             }
//         }
//     )

// });

// //Code for getting ownerdashboard details
// app.post('/ownerdashboard', function (req, res) {
//     console.log("Inside ownerdashboard Get Request");
//     console.log("req.body.email" + req.body.params.email)

//     console.log("req.body.email" + req.body.email)
//     // var emailValue = getEmail(req.body.params.email);
//     // console.log("email in get ownerdashboard" + emailValue)
//     var property_id = req.body.params.property_id
//     console.log("property_id  +++ " + property_id)
//     // jwt.verify(req.token, jwtkey.secret, (err, authData) => {
//     //     if (err) {
//     //         console.log("NOt VAlid")
//     //         res.writeHead(403, {
//     //             'Content-Type': 'text/plain'
//     //         })
//     //     }
//     //     else {
//     if (property_id) {
//         Properties.findOne({
//             email: req.body.params.email,
//             _id: property_id
//         }, function (err, property) {
//             console.log("in func")
//             if (err) {
//                 res.code = "400";
//                 res.value = "The data you entered did not match our records. Please double-check and try again.";
//                 console.log(res.value);
//                 res.sendStatus(400).end();
//             }
//             else {
//                 console.log("here in ELse" + err)
//                 console.log("here in ELse" + property)
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.value = property;
//                 res.end(JSON.stringify(property))
//             }
//         })

//         // var sql = "SELECT * from property_details where email=" + mysql.escape(emailValue) +
//         //     "and property_id=" + mysql.escape(property_id);
//     }
//     else {
//         var property = new Properties({
//             email: emailValue
//         })
//         property.save().then((property) => {
//             console.log("property created : ", property);
//             //res.sendStatus(200)
//             res.value = property;
//             console.log("JSON.stringify(property)" + JSON.stringify(property))
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end(JSON.stringify(property))
//         }, (err) => {

//             res.sendStatus(400);
//             res.end(err)
//             console.log("Error Creating property" + property);

//         })
//         // var sql = "INSERT INTO property_details (email) values(" + mysql.escape(emailValue) + ")"
//         //+ "and property_id=" + mysql.escape(property_id);
//     }
//     //     }
//     // })

// });


// //Code for Owner Dashboard 

// app.post('/ownerdashboard/location', function (req, res) {
//     console.log("Inside ownerdashboard location opost Request");
//     // var username = req.body.username;
//     var country = req.body.country;
//     var streetaddress = req.body.streetaddress;
//     var building = req.body.building;
//     var city = req.body.city;
//     var state = req.body.state;
//     var zipcode = req.body.zipcode;
//     var headline = req.body.headline;
//     var type = req.body.type;
//     var propertydescription = req.body.propertydescription;
//     var bedroom = req.body.bedroom;
//     var accomodates = req.body.accomodates;
//     var bathroom = req.body.bathroom;
//     var available_from = req.body.available_from;
//     var available_to = req.body.available_to;
//     var price = req.body.price;
//     var min_stays = req.body.min_stays;
//     var property_id = req.body.property_id

//     // var emailValue = getEmail(req.body.email);
//     console.log('req.body.email' + req.body.email)
//     console.log('req.body.location' + req.body.location)
//     console.log('req.body.country' + req.body.location[0])
//     console.log('mysql.escape(country) ' + mysql.escape(country))
//     console.log('mysql.escape(streetaddress) ' + mysql.escape(streetaddress))
//     console.log('mysql.escape(building) ' + mysql.escape(building))
//     console.log('mysql.escape(city) ' + mysql.escape(city))
//     console.log('mysql.escape(state) ' + mysql.escape(state))
//     console.log("property_id from the post request" + property_id)


//     Properties.findOneAndUpdate(
//         {
//             email: req.body.email,
//             _id: property_id
//         },
//         {
//             $set: {
//                 country: country,
//                 streetaddress: streetaddress,
//                 building: building,
//                 city: city,
//                 state: state,
//                 zipcode: zipcode,
//                 headline: headline,
//                 type: type,
//                 propertydescription: propertydescription,
//                 bedroom: bedroom,
//                 accomodates: accomodates,
//                 bathroom: bathroom,
//                 available_from: available_from,
//                 available_to: available_to,
//                 price: price,
//                 min_stays: min_stays
//             }
//         },
//         function (err, data) {
//             console.log("in func")
//             if (err) {
//                 res.code = "400";
//                 res.value = "Could Not Update";
//                 console.log(res.value);
//                 res.sendStatus(400).end();
//             }
//             else {
//                 console.log("here in ELse" + err)
//                 console.log("here in ELse" + data)
//                 //res.sendStatus(400)
//                 res.value = data;
//                 res.end("Update Successful");
//             }
//         }
//     )
// });


// //Code for Get available Search Property 
// app.post('/searchproperty', function (req, res) {
//     console.log("Inside POST Search Property Request");
//     var location = req.body.location;
//     var arrivaldate = req.body.arrivaldate;
//     var departdate = req.body.departdate;
//     var guests = req.body.guests;
//     var bookingArray = []

//     console.log("req.body.location" + req.body.location)
//     console.log("req.body.arrivaldate" + req.body.arrivaldate)
//     console.log("req.body.location" + req.body.departdate)
//     console.log("req.body.arrivaldate" + req.body.guests)


//     console.log('mysql.escape(location) ' + mysql.escape(location))

//     Bookings.find({
//         $or: [
//             {
//                 $and: [
//                     { fromdate: { $lte: arrivaldate } },
//                     { todate: { $gte: arrivaldate } }
//                 ]
//             },
//             {
//                 $and: [
//                     { fromdate: { $lte: departdate } },
//                     { todate: { $gte: departdate } }
//                 ]
//             }
//         ]
//     },
//         { property_id: 1, _id: 0 }
//         , function (err, booking) {
//             console.log("in func")
//             if (err) {
//                 res.code = "400";
//                 res.value = "The email  you entered did not match our records. Please double-check and try again.";
//                 console.log("bookingbookingbooking " + res.value);
//                 // res.sendStatus(400).end();
//             }
//             else {

//                 console.log("here in ELse" + err)
//                 console.log("booking.length" + booking.length)
//                 if (booking.length) {
//                     console.log("here in ELse bookingbookingbookingbooking " + booking)
//                     var booking1 = JSON.stringify(booking)
//                     console.log("booking1 " + booking1)
//                     // console.log("here in ELse bookinarra " + booking[0].property_id)
//                     // console.log("here in ELse bookinarra " + booking[1].property_id)
//                     for (let i = 0; i < booking.length; i++) {
//                         bookingArray.push(booking[i].property_id)
//                         // bookingArray.push(booking[1].property_id)
//                     }
//                     console.log("bookingArray  " + bookingArray)
//                 }
//                 console.log("bookingArray  " + bookingArray)


//                 Properties.find({
//                     $and: [
//                         { city: location },
//                         { available_from: { $lte: arrivaldate } },
//                         { available_to: { $gte: departdate } },
//                         { min_stays: { $lte: guests } },
//                         { accomodates: { $gte: guests } },
//                         { _id: { $nin: bookingArray } }
//                     ]

//                 }, function (err, property) {
//                     console.log("in func")
//                     if (err) {
//                         res.code = "400";
//                         res.value = "The data you entered did not match our records. Please double-check and try again.";
//                         console.log(res.value);
//                         res.sendStatus(400).end();
//                     }
//                     else {
//                         console.log("here in ELse" + err)
//                         console.log("here in ELse" + property)
//                         res.value = property;
//                         res.writeHead(200, {
//                             'Content-Type': 'text/plain'
//                         })
//                         res.end(JSON.stringify(property))
//                     }
//                 })
//             }
//         })

// });

// //Code for Get Property Details of requested property 
// app.get('/requestedproperty/:property_id', function (req, res) {
//     console.log("Inside Get Requested Property Request");
//     var property_id = req.params.property_id;

//     console.log('mysql.escape(property_id) ' + mysql.escape(property_id))
//     Properties.findOne({
//         _id: property_id
//     }, function (err, property) {
//         console.log("in func")
//         if (err) {
//             res.code = "400";
//             res.value = "The data you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             res.sendStatus(400).end();
//         }
//         else {
//             console.log("here in ELse" + err)
//             console.log("here in ELse" + property)
//             //res.sendStatus(400)
//             res.value = property;
//             res.end(JSON.stringify(property))
//         }
//     })


// });



// //Code for Allow Booking Property 

// app.post('/bookproperty', function (req, res) {
//     console.log("Inside POST BOOK Property Request");
//     var location = req.body.location;
//     var fromdate = req.body.fromdate;
//     var todate = req.body.todate;
//     var guests = req.body.guests;
//     // var emailValue = getEmail(req.body.email);
//     var propertyidReceived = req.body.propertyidReceived
//     var owneremail = req.body.owneremail
//     var bookingArray = { location, fromdate, todate, guests, emailValue }

//     console.log('mysql.escape(property_id) ' + mysql.escape(propertyidReceived))
//     console.log('mysql.escape(email) ' + mysql.escape(emailValue))
//     console.log('mysql.escape(location) ' + mysql.escape(location))
//     console.log('mysql.escape(checkin) ' + mysql.escape(fromdate))
//     console.log('mysql.escape(checkout) ' + mysql.escape(todate))
//     console.log('mysql.escape(guests) ' + mysql.escape(guests))
//     // Properties.findOneAndUpdate(
//     //     {
//     //         _id: propertyidReceived
//     //     },
//     //     { $push: { bookings: bookingArray } },
//     //     function (err, data) {
//     //         console.log("in func property photo upload")
//     //         if (err) {
//     //             console.log(err)
//     //             res.code = "400";
//     //             res.value = "Could Not Update property photo upload";
//     //             console.log(res.value);
//     //             res.sendStatus(400).end();
//     //         }
//     //         else {
//     //             console.log("here in ELse property photo upload" + err)
//     //             console.log("here in ELse property photo upload" + data)
//     //             //res.sendStatus(400)
//     //             res.value = data;
//     //             res.sendStatus(200)
//     //             res.end(JSON.stringify(data));

//     //         }
//     //     }
//     // )
//     var bookings = new Bookings({
//         location: req.body.location,
//         fromdate: req.body.fromdate,
//         todate: req.body.todate,
//         guests: req.body.guests,
//         email: req.body.email,
//         property_id: req.body.propertyidReceived,
//         owneremail: req.body.owneremail,
//         prp_headline: req.body.headline,
//         prp_streetaddress: req.body.streetaddress,
//         prp_state: req.body.state,
//         prp_zipcode: req.body.zipcode,
//         propertydescription: req.body.propertydescription,
//     })

//     bookings.save().then((bookings) => {
//         console.log("bookings created : ", bookings);
//         res.sendStatus(200).end();
//     }, (err) => {

//         console.log("Error Creating bookings" + err);
//         res.sendStatus(400).end();

//     })


// });

// //Code for List All trips Booking  

// app.get('/bookedtrips/:email', function (req, res) {
//     console.log("Inside Get Book Trips Request");
//     // var emailValue = getEmail(req.params.email)
//     console.log("req.params.email" + req.params.email)
//     // var trip_name = mysql.escape(trip_name)
//     // var trip_location = mysql.escape(trip_location)
//     // var reviews = mysql.escape(reviews)
//     // var stay = mysql.escape(stay)

//     console.log('mysql.escape(email) ' + mysql.escape(req.params.email))
//     Bookings.find({
//         email: req.params.email
//     }, function (err, booking) {
//         console.log("in func")
//         if (err) {
//             res.code = "400";
//             res.value = "The email  you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             res.sendStatus(400).end();
//         }
//         else {
//             console.log("here in ELse" + err)
//             console.log("here in ELse" + booking)
//             // res.sendStatus(200)
//             // res.value = booking;
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end(JSON.stringify(booking))
//         }
//     })

// });

// //Code for List All Booked properties 

// app.get('/bookedproperties/:email', function (req, res) {
//     // var emailValue = getEmail(req.params.email)
//     console.log("Inside Get Booked Properties Request");
//     // var trip_name = mysql.escape(trip_name)
//     // var trip_location = mysql.escape(trip_location)
//     // var reviews = mysql.escape(reviews)
//     // var stay = mysql.escape(stay)

//     // console.log('mysql.escape(trip_name) ' + mysql.escape(trip_name))
//     Bookings.find({
//         owneremail: req.params.email
//     }, function (err, booking) {
//         console.log("in func")
//         if (err) {
//             res.code = "400";
//             res.value = "The email  you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             res.sendStatus(400).end();
//         }
//         else {
//             console.log("here in ELse" + err)
//             console.log("here in ELse" + booking)
//             // res.sendStatus(200)
//             // res.value = booking;
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end(JSON.stringify(booking))
//         }
//     })

// });

// //Code for Get Number of Property Details for a user property 
// app.get('/propertylisting/:email', function (req, res) {
//     console.log("Inside Get Requested Property Listing Request");
//     Properties.find({
//         email: req.params.email,
//     }, function (err, property) {
//         console.log("in func")
//         if (err) {
//             res.code = "400";
//             res.value = "The data you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             res.sendStatus(400).end();
//         }
//         else {
//             console.log("here in ELse" + err)
//             console.log("here in ELse" + property)
//             //res.sendStatus(400)
//             res.value = property;
//             res.end(JSON.stringify(property))
//         }
//     })


// });


//Code for Get Number of Property Details for a user property 
app.get('/propertyresults/photo/:property_id', function (req, res) {
    console.log("Inside Get Requested Property Listing Request");
    var property_id = req.params.property_id;

    Properties.findOne({
        _id: property_id
    }, project
            ({ photo_uploads: 1 }), function (err, property) {
                console.log("in func")
                if (err) {
                    res.code = "400";
                    res.value = "The email  you entered did not match our records. Please double-check and try again.";
                    console.log(res.value);
                    res.sendStatus(400).end();
                }
                else {
                    console.log(" Property" + property)
                    //res.sendStatus(400)
                    res.value = property;
                    res.end(JSON.stringify(property))
                }
            })

});


app.post('/uploadprofilepicture/:email', function (req, res) {
    // var emailValue = getEmail(req.params.email)

    Users.findOneAndUpdate(
        { email: req.params.email },
        { $set: { profile_photo: photo_array } },
        function (err, data) {
            console.log("in func")
            if (err) {
                res.code = "400";
                res.value = "Could Not Update";
                console.log(res.value);
                res.sendStatus(400).end();
            }
            else {
                console.log("Upload Profile Picture" + data)
                //res.sendStatus(400)
                res.value = data;
                res.end(photo_array);
                photo_array = ""
            }
        }
    )


});
//code for Photo upload
app.post('/profilepicture', upload.single('selectedFile'), (req, res) => {
    //console.log("Req : ",req);

    console.log("Res : filename ", req.file.filename);
    console.log("Res :Field ", req.file.fieldname);
    photo_array = (req.file.filename)
    console.log("photo_array" + photo_array)
    res.status(200)
    res.end("Uploaded");
});


// app.post('/message', function (req, res) {
//     console.log('req.params.message' + req.body.message)
//     console.log("req.body.messageID" + req.body.messageid)
//     Messages.findOneAndUpdate(
//         {
//             _id: req.body.messageid
//         },
//         { $push: { travelermessage: req.body.message } },
//         { new: true, upsert: true },
//         function (err, data) {
//             if (err) {
//                 res.value = "in Err " + err;
//                 console.log(res.value);
//                 console.log("in func Message")
//             }
//             else {
//                 console.log("data1" + data)
//                 console.log("data2" + data)
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 //res.value = data;
//                 res.end(JSON.stringify(data));
//             }
//         })
// });


// app.post('/messagefromt', function (req, res) {
//     console.log("Inside messagefromt Post Request");
//     // var username = req.body.username;


//     // console.log('mysql.escape(first_name) ' + mysql.escape(first_name))
//     // console.log('mysql.escape(last_name) ' + mysql.escape(last_name))
//     // console.log('mysql.escape(password) ' + mysql.escape(password))
//     // console.log('mysql.escape(email) ' + mysql.escape(email))
//     // console.log('mysql.escape(user_type) ' + mysql.escape(user_type))
//     var message = new Messages({
//         owneremail: req.body.owneremail,
//         headline: req.body.headline,
//         traveleremail: req.body.traveleremail,
//         location: req.body.location,
//         state: req.body.state,
//         travelermessage: req.body.travelermessage
//     })

//     message.save().then((message) => {
//         console.log("message created : ", message);
//         res.writeHead(200, {
//             'Content-Type': 'text/plain'
//         })
//         res.end(JSON.stringify(message))
//     }, (err) => {

//         res.sendStatus(400);
//         res.end(err)
//         console.log("Error Creating users" + err);

//     })
// });



// app.get('/chatmessage/:messageid', function (req, res) {
//     console.log("Inside Get Chat Messagess Request");
//     console.log(req.body)
//     console.log(req.params)
//     console.log("messageid" + req.params.messageid);


//     // var email = getEmail(req.body.email);
//     // if (req.body.type === 'traveler') {
//     Messages.findOne({
//         _id: req.params.messageid
//     }, function (err, message) {
//         console.log("in func")
//         if (err) {
//             res.code = "400";
//             res.value = "The data you entered did not match our records. Please double-check and try again.";
//             console.log(res.value);
//             res.sendStatus(400).end();
//         }
//         else {
//             console.log("here in ELse from traveler" + err)
//             console.log("here in ELse  from traveler" + message)

//             res.value = message;
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end(JSON.stringify(message))
//         }
//     })
// });



// app.post('/messagebox', function (req, res) {
//     console.log("Insidemessagebox Request");
//     // var emailValue = getEmail(req.params.email)
//     console.log("req.params.email" + req.body.email)

//     console.log('mysql.escape(email) ' + req.body.email)
//     console.log('mysql.escape(email) ' + req.body.type)
//     if (req.body.type === 'traveler') {
//         Messages.find({
//             traveleremail: req.body.email
//         }, function (err, message) {
//             console.log("in func")
//             if (err) {
//                 res.code = "400";
//                 res.value = "The email  you entered did not match our records. Please double-check and try again.";
//                 console.log(res.value);
//                 res.sendStatus(400).end();
//             }
//             else {
//                 console.log("here in ELse" + err)
//                 console.log("here in ELse" + message)
//                 // res.sendStatus(200)
//                 // res.value = booking;
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end(JSON.stringify(message))
//             }
//         })
//     }
//     else {
//         Messages.find({
//             owneremail: req.body.email
//         }, function (err, message) {
//             console.log("in func")
//             if (err) {
//                 res.code = "400";
//                 res.value = "The email  you entered did not match our records. Please double-check and try again.";
//                 console.log(res.value);
//                 res.sendStatus(400).end();
//             }
//             else {
//                 console.log("here in ELse" + err)
//                 console.log("here in ELse" + message)
//                 // res.sendStatus(200)
//                 // res.value = booking;
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end(JSON.stringify(message))
//             }
//         })

//     }

// });

var server = app.listen(3001, function () {
    console.log("Server listening on port 3001");

});
