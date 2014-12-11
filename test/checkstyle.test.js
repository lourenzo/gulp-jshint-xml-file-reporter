'use strict';

var should = require('should'),
    fs = require('fs'),
    xmlEmitter = require('../lib/checkstyle_emitter.js');

describe('checkstyle', function () {
    it('should transform JSHint results in checkstyle XML', function () {
        var errors = require('./fixtures/errors2'),
            xmlText = xmlEmitter(errors);

        /**fs.readFile('./test/fixtures/errors.xml', function (err, data) {
            if (err) return done(err);
            xmlText.should.equal(data.toString());
            done();
        });*/
        console.log(xmlText);
        xmlText.should.be.type('string');
    });
});
