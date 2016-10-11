//basic gulp packages
var gulp = require('gulp');
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

//extra for building/deployment
var runSequence = require('run-sequence');

//for react
var buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');


//global build paths
var paths = {
    src: 'src/',
    dist: 'public/',
    react: {
        app: './app/App.js',
        src: ['./app/**/*.js'],
        dist: 'public/js/'
    }
};

gulp.task('react', function() {
  setTimeout(function(){
    return browserify(paths.react.app)
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.react.dist))
  }, 200);
});

//setup watch tasks
gulp.task('watch', function () {
  gulp.watch(paths.react.src, ['react']);
});

//the default gulp task
gulp.task('default', function(callback) {
  runSequence('react', 'watch', callback);
});