var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
// var request = require('request');

var expect = chai.expect;

chai.use(chaiHttp);



it("Should check if Chat Message are being returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/chatmessage/5bd90ef9d07709044cba56b0')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})



it("Should check if Booked Properties is being returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/bookedproperties/lisa@gmail.com')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})

it("Should check Requested Property is returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/requestedproperty/5bde48efa3021a1fe17e01f6')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})

it("Should check for Profile if it is returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/profile/jane@gmail.com')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})


it("Should check for property listing if it is returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/propertylisting/jill@gmail.com')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})