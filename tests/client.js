'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _client = require('../dist/client');
var chai = require('chai');

var should = chai.should();

var _client2 = _interopRequireDefault(_client);

describe('Starting the Client with the Wrong Parameters', function () {
    // should.Throw has a bug in compararing exceptions.
    it("should throw 'NoPublicKey', complaining that it has no public key", function (done) {
        (function () {
            new _client2.Client()
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoPublicKey', still complaining that it has no public key, even if passed a number", function (done) {
        (function () {
            new _client2.Client(123)
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoSecretKey', complaining that it has no secret key", function (done) {
        (function () {
            new _client2.Client('asd')
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoSecretKey', still complaining that it has no secret key, even if passed a number", function (done) {
        (function () {
            new _client2.Client('asd', 123)
        }).should.Throw(Error);
        done();
    });
});

describe("Using the Client's method 'send', with the Wrong Parameters", function () {
    // should.Throw has a bug in compararing exceptions.
    it("should throw 'NoMail', complaining that it received no Mail instance", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.send();
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoMail', still complaining that it received no Mail instance, even if passed a number", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.send(123);
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoMail', still complaining that it received no Mail instance, even if passed a string", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.send('asd');
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NotMailInstance', complaining that it received no Mail instance", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.send({asd: 123});
        }).should.Throw(Error);
        done();
    });
});

describe("Using the Client's method 'searchEmails', with the Wrong Parameters", function () {
    // should.Throw has a bug in compararing exceptions.
    it("should throw 'NoSearchArgs', complaining that it received no SearchArgs instance", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.searchEmails();
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoSearchArgs', still complaining that it received no SearchArgs instance, even if passed a number", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.searchEmails(123);
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoSearchArgs', still complaining that it received no SearchArgs instance, even if passed a string", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.searchEmails('asd');
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoSearchArgsInstance', complaining that it received no SearchArgs instance", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.searchEmails({asd: 123});
        }).should.Throw(Error);
        done();
    });
});

describe("Using the Client's method 'getSpecificEmails', with the Wrong Parameters", function () {
    // should.Throw has a bug in compararing exceptions.
    it("should throw 'NoParamUuids', complaining that it received no Uuids", function (done) {
        (function () {
            var client = new _client2.Client('asd', 'asd');
            client.getSpecificEmails();
        }).should.Throw(Error);
        done();
    });
});
