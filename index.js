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
    return require('./lib/' + formatterPath + '_emitter');
}

/**
 * Write out a XML file for the encountered results
 */
exports.reporter = function (results, data, opts) {
    console.log(arguments);
    console.log('\n\n\n\n');
    opts = opts || {};
    opts.format = opts.format || 'checkstyle';
    opts.filePath = opts.filePath || 'jshint.xml';
    exports.opts = opts;
    exports.xmlEmitter = loadFormatter(opts.format);
    exports.out.push(exports.xmlEmitter.formatContent(results));
};

exports.writeFile = function () {
    var outStream = fs.createWriteStream(exports.opts.filePath);
    outStream.write(exports.xmlEmitter.getHeader());
    outStream.write(exports.out.join('\n'));
    outStream.write(exports.xmlEmitter.getFooter());
    reset();
};
