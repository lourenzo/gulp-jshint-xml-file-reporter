'use strict';

var should = require('should'),
    fs = require('fs'),
    xmlEmitter = require('../lib/jslint_xml_emitter.js');

describe('jslint_xml', function () {
    it('should transform JSHint results in jslint-compatible XML', function (done) {
        var errors = require('./fixtures/errors'),
            xmlText = xmlEmitter(errors);
        console.log(xmlText);
        fs.readFile('./test/fixtures/errors.xml', function (err, data) {
            if (err) return done(err);
            xmlText.should.equal(data.toString());
            done();
        });
    });
});