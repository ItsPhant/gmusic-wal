const gulp     = require('gulp'),
      sass     = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      notify   = require('gulp-notify'),
      plumber  = require('gulp-plumber');
    
var onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Basso"
  })(err);
  this.emit('end')
}

gulp.task('styles', function() {
  return gulp.src('./src/gmusic-wal.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass({
      bundleExec: true,
      compass: false,
      includePaths: [
        'node_modules/'
      ],
      sourcemap: false,
      style: 'compressed'
    }))
    .pipe(cleanCSS({
      advanced: true,
      keepBreaks: false,
      keepSpecialComments: 0,
      mediaMerging: true,
      sourceMap: false,
      debug: true
    }, function(details) {
      console.log(`${details.name}: ${details.stats.originalSize}`)
      console.log(`${details.name}: ${details.stats.minifiedSize}`)
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', function() {
  gulp.watch(styles, ['styles'])
})
