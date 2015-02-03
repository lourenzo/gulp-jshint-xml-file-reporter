/*jshint node:true */
"use strict";


exports.getHeader = function (data) {
    var numberOfFailures = 0;
    console.log('data', data);
    var out = [];

    data.forEach(function (item) {
        numberOfFailures += item.length;
    });

    out.push('<?xml version="1.0" encoding="utf-8"?>');
    out.push('<testsuite name="jshint" failures="' + numberOfFailures + '">\n');
    return out.join('\n');
};

exports.getFooter = function () {
    return '</testsuite>\n';
};

function encode(s) {
    var pairs = {
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
        "<": "&lt;",
        ">": "&gt;"
    };

    for (var r in pairs) {
        if (typeof(s) !== "undefined") {
            s = s.replace(new RegExp(r, "g"), pairs[r]);
        }
    }

    return s || "";
}

function failure_message(failures) {
    var count = failures.length;
    var failureMessage = '';

    if (count === 1) {
        failureMessage = "1 JSHINT Failure";
    } else {
        failureMessage = count + " JSHint Failures";
    }

    return failureMessage;
}

function failure_details(failures) {
    var msg = [];
    var item;

    for (var i = 0; i < failures.length; i++) {
        item = failures[i];
        msg.push('\t\t\t' + (i+1) + ". line " + item.line + ", char " + item.character + ": " + encode(item.reason));
    }

    return msg.join("\n");
}

exports.formatContent = function (results) {
    var out = [];
    var files = {};

    results.forEach(function (result) {
        result.file = result.file.replace(/^\.\//, '');
        if (!files[result.file]) {
            files[result.file] = [];
        }
        files[result.file].push(result.error);
    });

    // we need at least 1 empty test
    if (!results.length) {
        out.push("\t<testcase name=\"" + suite + "\" />");
    }

    for (var file in files) {
        out.push("\t<testcase name=\"" + file + "\">");
        out.push("\t\t<failure message=\"" + failure_message(files[file]) + "\">");
        out.push(failure_details(files[file]));
        out.push("\t\t</failure>");
        out.push("\t</testcase>\n");
    }

    return out.join("\n");
};
