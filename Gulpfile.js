var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var gulpif       = require('gulp-if');
var runSequence  = require('run-sequence');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var livereload   = require('gulp-livereload');
var plumber      = require('gulp-plumber');
var sftp         = require('gulp-sftp');
var rev          = require('gulp-rev');
var revReplace   = require('gulp-rev-replace');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss')
var autoprefixer = require('autoprefixer-core')
var minifyCss    = require('gulp-minify-css');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var browserify   = require('browserify');
var uglify       = require('gulp-uglify');

function swallowError (error) {
  gutil.log(gutil.colors.yellow(error.toString()));
  this.emit('end');
}

gulp.task('scripts', function(done) {
  var bundler = browserify({
    entries: [ './src/scripts/main.js' ],
    debug: true
  }).bundle().on('error', swallowError);

  bundler.pipe(source('bundle.js'))
    .pipe(plumber(swallowError))
    .pipe(rename('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(process.env.NODE_ENV === "production", uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/scripts/'))
    .on('finish', function(){
      livereload.changed('scripts/main.js');
      done();
    });
});

gulp.task('styles', function(done) {
  gulp.src('src/styles/main.scss')
    .pipe(plumber(swallowError))
    .pipe(sass())
    .pipe(rename('main.css'))
    .pipe(postcss([ autoprefixer({ "browsers": [ 'last 2 version' ] })]))
    .pipe(gulpif(process.env.NODE_ENV === "production", minifyCss()))
    .pipe(gulp.dest('build/styles'))
    .on("finish", function(){
      livereload.changed('styles/main.css');
      done();
    });
});

gulp.task('images', function(done){
  gulp.src([ 'src/images/**/*' ])
    .pipe(gulp.dest('build/images/'))
    .on('finish', function(){
      livereload.reload();
      done();
    });
});

gulp.task('copy', function(done) {
  gulp.src([ 'src/*.{html,txt,xml}' ])
    .pipe(gulp.dest('build/'))
    .on('finish', function(){
      livereload.reload();
      done();
    });
});

gulp.task('build-all', [ 'clean' ], function(done){
  runSequence(['scripts', 'styles', 'images', 'copy'], done);
});

gulp.task('serve', [ 'build-all' ], function(done){
  gulp.watch('src/scripts/**/*.{js,jsx}',  [ 'scripts' ]);
  gulp.watch('src/styles/**/*.{css,scss}', [ 'styles' ]);
  gulp.watch('src/*.{html,txt,xml}',       [ 'copy' ]);
  gulp.watch('src/images/**/*',            [ 'images' ]);

  livereload.listen({
    host: '0.0.0.0',
    port: 35729
  }, function(){
    livereload.reload();
    done();
  });
});

gulp.task('release-manifest', [ 'build-all' ], function(){
  return gulp.src('build/**/*.{js,css}')
    .pipe(rev())
    .pipe(gulp.dest('build/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/'));
});

gulp.task('release', [ 'release-manifest' ], function(){
  var manifest = gulp.src('build/rev-manifest.json');
  return gulp.src('build/**/*.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('build/'));
});

gulp.task('deploy', [ 'release' ], function(){
  return gulp.src('build/**/*')
    .pipe(sftp({
      host:       'death-star.ascrazy.me',
      user:       'root',
      remotePath: '/var/www/ascrazy.me',
      agent:      process.env.SSH_AUTH_SOCK
    }));
});

gulp.task('clean', function(done){
  del('build/*', done);
});
