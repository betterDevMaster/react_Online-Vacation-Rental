var { Messages } = require('../models/messages');



module.exports.message = function (req, res) {

    Messages.findOneAndUpdate(
        {
            _id: req.body.messageid
        },
        { $push: { travelermessage: req.body.message } },
        { new: true, upsert: true },
        function (err, data) {
            if (err) {
                res.value = "in Err " + err;
                console.log(res.value);
                console.log("in func Message")
            }
            else {
                console.log("data1" + data)
                console.log("data2" + data)
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(data));
            }
        })
};


// app.post('/messagefromt',
module.exports.messagefromt = function (req, res) {
    var message = new mongo.Messages({
        owneremail: msg.owneremail,
        headline: msg.headline,
        traveleremail: msg.traveleremail,
        location: msg.location,
        state: msg.state,
        travelermessage: msg.travelermessage
    })

    message.save().then((res) => {
        console.log("message created : ", res);
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(message))
    }, (err) => {

        res.sendStatus(400);
        res.end(err)
        console.log("Error Creating Message" + err);
    })

};



// app.get('/chatmessage/:messageid',
module.exports.chatmessage = function (req, res) {
    console.log("Inside Get Chat Messagess Request");

    Messages.findOne({
        _id: req.params.messageid
    }, function (err, message) {

        if (err) {
            res.code = "400";
            res.value = "The data you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(400).end();
        }
        else {
            console.log("here in ELse from traveler" + err)
            console.log("here in ELse  from traveler" + message)

            res.value = message;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(message))
        }
    })

};



module.exports.messagebox = function (req, res) {
    console.log("Insidemessagebox Request");
    console.log("req.params.email" + req.body.email)

    console.log('req.body.email ' + req.body.email)
    console.log('req.body.type ' + req.body.type)
    if (req.body.type === 'traveler') {
        Messages.find({
            traveleremail: req.body.email
        }, function (err, message) {
            console.log("in func")
            if (err) {
                res.code = "400";
                res.value = "The email  you entered did not match our records. Please double-check and try again.";
                console.log(res.value);
                res.sendStatus(400).end();
            }
            else {
                console.log("here in ELse" + err)
                console.log("here in ELse" + message)
                // res.sendStatus(200)
                // res.value = booking;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(message))
            }
        })
    }
    else {
        Messages.find({
            owneremail: req.body.email
        }, function (err, message) {
            console.log("in func")
            if (err) {
                res.code = "400";
                res.value = "The email  you entered did not match our records. Please double-check and try again.";
                console.log(res.value);
                res.sendStatus(400).end();
            }
            else {
                console.log("here in ELse" + err)
                console.log("here in ELse" + message)
                // res.sendStatus(200)
                // res.value = booking;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(message))
            }
        })

    }

};