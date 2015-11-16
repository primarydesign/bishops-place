var gulp = require('gulp');
var argv = require('yargs').argv;
var browser = require('browser-sync').create();
var direque = require('require-dir');
var lazypipe = require('lazypipe');
var plumber = require('gulp-plumber');
/* processing */
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var cssglob = require('gulp-css-globbing');
var cssimport = require('gulp-cssimport');
var data = require('gulp-data');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var render = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var souremaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
/* configuration */
var nunjucks = render.nunjucks.configure;

/**
 * TABLE OF CONTENTS
 * * TASKS
 * * * pages - Compile Nunjucks to HTML
 * * * styles - Compile SCSS and compress CSS
 * * * scripts - Concatenate and compress scripts
 * * * images - Compress and optimize images
 * * * build - Compile build via previous tasks
 * * * serve - Initialize static server
 * * LAZYPIPES
 * * * preprocess - Compile SCSS and resolve file path
 * * VARIABLES
 * * * serverOptions - Configure BrowserSync instance
 */

/**
 * PAGES
 * Compile Nunjucks to HTML
 */
gulp.task('pages', function() {
  var context = direque('./src/assets/data/');
  nunjucks(['src/templates/'], {watch: false});
  return gulp.src('./src/*.html')
    .pipe(plumber())
    .pipe(render())
    .pipe(gulp.dest('./app/'))
    .pipe(browser.stream({once:true}));
});
/**
 * STYLES
 * Compile SCSS and compress CSS
 */
gulp.task('styles', function() {
  return gulp.src('./src/assets/scss/*.scss')
    .pipe(plumber())
    .pipe(souremaps.init())
    .pipe(souremaps.write())
    .pipe(preprocess())
    .pipe(cssmin())
    .pipe(gulp.dest('./app/assets/css/'))
    .pipe(browser.stream({once:true}));
});
/**
 * SCRIPTS
 * Concatenate and compress scripts
 */
gulp.task('scripts', function() {
  return gulp.src('./src/assets/js/**/*.js')
  .pipe(plumber())
  .pipe(souremaps.init())
  .pipe(concat('index.js'))
  .pipe(uglify())
  .pipe(souremaps.write())
  .pipe(gulp.dest('./app/assets/js/'))
  .pipe(browser.stream({once:true}));
});
/**
 * IMAGES
 * Compress and optimize images
 */
gulp.task('images', function() {
  return gulp.src('./assets/img/*.{jpg,jpeg,png,svg}')
  .pipe(plumber())
  .pipe(imagemin())
  .pipe(gulp.dest('./app/assets/img/'))
  .pipe(browser.stream({once:true}));
});
/**
 * BUILD
 * Compile build via previous tasks
 */
gulp.task('build', ['pages', 'styles', 'scripts', 'images']);
/**
 * SERVE
 * Initialize static server
 */
gulp.task('serve', function() {
	browser.init(serverOptions);
	gulp.watch(['./src/scss/**/*.scss'], ['styles']);
	gulp.watch(['./src/assets/scripts/**/*.js'], ['scripts']);
	gulp.watch(['./assets/img/**/*.{jpg,jpeg,png,svg}'], ['images']);
	gulp.watch(['./src/**/*.html','./src/assets/data/**/*'], ['pages']);
});


/**
 * PREPROCESS
 * Compile SCSS and resolve file path
 */
var preprocess = lazypipe()
  .pipe(cssglob, {extensions: ['.scss']})
  .pipe(cssimport, {extensions: ['scss']})
  .pipe(sass)
  .pipe(rename, function(path) {
    path.dirname = path.dirname.replace('..', '.');
  });

/**
 * SERVER OPTIONS
 * Configure BrowserSync instance
 */
var serverOptions = {
  server: {baseDir: 'app'},
  ghostMode: false,
  open: Boolean(argv.u)
    ? 'ui'
    : Boolean(argv.o)
      ? 'local'
      : false,
  browser: Boolean(argv.cross)
    ? ['google chrom', 'firefox', 'safari']
    : ['google chrome'],
  notify: false
}
