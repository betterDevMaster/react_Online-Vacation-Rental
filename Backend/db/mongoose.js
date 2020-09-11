var mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
//connect to mongo
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser: true })
    .then(
        () => { console.log("Mongoose is Connected") },
        err => { console.log("Mongoose is Not Connected" + err) }
    );
mongoose.set('useCreateIndex', true);
module.exports = { mongoose };