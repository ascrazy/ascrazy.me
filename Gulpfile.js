var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var rename       = require('gulp-rename');
var livereload   = require('gulp-livereload');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var source       = require('vinyl-source-stream');
var browserify   = require('browserify');

var paths = {
  scripts: {
    src:     './src/scripts/main.js',
    out:     'build/scripts/',
    outName: 'main.js',
    watch:   'src/scripts/**/*.{js,jsx}',
    clean:   'build/scripts/main.js',
    reload:  'scripts/main.js'
  },
  styles: {
    src:     'src/styles/main.scss',
    out:     'build/styles',
    outName: 'main.css',
    watch:   'src/styles/**/*.{css,scss}',
    clean:   'build/styles/main.css',
    reload:  'styles/main.css'
  },
  images: {
    src:   'src/images/**/*',
    out:   'build/images/',
    watch: 'src/images/**/*',
    clean: 'build/images/*'
  },
  statics: {
    src:   'src/*.{html,xml,txt}',
    out:   'build/',
    watch: 'src/*.{html,xml,txt}',
    clean: 'build/*.{html,xml,txt}'
  }
}

function swallowError (error) {
  gutil.log(gutil.colors.yellow(error.toString()));
  this.emit('end');
}

gulp.task('scripts', [ 'clean-scripts' ], function(done) {
  var bundler = browserify({
    entries: [ paths.scripts.src ],
    debug: true
  }).bundle().on('error', swallowError);

  bundler.pipe(source('bundle.js'))
    .pipe(rename(paths.scripts.outName))
    .pipe(gulp.dest(paths.scripts.out))
    .on('finish', function(){
      livereload.changed(paths.styles.reload);
      done();
    });
});

gulp.task('clean-scripts', function(done) {
  del(paths.scripts.clean, done);
});

gulp.task('watch-scripts', [ 'scripts' ], function(){
  gulp.watch(paths.scripts.watch, [ 'scripts' ]);
});

gulp.task('styles', [ 'clean-styles' ], function(done) {
  gulp.src(paths.styles.src)
    .pipe(plumber(swallowError))
    .pipe(sass())
    .pipe(rename(paths.styles.outName))
    .pipe(gulp.dest(paths.styles.out))
    .on("finish", function(){
      livereload.changed(paths.styles.reload);
      done();
    });
});

gulp.task('clean-styles', function(done) {
  del(paths.styles.clean, done);
});

gulp.task('watch-styles', [ 'styles' ], function(){
  gulp.watch(paths.styles.watch, [ 'styles' ]);
});

gulp.task('images', [ 'clean-images' ], function(done) {
  gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.out))
    .on('finish', function(){
      livereload.reload();
      done()
    });;
});

gulp.task('clean-images', function(done) {
  del(paths.images.clean, done);
});

gulp.task('watch-images', [ 'images' ], function(){
  gulp.watch(paths.images.watch, [ 'images' ]);
});

gulp.task('statics', [ 'clean-statics' ], function(done) {
  gulp.src(paths.statics.src)
    .pipe(gulp.dest(paths.statics.out))
    .on('finish', function(){
      livereload.reload();
      done();
    });
});

gulp.task('clean-statics', function(done) {
  del(paths.statics.clean, done);
});

gulp.task('watch-statics', [ 'statics' ], function(){
  gulp.watch(paths.statics.watch, [ 'statics' ]);
});

gulp.task('build-all', [ 'scripts', 'styles', 'images', 'statics' ]);

gulp.task('clean-all', [ 'clean-scripts', 'clean-styles', 'clean-images', 'clean-statics' ]);

gulp.task('watch-all', [ 'watch-scripts', 'watch-styles', 'watch-images', 'watch-statics' ]);

gulp.task('default', [ 'build-all' ]);

gulp.task('serve', [ 'watch-all' ], function(done){
  livereload.listen({
    host: '0.0.0.0',
    port: 35729
  }, function(){
    livereload.reload();
    done();
  })
});
