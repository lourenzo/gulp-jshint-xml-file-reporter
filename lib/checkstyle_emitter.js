'use strict';

function escapeAttrValue(attrValue) {
    return (attrValue || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

module.exports = function (results) {
    var out = [],
        files = {},
        issue, verbose = false;

    results.forEach(function (result) {
        result.file = result.file.replace(/^\.\//, '');
        if (!files[result.file]) {
            files[result.file] = [];
        }
        files[result.file].push({
            severity: 'error',
            line: result.error.line,
            column: result.error.character,
            message: result.error.reason + ((verbose) ?
                ' (' + result.error.code + ')' : ''),
            source: 'jshint.' + result.error.code
        });
    });

    out.push('<?xml version="1.0" encoding="utf-8"?>');
    out.push('<checkstyle version="4.3">');

    for (var fileName in files) {
        if (files.hasOwnProperty(fileName)) {
            out.push('\t<file name="' + fileName + '">');
            for (var i = 0; i < files[fileName].length; i++) {
                issue = files[fileName][i];
                out.push(
                    '\t\t<error ' +
                    'line="' + issue.line + '" ' +
                    'column="' + issue.column + '" ' +
                    'severity="' + issue.severity + '" ' +
                    'message="' + escapeAttrValue(issue.message) + '" ' +
                    'source="' + escapeAttrValue(issue.source) + '" ' +
                    '/>'
                );
            }
            out.push('\t</file>');
        }
    }

    out.push('</checkstyle>');

    return out.join('\n');
};
