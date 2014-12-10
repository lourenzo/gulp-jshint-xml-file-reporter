/**
 * @fileOverview Convert JSHint's results to a jslint_xml-compatible format
 * @see https://github.com/jshint/jshint/blob/master/src/reporters/jslint_xml.js
 */
'use strict';
/**
 * @param    {Array}    results
 * @return {String} XML output
 */
module.exports = function (results) {
    var files = {},
    out = [],
    pairs = {
        '&': '&amp;',
        '"': '&quot;',
        '\'': '&apos;',
        '<': '&lt;',
        '>': '&gt;'
    },
    file, i, issue;

    function encode(s) {
        for (var r in pairs) {
            if (typeof s !== 'undefined') {
                s = s.replace(new RegExp(r, 'g'), pairs[r]);
            }
        }
        return s || '';
    }

    results.forEach(function (result) {
        result.file = result.file.replace(/^\.\//, '');
        if (!files[result.file]) {
            files[result.file] = [];
        }
        files[result.file].push(result.error);
    });

    out.push('<?xml version="1.0" encoding="utf-8"?>');
    out.push('<jslint>');

    for (file in files) {
        out.push('\t<file name="' + file + '">');
        for (i = 0; i < files[file].length; i++) {
            issue = files[file][i];
            out.push('\t\t<issue line="' + issue.line +
                '" char="' + issue.character +
                '" reason="' + encode(issue.reason) +
                '" evidence="' + encode(issue.evidence) +
                (issue.code ? '" severity="' + encode(issue.code.charAt(0)) : '') +
                '" />');
        }
        out.push('\t</file>');
    }

    out.push('</jslint>');

    return out.join('\n') + '\n';
};
