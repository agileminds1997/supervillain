var gulp = require('gulp'),
    pug = require('gulp-pug');

gulp.task('build', function() {
    return gulp.src('./templates/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('../public/dist'));
});
