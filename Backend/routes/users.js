var { Users } = require('../models/users');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtkey = require('../config/keys');


//Code for Traveler Signup
module.exports.signup = function (req, res) {
    console.log("Inside Signup Post Request");
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hashedpassword = bcrypt.hashSync(password, salt);

    var users = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedpassword,
        user_type: 'traveler'
    })

    users.save().then((users) => {
        console.log("users created : ", users);
        res.cookie('cookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
        res.sendStatus(200).end();
    }, (err) => {
        if (err && err.code === 11000) {
            res.end("Email Already Exist Use Another Email ID to Register!")
        }
        else {
            console.log("Error Creating users" + err);
            res.sendStatus(400).end();
        }
    })

};


//Code for Owner Signup

// app.post('/ownersignup', 
module.exports.ownersignup = function (req, res) {
    console.log("Inside Owner Signup Post Request");
    // var username = req.body.username;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var user_type = 'owner';
    var salt = bcrypt.genSaltSync(10);
    var hashedpassword = bcrypt.hashSync(password, salt);

    var users = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedpassword,
        user_type: 'owner'
    })

    users.save().then((users) => {
        console.log("users created : ", users);
        res.cookie('cookie', req.body.email, { maxAge: 900000, httpOnly: false, path: '/' });
        res.sendStatus(200).end();
    }, (err) => {
        if (err && err.code === 11000) {
            res.end("Email Already Exist Use Another Email ID to Register!")
        } else {

            res.sendStatus(400);
            res.end(err)
            console.log("Error Creating users" + err);
        }
    })
};


// Code for Traveler Login
// app.post('/login', 
module.exports.login = function (req, res) {

    console.log("Inside Login Post Request");
    var email = req.body.email;
    var password = req.body.password;

    Users.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            res.code = "400";
            res.value = "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            console.log("err" + err);

            res.sendStatus(400).end();
        } else if (user) {
            bcrypt.compare(password, user.password, function (err, results) {
                if (results) {
                    res.code = "200";
                    res.value = user;

                    res.cookie('cookie', email, { maxAge: 900000, httpOnly: false, credentials: 'include', path: '/' });
                    req.session.user = user;
                    console.log("USER " + user)
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })

                    jwt.sign({ user: user }, jwtkey.secret, { expiresIn: '10080s' }, (err, token) => {
                        var values = {
                            Successful: "Successful",
                            token: 'JWT ' + token
                        }
                        res.end(JSON.stringify(values))
                    });
                    // res.end('Successful');
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Incorrect Password")

                }
            })
        }
        else {
            console.log("ELSE USER " + user)
            //res.sendStatus(400)
            res.value = "The email and password you entered did not match our records. Please double-check and try again.";
            res.end(res.value)

        }
    })

};


// module.exports.login =
// app.get('/profile/:email', 
module.exports.profile = function (req, res) {
    console.log("Inside get Profile " + req.params.email)

    Users.findOne({
        email: req.params.email
    }, function (err, user) {
        if (err) {
            console.log("Inside err " + err);
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        }
        else {
            console.log("here in ELse" + err)
            console.log("Get Profile " + user)
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.value = user;
            res.end(JSON.stringify(user))
        }
    })
    //     }
    // })
};

//code for post profile details
// app.post('/profile',
module.exports.profilepost = function (req, res) {
    console.log("Inside Profile post Request");
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var about_me = req.body.about_me;
    var city = req.body.city;
    var country = req.body.country;
    var school = req.body.school;
    var hometown = req.body.hometown;
    var languages = req.body.languages;
    var gender = req.body.gender;
    var company = req.body.company;

    Users.findOneAndUpdate(
        { email: req.body.email },
        { $set: { about_me: about_me, city: city, country: country, school: school, hometown: hometown, languages: languages, gender: gender, company: company } },
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
                res.end(JSON.stringify(data))
            }
        }
    )
};



