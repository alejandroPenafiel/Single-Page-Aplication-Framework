var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var strip = require('gulp-strip-line');
var templateCache = require('gulp-angular-templatecache');

gulp.task('buildMenuTemplateCache', function(){
    return gulp.src(['.ext-modules/spaMenu/**/*.html']).pipe(templateCache({root: 'ext-modules/spaMenu/', module: 'spaMenu'})).pipe(gulp.dest('./dist/'));
});

gulp.task('buildDashboardTemplateCache', function(){
    return gulp 
        .src(['./ext-modules/spaDashboard/**/*.html'])
        .pipe(templateCache({
            root: 'ext-module/spaDashboard/',
            module: 'spaDashboard'
    }))
        .pipe(gulp.dest('./ext-modules/'));
});

gulp.task('buildFrameworkTemplateCache', function(){
    return gulp
        .src(['./ext-modules/spaFramework/**/*.html'])
        .pipe(templateCache({
            root: 'ext-modules/spaFramework/',
            module: 'spaFramework'
    }))
        .pipe(gulp.dest('./ext-modules/'));
});

gulp.task('buildJavaScript', function(){
    return gulp
        .src(['./ext-modules/**/*.js'])
        .pipe(angularFilesort())
        .pipe(strip(['use strict']))
        .pipe(concat('spaFramework.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('buildCSS', function(){
    return gulp
        .src(['./ext-modules/**/*.css'])
        .pipe(concat('spaFramework.css'))
        .pipe(gulp.dest('./dist/'));
});