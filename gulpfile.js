var gulp = require('gulp');
var lazypipe = require('lazypipe');
var htmlmin = require('gulp-htmlmin');
var plumber = require('gulp-plumber');
var render = require('gulp-nunjucks-render');
var nunjucks = render.nunjucks.configure;
var reddir = require('require-dir');
var souremaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var cssglob = require('gulp-css-globbing');
var cssimport = require('gulp-cssimport');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var data = require('gulp-data');
var sass = require('gulp-sass');
var argv = require('yargs').argv;
var browser = require('browser-sync').create();

var bsOpen = Boolean(argv.o);
var bsTunnel = Boolean(argv.t);
var bsAll = Boolean(argv.all);
var preprocess = lazypipe()
  .pipe(cssglob, {extensions: ['.scss']})
  .pipe(cssimport, {extensions: ['scss']})
  .pipe(sass);

gulp.task('default', ['serve']);
gulp.task('serve', function() {
  browser.init({
    server: './app/',
    ghostMode: false,
    tunnel: bsTunnel
      ? 'bishopsplace'
      : false,
    open: bsTunnel
      ? 'tunnel'
      : (bsOpen
        ? 'external'
        : false
      ),
    browser: bsAll
      ? ['google chrome','firefox','safari']
      : 'google chrome',
    notify: false,
    injectChanges: true
  });
  gulp.watch(['./src/scss/*.scss'],'styles');
  gulp.watch(['./src/assets/scripts/**/*.js'],'scripts');
  gulp.watch(['./assets/img/*.{jpg,jpeg,png,svg}'],'images');
  gulp.watch(['./src/**/*.html','./src/assets/data/**/*'],'pages');
});
gulp.task('styles', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(souremaps.init())
    .pipe(preprocess())
    .pipe(cssmin())
    .pipe(souremaps.write())
    .pipe(gulp.dest('./app/assets/css/'));
});
gulp.task('scripts', function() {
  return gulp.src('./src/assets/scripts/**/*.js')
  .pipe(plumber())
  .pipe(souremaps.init())
  .pipe(uglify())
  .pipe(souremaps.write())
  .pipe(gulp.dest('./app/assets/js/'));
});
gulp.task('images', function() {
  return gulp.src('./assets/img/*.{jpg,jpeg,png,svg}')
  .pipe(plumber())
  .pipe(imagemin())
  .pipe(gulp.dest('./app/assets/img/'));
});
gulp.task('pages', function() {
  nunjucks(['src/partials/'], {watch: false});
  return gulp.src('./src/*.html')
  .pipe(plumber())
  .pipe(souremaps.init())
  .pipe(data(context))
  .pipe(render())
  .pipe(souremaps.write())
  .pipe(gulp.dest('./app/'));
});

function context(file) {
  return reddir('./src/assets/data/');
}
