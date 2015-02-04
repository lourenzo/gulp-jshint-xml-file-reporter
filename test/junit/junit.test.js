'use strict';

var should = require('should'),
    fs = require('fs'),
    xmlEmitter = require('../../lib/junit_emitter');

describe('junit', function () {
    var mockXMLResults;
    var xmlText;

    before(function (done) {
        fs.readFile('./test/junit/fixtures/mock.xml', function (err, data) {
            if (err) return done(err);
            mockXMLResults = data.toString('utf8');
            done();
        });
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
