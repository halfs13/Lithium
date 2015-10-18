'use strict';

var promise = require('bluebird');

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var jscsStylish = require('gulp-jscs-stylish');
var less = require('gulp-less');
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var nodemon = require('gulp-nodemon');

var tasks = {};

tasks.jshint = function() {
    return gulp.src('./thirdeyedesigns/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
};

tasks.jshintServer = function() {
    return gulp.src('./server/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
};

tasks.jscs = function() {
    return gulp.src('thirdeyedesigns/app/**/*.js')
    .pipe(jscs())
    .pipe(jshint.reporter(jscsStylish));
};

tasks.jscsServer = function() {
    return gulp.src('server/**/*.js')
    .pipe(jscs())
    .pipe(jshint.reporter(jscsStylish));
};

tasks.less = function() {
    return gulp.src('thirdeyedesigns/app/app.less')
    .pipe(less({
        dumpLineNumbers: "comments"
    }))
    .pipe(gulp.dest('thirdeyedesigns/app/'));
};

tasks.watchLess = function() {
    console.log("Not yet implemented");
};

tasks.cleanBower = function() {
    return del(['thirdeyedesigns/lib/*']);
};

tasks.buildBower = function() {
    tasks.cleanBower();
    return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('thirdeyedesigns/lib'));
};

tasks.deleteBowerComponents = function() {
    return promise.promisify(del)(['thirdeyedesigns/bower_components']);
};

tasks.watchServer = function() {
    nodemon({
        script: './server/app.js',
        watch: ['server/**/*.js']
    })
    .on('restart', function() {
        console.log("\n\nRestarted Server\n\n");
    });
};

gulp.task('bower', function() {
    //tasks.deleteBowerComponents()
    return tasks.buildBower();
});

gulp.task('less', tasks.less);
gulp.task('watch-less', tasks.watchLess);

gulp.task('watch-server', tasks.watchServer);

gulp.task('default', function() {});