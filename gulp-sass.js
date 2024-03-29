const { src, dest, watch } = require('gulp');
const { gulpReplace, normalizeOpts, prefixGlobs } = require('@hugsmidjan/gulp-utils');

const defaultOpts = {
  name: 'css', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/',
  glob: '*.{scss,sass}', // Glob|Array<Glob> – for entry points. Use '!' prefix to ignore
  watchGlob: '*/**/*.{scss,sass}', // Glob|Array<Glob> – additional files to watch for changes (or '!' ignore).
  sourcemaps: '.', // boolean or string (relative location)
  sassOptions: null, // https://sass-lang.com/documentation/js-api#options
  minify: true,
};

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = (opts) => {
  opts = normalizeOpts(opts, defaultOpts);

  const bundleTask = () => {
    return src(prefixGlobs(opts.glob, opts.src), {
      sourcemaps: !!opts.sourcemaps,
      base: opts.src,
    })
      .pipe(
        sass.sync(opts.sassOptions).on('error', sass.logError)
      )
      .pipe(
        postcss(
          opts.minify
            ? [autoprefixer(), cssnano({ preset: 'default' })]
            : [autoprefixer()]
        )
      )
      .pipe(gulpReplace(/ -no-merge/g, ''))
      .pipe(dest(opts.dist, { sourcemaps: opts.sourcemaps }));
  };
  bundleTask.displayName = opts.name;

  const watchTask = () => {
    let watchGlobs = opts.glob;
    if (opts.watchGlob) {
      watchGlobs = watchGlobs.concat(opts.watchGlob);
    }
    watch(prefixGlobs(watchGlobs, opts.src), bundleTask);
  };
  watchTask.displayName = opts.name + '_watch';

  const ret = [bundleTask, watchTask];
  ret.bundle = bundleTask;
  ret.watch = watchTask;

  return ret;
};
