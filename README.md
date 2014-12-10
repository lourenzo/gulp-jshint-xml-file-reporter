Gulp JSHint XML File Reporter
=============================
[![Build Status](https://travis-ci.org/lourenzo/gulp-jshint-xml-file-reporter.svg)](https://travis-ci.org/lourenzo/gulp-jshint-xml-file-reporter)

A JSHint reporter to be used by gulp-jshint that will provide a jslint.xml
file that can be used by CI tools as jenkins.

Install
-------

`npm install gulp-jshint-xml-file-reporter --save-dev`


Usage
-----

```javascript
var gulp=require('gulp'),
    jshint=require('gulp-jshint');

gulp.task('lint', function () {
    return gulp.src('./**/.js')
        .pipe(jshint())
        .pipe(jshint.reporter('gulp-jshint-file-reporter', {
            filePath: './jshint.xml'
        }));
});
```

Options
-------

Plugin options:

Type: `filePath`
Default: `'jshint.xml'`

Inspired by:
------------

* [Gulp JSHint File Reporter](https://github.com/spenceralger/gulp-jshint-file-reporter)
* [JSHint's jslint_xml reporter](https://github.com/jshint/jshint/blob/master/src/reporters/jslint_xml.js)

