'use strict';

function escapeAttrValue(attrValue) {
    return (attrValue || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

exports.getHeader = function () {
    var out = [];
    out.push('<?xml version="1.0" encoding="utf-8"?>');
    out.push('<checkstyle version="4.3">');
    return out.join('\n');
};

exports.getFooter = function () {
    return '\n</checkstyle>\n';
};

exports.formatContent = function (results) {
    var out = [],
        files = {},
        issue, verbose = false,
        fileName, i;

    results.forEach(function (result) {
        result.file = result.file.replace(process.cwd() + '/', '');
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

    for (fileName in files) {
        if (files.hasOwnProperty(fileName)) {
            out.push('\n\t<file name="' + fileName + '">');
            for (i = 0; i < files[fileName].length; i++) {
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

    return out.join('\n');
};
