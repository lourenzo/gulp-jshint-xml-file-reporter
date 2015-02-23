'use strict';

var fs = require('fs'),
    xmlEmitter = require('../../lib/junit_emitter');
require('should');

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

    function getResults(path) {
        var errors = require(path);
        var xml = xmlEmitter.getHeader(errors);
        xml = xml.concat(xmlEmitter.formatContent(errors));
        xml = xml.concat(xmlEmitter.getFooter());

        return xml;
    }

    describe('Given there are no failing tests', function () {
        before(function (done) {
            var path = './test/junit/fixtures/mock_empty.xml';
            getXMLMock(path, done);
        });

        beforeEach(function () {
            var path = './fixtures/no_errors';
            xmlText = getResults(path);
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
            var path = './fixtures/errors';
            xmlText = getResults(path);
        });

        it('should transform JSHint results in junit XML', function () {
            xmlText.should.equal(mockXMLResults);
        });
    });

});
