'use strict';

var fs = require('fs'),
    xmlEmitter = require('./lib/jslint_xml_emitter.js'),
    defaultFilePath = 'jshint.xml',
    outStream, filePath;

/**
 * Write out a XML file for the encountered results
 */
module.exports = function (results, data, opts) {
    opts = opts || {};
    opts.filePath = opts.filePath || defaultFilePath;

    if (outStream && filePath !== opts.filePath) {
        outStream.end();
        outStream = null;
    }

    if (!outStream) {
        outStream = fs.createWriteStream(opts.filePath);
        filePath = opts.filePath;
    }

    var xmlData = xmlEmitter(results);

    outStream.write(xmlData);
};
