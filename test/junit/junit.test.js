'use strict';

var should = require('should'),
    fs = require('fs'),
    xmlEmitter = require('../../lib/junit_emitter');

describe('junit', function () {
    var mockXMLResults;
    var xmlText;

    function getXMLMock(path, done) {
        fs.readFile(path, function (err, data) {
            if (err) return done (err);
            mockXMLResults = data.toString('utf8');
            done();
        });
    }

    describe('Given there are no failing tests', function () {
        before(function (done) {
            var path = './test/junit/fixtures/mock_empty.xml';
            getXMLMock(path, done);
        });

        beforeEach(function () {
            var errors = require('./fixtures/no_errors');

            xmlText = xmlEmitter.getHeader(errors);
            xmlText = xmlText.concat(xmlEmitter.formatContent(errors));
            xmlText = xmlText.concat(xmlEmitter.getFooter());
        });

        it('should generate a skeleton JSHint results in junit XML', function () {
            xmlText.should.equal(mockXMLResults);
        });
    });

    describe('Given there are failing tests', function () {
        before(function (done) {
            var path = './test/junit/fixtures/mock.xml';
            getXMLMock(path, done);
        });

        beforeEach(function () {
            var errors = require('./fixtures/errors');

            xmlText = xmlEmitter.getHeader(errors);
            xmlText = xmlText.concat(xmlEmitter.formatContent(errors));
            xmlText = xmlText.concat(xmlEmitter.getFooter());
        });

        it('should transform JSHint results in junit XML', function () {
            xmlText.should.equal(mockXMLResults);
        });
    });

});
