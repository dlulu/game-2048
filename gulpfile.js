const gulp = require('gulp');
const bs = require('browser-sync').create();
const mocha = require('gulp-mocha');

gulp.task('default', function () {
    'use strict';
    bs.init({
        server: {
            baseDir: "",
            index: 'index.html'
        }
    });
    gulp.watch('./2048.js').on('change', bs.reload);
    gulp.watch('./index.html').on('change', bs.reload);
    gulp.watch('./2048.css').on('change', bs.reload);
});



gulp.task('test', () =>
    gulp.src('2048.test.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}))
);
