'use strict';

require('should');
var fs = require('fs');
var index = require('../../index');

describe("Given that there isn't the specified output report path", function () {
    before(function (done) {
        index.writeFile({
            alwaysReport: true,
            filePath: 'test_out/jshint.xml'
        })();
        done();
    });

    it('should create the specified path', function () {
        var stat = fs.statSync('test_out');
        return stat.isDirectory().should.be.ok;
    });

    after(function (done) {
        fs.rmdirSync('test_out');
        done()
    });
});