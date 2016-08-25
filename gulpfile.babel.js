import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import del from 'del';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';

const paths = {
  app: 'app',
  dist: 'public',
  entry: 'app/scripts/main.js',
  bundle: 'bundle.js',
  styles: 'app/styles',
  scripts: 'app/scripts',
  img: 'app/images',
  distStyles: 'public/styles',
  distJs: 'public/scripts',
  distImg: 'public/images'
};

const autoprefixerBrowsers = [
  'last 2 versions',
  'ie >= 9',
  'ie_mob >= 10',
  'safari >= 6',
  'ios >= 7',
  'android >= 4'
];

const reload = browserSync.reload;

const bundle = b => {
  return b.transform(babelify).bundle()
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.distJs))
    .pipe(reload({stream: true}));
};

gulp.task('copy', () => {
  gulp.src([
    paths.app + '/**/*.html',
    paths.img + '/**/*.{gif,png,jpeg}'
  ]).pipe(gulp.dest(paths.dist))
});

gulp.task('browserify', () => {
  const b = browserify({
    entries: paths.entry,
    debug: true
  });
  return bundle(b);
});

gulp.task('watchify', () => {
  const b = browserify({
    entries: paths.entry,
    debug: true,
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  const bundler = () => bundle(b);
  b.on('update', bundler);
  return bundler();
});

gulp.task('styles', () => {
  return gulp.src(paths.styles + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer({browsers: autoprefixerBrowsers}), cssnano]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distStyles));
});

gulp.task('clean', () => {
  return del([paths.dist + '/**/*']);
});

gulp.task('watchRes', () => {
  gulp.watch([paths.styles + '/**/*.scss'], ['styles']);
  gulp.watch([paths.app + '/**/*.html']).on('change', reload);
});

gulp.task('watch', ['clean'], cb => {
  browserSync.init({
    open: true,
    files: [paths.dist + '/**/*.css'],
    server: [paths.app, paths.dist]
  });
  runSequence(['watchify', 'styles', 'watchRes'], cb);
});

gulp.task('build', ['clean', 'copy'], cb => {
  runSequence(['browserify', 'styles'], cb);
});
