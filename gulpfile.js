var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

gulp.task('sass', function() {
    gulp.src('./css/style.scss')
        .pipe(sass({
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(autoprefixer("last 2 version", "ie 9"))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./css'));
});

gulp.task('js', function() {
    gulp.src(['./js/main.js'])
        .pipe(concat('all.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});

gulp.task('watch', function() {
    gulp.watch('./css/**/*.scss', ['sass']);
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./**/*.html');
});

gulp.task('build', ['sass', 'js']);

gulp.task('default', ['build', 'watch']);
