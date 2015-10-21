'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var jscsStylish = require('gulp-jscs-stylish');
var nodemon = require('gulp-nodemon');

var tasks = {};

tasks.jshintServer = function() {
    return gulp.src('**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
};

tasks.jscsServer = function() {
    return gulp.src('**/*.js')
    .pipe(jscs())
    .pipe(jshint.reporter(jscsStylish))
    .pipe(jshint.reporter('fail'));
};

tasks.watchServer = function() {
    nodemon({
        script: './app.js',
        watch: ['**/*.js']
    })
    .on('restart', function() {
        console.log("\n\nRestarted Server\n\n");
    });
};

gulp.task('watch-server', tasks.watchServer);

gulp.task('default', function() {});