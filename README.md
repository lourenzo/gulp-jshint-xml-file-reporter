Gulp JSHint XML File Reporter
=============================
[![Build Status](https://travis-ci.org/shnist/gulp-jshint-xml-file-reporter.svg)](https://travis-ci.org/shnist/gulp-jshint-xml-file-reporter)

Information
-----------

<table>
    <tr>
        <td>Package</td>
        <td>gulp-jshint-xml-file-reporter</td>
    </tr>
    <tr>
        <td>Description</td>
        <td>
            A JSHint reporter to be used by `gulp-jshint` that will provide a jslint.xml file that can be used by CI tools as jenkins.
        </td>
    </tr>
    <tr>
        <td>Node Version</td>
        <td>>= 0.4</td>
    </tr>
</table>

Install
-------

`npm install gulp-jshint-xml-file-reporter --save-dev`


Usage
-----

```javascript
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jshintXMLReporter = require('gulp-jshint-xml-file-reporter');

gulp.task('lint', function () {
    return gulp.src('./**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintXMLReporter))
        .on('end', jshintXMLReporter.writeFile({
            format: 'checkstyle',
            filePath: './jshint.xml'
        }));
});
```
Options
-------

```javascript
{
    format: String // (checkstyle | jshint_xml | junit) defaults to checkstyle
    filePath: String // Path to write a file - defaults to jshint.xml
}
```

Release History
---------------
- 2015-02-09    `0.4.2` Ensured that an empty test case is added for junit outputs when there are no failing tests
- 2015-02-06    `0.4.1` Bugfix for JUnit reporter for integration with Atlassian Bamboo
- 2015-02-04    `0.4.0` Added JUnit Emitter
- 2015-02-04    `0.3.2` Added line break after first jslint tag on jslint emitter


Inspired by:
------------

* [Gulp JSHint File Reporter](https://github.com/spenceralger/gulp-jshint-file-reporter)
* [JSHint's jslint_xml reporter](https://github.com/jshint/jshint/blob/master/src/reporters/jslint_xml.js)
* [JSHint checkstyle reporter](https://github.com/mila-labs/jshint-checkstyle-file-reporter)

