'use strict';

var fs = require('fs'),
    xmlEmitter = require('../../lib/jslint_emitter');
require('should');

describe('jslint', function () {
    var mockXMLResults;
    var xmlText;

    before(function (done) {
        fs.readFile('./test/jslint/fixtures/mock.xml', function (err, data) {
            if (err) return done(err);
            mockXMLResults = data.toString('utf8');
            done();
        });
    });

    beforeEach(function () {
        var errors = require('./fixtures/errors');

        xmlText = xmlEmitter.getHeader();
        xmlText = xmlText.concat(xmlEmitter.formatContent(errors));
        xmlText = xmlText.concat(xmlEmitter.getFooter());
    });

    it('should transform JSHint results in jslint XML', function () {
        xmlText.should.equal(mockXMLResults);
    });
});
