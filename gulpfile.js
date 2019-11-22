'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./client/src/styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./client/dist/css'));
});
 
/**
 * 
 * @param
 * @return
 */
gulp.task('sass:watch', function () {
  gulp.watch('./client/src/styles/**/*.scss', gulp.parallel('sass'));
});


// Default Task
gulp.task('default', gulp.parallel('sass', 'sass:watch'));

