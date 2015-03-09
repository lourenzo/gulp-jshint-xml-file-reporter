'use strict';

var fs = require('fs');

function reset() {
    exports.out = [];
    exports.xmlEmitter = null;
    exports.opts = {};
} reset();

/**
 * Load a formatter
 * @param  {String} formatterPath
 * @return
 */
function loadFormatter(formatterPath) {
    try {
        // @TODO: deprecate
        formatterPath = (formatterPath === 'jslint_xml')? 'jslint': formatterPath;
        return require('./lib/' + formatterPath + '_emitter');
    } catch (e) {
        console.error('Unrecognized format: %s', formatterPath);
        console.error('This emitter was not found on lib folder.\nYou can always create yours :)\n');
        throw e;
    }
}

/**
 * Write out a XML file for the encountered results
 * @param  {Array}  results
 */
exports.reporter = function (results) {
    exports.out.push(results);
};

exports.writeFile = function (opts) {
    opts = opts || {};
    opts.filePath = opts.filePath || 'jshint.xml';
    opts.format = opts.format || 'checkstyle';
    opts.alwaysReport = opts.alwaysReport || false;
    exports.xmlEmitter = loadFormatter(opts.format);
    return function () {
        if (!opts.alwaysReport && !exports.out.length) {
            reset();
            return;
        }
        var outStream = fs.createWriteStream(opts.filePath);
        outStream.write(exports.xmlEmitter.getHeader());
        exports.out.forEach(function (item) {
            outStream.write(exports.xmlEmitter.formatContent(item));
        });
        outStream.write(exports.xmlEmitter.getFooter());
        reset();
    };
};
