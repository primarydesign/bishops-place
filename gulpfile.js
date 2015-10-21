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
var ftp = require('vinyl-ftp');

var $server = require('./server.json');

gulp.task('default', ['serve']);
gulp.task('build', ['pages', 'styles', 'scripts', 'images']);
gulp.task('serve', function() {
  if (ENV === 'development') {
    browser.init(sync);
    gulp.watch(['./src/scss/*.scss'], ['styles']);
    gulp.watch(['./src/assets/scripts/**/*.js'], ['scripts']);
    gulp.watch(['./assets/img/*.{jpg,jpeg,png,svg}'], ['images']);
    gulp.watch(['./src/**/*.html','./src/assets/data/**/*'], ['pages']);
  } else {
    var conn = ftp.create(connection);
    deploy(conn, ['./app/assets/css/**/*.css']);
    deploy(conn, ['./app/assets/js/**/*.js']);
    deploy(conn, ['./app/assets/img/**/*.img']);
    deploy(conn, ['./app/**/*.html']);
  }
});
gulp.task('styles', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(souremaps.init())
    .pipe(preprocess())
    .pipe(cssmin())
    .pipe(souremaps.write())
    .pipe(gulp.dest('./app/assets/css/'))
    .pipe(browser.stream({once:true}));
});
gulp.task('scripts', function() {
  return gulp.src('./src/assets/scripts/**/*.js')
  .pipe(plumber())
  .pipe(souremaps.init())
  .pipe(uglify())
  .pipe(souremaps.write())
  .pipe(gulp.dest('./app/assets/js/'))
  .pipe(browser.stream({once:true}));
});
gulp.task('images', function() {
  return gulp.src('./assets/img/*.{jpg,jpeg,png,svg}')
  .pipe(plumber())
  .pipe(imagemin())
  .pipe(gulp.dest('./app/assets/img/'))
  .pipe(browser.stream({once:true}));
});
gulp.task('pages', function() {
  nunjucks(['src/partials/'], {watch: false});
  return gulp.src('./src/*.html')
  .pipe(plumber())
  .pipe(souremaps.init())
  .pipe(data(context))
  .pipe(render())
  .pipe(souremaps.write())
  .pipe(gulp.dest('./app/'))
  .pipe(browser.stream({once:true}));
});

/******************
  FLAGS & HELPERS
******************/
/**
 * Option Flags
 * * dev - ENV development
 * * stage - ENV staging
 * * pro - ENV production
 */
var ENV = !!argv.dev
  ? 'development'
  : !!argv.stage
    ? 'staging'
    : !!argv.pro
      ? 'production'
      : 'development';
var $_DEV = (ENV === 'development');
/**
 * Option Flags:
 * * cross - open multiple browsers
 * * dev - ENV development
 * * stage - ENV staging
 * * pro - ENV production
 * * o - open browser(s)
 * * t - tunnel server
 */
var sync = {
  ghostMode: false,
  notify: false,
  injectChanges: true,
  browser: !!argv.cross
    ? ['google chrome','firefox','safari']
    : 'google chrome',
  open: !!argv.o
    ? !!argv.t
      ? 'tunnel'
      : 'ui-external'
    : false,
  proxy: false,
  port: 9000,
  server: ENV === 'development'
    ? './app/'
    : false,
  tunnel: !!argv.t
    ? 'bishops-place'
    : false
};
var connection = {
  host: $_DEV ? '' : $server[ENV].host,
  user: $_DEV ? '' : $server[ENV].username,
  password: $_DEV ? '' : $server[ENV].password,
  port: $_DEV ? '' : $server[ENV].port || 21
}
var context = function(file) {
  return reddir('./src/assets/data/');
}
/**
 * Deploy files to server
 * @param conn - instance of vinyl-ftp
 * @param {array} src - source globs
 * @param {string} dest - destination directory
 */
var deploy = function(conn, globs) {
  console.log('Initiating deploy...');
  gulp.src(globs, {buffer: false})
    .pipe(conn.newer($server[ENV].path))
    .pipe(conn.dest($server[ENV].path));
}
var preprocess = lazypipe()
  .pipe(cssglob, {extensions: ['.scss']})
  .pipe(cssimport, {extensions: ['scss']})
  .pipe(sass);
