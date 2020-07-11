const
  del = require('del'),
  gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  cssnano = require('cssnano'),
  image = require('gulp-image'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  prefixer = require('autoprefixer'),
  srcmap = require('gulp-sourcemaps'),
  sassUnicode = require('gulp-sass-unicode'),
  browserSync = require('browser-sync').create(),
  readFileSync = require('graceful-fs').readFileSync,
  cssDeclarationSorter = require('css-declaration-sorter');

sass.compiler = require('node-sass');

const config = JSON.parse(readFileSync('./config.json'));
const library = config.global;
const path = config.path;

// CLEAN IMAGE
gulp.task('clean:image', function () {
  return del(path.image.dist);
})

// CLEAN ALL
gulp.task('clean:all', function () {
  return del(path.dist);
})

// IMPORT FONT ICON
gulp.task('import:font-icon', function (done) {
  if (library.fonts.length > 0) {
    return gulp.src(library.fonts)
      .pipe(gulp.dest(path.font.dist));
  }
  return done();
})

// IMPORT WEBFONT
gulp.task('import:webfont', function () {
  return gulp.src(path.font.src)
    .pipe(gulp.dest(path.font.dist));
})

// IMPORT IMAGE
gulp.task('import:image', function () {
  return gulp.src(path.image.src)
    // .pipe(image())
    .pipe(gulp.dest(path.image.dist));
})

// IMPORT PLUGIN JS
gulp.task('import:plugin-js', function (done) {
  if (library.js.length > 0) {
    return gulp.src(library.js, {
      allowEmpty: true
    })
      // .pipe(concat('global.min.js'))
      // .pipe(uglify())
      .pipe(gulp.dest(path.js.dist))
      .pipe(browserSync.reload({
        stream: true
      }))
  }
  return done();
})

// IMPORT PLUGIN CSS
gulp.task('import:plugin-css', function (done) {
  if (library.css.length > 0) {
    return gulp.src(library.css, {
      allowEmpty: true,
    })
      // .pipe(concat('global.min.css'))
      .pipe(gulp.dest(path.css.dist))
      .pipe(browserSync.reload({
        stream: true
      }))
  }
  return done();
})

// IMPORT JS
gulp.task('import:js', function () {
  return gulp.src(path.js.mainFile, {
    allowEmpty: true
  })
    .pipe(srcmap.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    // .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(srcmap.write('.'))
    .pipe(gulp.dest(path.js.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// IMPORT CSS
gulp.task('import:css', function () {
  return gulp.src(path.css.mainFile, {
    allowEmpty: true
  })
    .pipe(srcmap.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sassUnicode())
    .pipe(postcss([
      prefixer({
        cascade: false,
      }),
      // cssnano(),
      cssDeclarationSorter({
        order: 'smacss'
      })
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(srcmap.write('.'))
    .pipe(gulp.dest(path.css.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// IMPORT HTML
gulp.task('import:html', function () {
  return gulp.src([
    path.html.src,
    '!./src/views/\_*.pug' // ignore file _.pug
  ])
    .pipe(pug({
      pretty: '\t',
    }))
    .pipe(plumber())
    .pipe(gulp.dest(path.html.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// IMPORT ALL
gulp.task('import:all',
  gulp.parallel(
    'import:font-icon',
    'import:webfont',
    'import:image',
    'import:plugin-js',
    'import:plugin-css',
    'import:js',
    'import:css',
    'import:html'
  )
);

// RUN STATIC SERVER AND RELOAD WHEN CHANGING SOMETHING
gulp.task('server', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: path.dist,
    },
    port: config.PORT
  });
  gulp.watch(path.image.src, gulp.series('clean:image', 'import:image'));
  gulp.watch(path.html.allFile, gulp.series('import:html'));
  gulp.watch(path.css.src, gulp.series('import:css'));
  gulp.watch(path.js.mainFile, gulp.series('import:js'));
  gulp.watch('./dist/*').on('change', browserSync.reload);
});

// GULP DEFAULT
gulp.task('default',
  gulp.series(
    'clean:all',
    'import:all',
    'server'
  )
);
