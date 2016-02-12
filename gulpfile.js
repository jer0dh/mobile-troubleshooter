var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('rimraf');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var removeCode = require('gulp-remove-code');
var babelify = require('babelify');
var babel = require('gulp-babel');

gulp.task('clean', function(cb) {
      clean('./dist', function() {
          clean('./build', cb);
      });
});

/**
 * next three tasks: Creates a unit testing environment after converting all src js files from ES6 to ES5
 * Then it runs gulp-jasmine on the test scripts.  Proxyquire is used to stub out some functions, especially,
 * those that need access to a DOM.
 * */

gulp.task('cleanBuild', function(cb) {
   clean('./build', cb);
});

gulp.task('buildTestFolder',['cleanBuild'], function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/scripts/'));

});

gulp.task('unitTest', ['buildTestFolder'], function() {
   return gulp.src('build/scripts/tests/**/*.js')
       .pipe(jasmine());
});

/**
 * lint can be used on non ES6 javascript
 * */

gulp.task('lint', function() {
    gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 *  scripts runs browserify on the primary app file to bundle code into a single file
 *  It uses babelify to convert to ES5. It also strips out any testing code using comment
 *  enclosures left in the modules
 *  Creates a non minified copy and a minified copy
 * */
gulp.task('scripts', function() {
    var b = browserify({
        entries: 'src/scripts/app/logger.js',
        debug: true
    }).transform(babelify);

    b.bundle()
        .pipe(source('logger.js'))
        .pipe(buffer())
        .pipe(removeCode({ production: true}))
        .pipe(gulp.dest('dist/scripts/app'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/scripts/app'))
        .pipe(browserSync.stream());
});

/**
 * Any non module based javascript (no requires) so no browserify needed
 * */
gulp.task('other-scripts', function() {
        gulp.src('src/scripts/*.js')
            .pipe(babel())
            .pipe(removeCode({ production: true}))
            .pipe(gulp.dest('dist/scripts'))
            .pipe(rename({extname: '.min.js'}))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/scripts'))
            .pipe(browserSync.stream());
});


gulp.task('images', function() {
    gulp.src(['src/images/**/*'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream())
});

gulp.task('styles', function() {
    gulp.src(['src/styles/**/*.css','src/styles/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(postcss([require('precss'), require('autoprefixer')({ browsers: ['last 2 versions'] })]))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(rename(function(path) {
            path.extname='.css'
        }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['styles', 'scripts', 'images', 'unitTest', 'other-scripts'], function() {
   browserSync.init({
       server: './'
   });
    //gulp.watch('src/**/*', browserSync.reload);
    gulp.watch('src/styles/**/*.css', ['styles']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/app/**/*.js', ['scripts']);
    gulp.watch('src/scripts/tests/**/*.js', ['unitTest']);
    gulp.watch('src/scripts/*.js', ['other-scripts']);
    gulp.watch('src/images/**.*', ['images']);
    gulp.watch('*.html', browserSync.reload);
});
