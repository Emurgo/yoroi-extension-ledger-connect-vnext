'use strict';

const gulp        = require('gulp');
const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();

const paths = {
  scripts: {
    source: './src/main.js',
    destination: './',
    filename: 'bundle.js',
    watch: ['./src/*']
  }
}

gulp.task('scripts', function() {

  const bundle = browserify({
    entries: [paths.scripts.source],
    debug: false,
    transform: [babelify],
  });

  return bundle.bundle()
    .pipe(source(paths.scripts.filename))
    .pipe(gulp.dest(paths.scripts.destination))
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts.watch, ['scripts']);
});


gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./",
          port: 9000,
          https: true
      }
  });
});

gulp.task('default', ['scripts', 'watch', 'browser-sync']);