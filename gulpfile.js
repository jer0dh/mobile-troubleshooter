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

gulp.task('clean', function(cb) {
      clean('./dist', cb);
});

gulp.task('test', function() {
   return gulp.src('src/scripts/tests/**/*.js')
       .pipe(jasmine());
});

gulp.task('lint', function() {
    gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    var b = browserify({
        entries: 'src/scripts/main.js',
        debug: true
    });

    b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.stream());
});

/*gulp.task('scripts', function() {
   gulp.src(['src/scripts/main.js'])  //Add more scripts in the order you want concated here
       .pipe(sourcemaps.init())
       .pipe(concat('main.js'))
       .pipe(uglify())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('dist/scripts'))
       .pipe(browserSync.stream());
});*/

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

gulp.task('default', ['styles', 'scripts', 'images'], function() {
   browserSync.init({
       server: './'
   });
    //gulp.watch('src/**/*', browserSync.reload);
    gulp.watch('src/styles/**/*.css', ['styles']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**.*', ['images']);
    gulp.watch('*.html', browserSync.reload);
});
