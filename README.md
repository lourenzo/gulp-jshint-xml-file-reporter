Gulp JSHint XML File Reporter
=============================
[![Build Status](https://travis-ci.org/lourenzo/gulp-jshint-xml-file-reporter.svg)](https://travis-ci.org/lourenzo/gulp-jshint-xml-file-reporter)

Information
-----------

<table>
<tr>
<td>Package</td><td>gulp-jshint-xml-file-reporter</td>
</tr>
<tr>
<td>Description</td>
<td>A JSHint reporter to be used by gulp-jshint that will provide a jslint.xml
file that can be used by CI tools as jenkins.</td>
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
    jshint = require('gulp-jshint-xml-file-reporter'),
    jshintXMLFile =  require('gulp');

gulp.task('lint', function () {
    return gulp.src('./**/.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintXMLFile))
        .on('end', jshintXMLFile.writeFile({
            format: 'checkstyle'
            filePath: './jshint.xml'
        }));
});
```


Options
-------

```javascript
{
    format: String // (checkstyle | jshint_xml) defaults to checkstyle
    filePath: String // Path to write a file - defaults to jshint.xml    
}


```



Inspired on:
------------

* [Gulp JSHint File Reporter](https://github.com/spenceralger/gulp-jshint-file-reporter)
* [JSHint's jslint_xml reporter](https://github.com/jshint/jshint/blob/master/src/reporters/jslint_xml.js)
* [JSHint checkstyle reporter](https://github.com/mila-labs/jshint-checkstyle-file-reporter)

