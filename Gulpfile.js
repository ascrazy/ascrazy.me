var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var runSequence  = require('run-sequence');
var rename       = require('gulp-rename');
var livereload   = require('gulp-livereload');
var plumber      = require('gulp-plumber');
var sftp         = require('gulp-sftp');
var sass         = require('gulp-sass');
var source       = require('vinyl-source-stream');
var browserify   = require('browserify');

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
    .pipe(rename('main.js'))
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

gulp.task('clean', function(done){
  del('build/*', done);
});

gulp.task('build', ['clean'], function(done){
  runSequence(['scripts', 'styles', 'images', 'copy'], done);
});

gulp.task('serve', [ 'build' ], function(done){
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

gulp.task('deploy', [ 'build' ], function(done){
  gulp.src('build/**/*')
    .pipe(sftp({
      host:       'death-star.ascrazy.me',
      user:       'root',
      remotePath: '/var/www/ascrazy.me',
      agent:      process.env.SSH_AUTH_SOCK
    }))
    .on("finish", done);
});
