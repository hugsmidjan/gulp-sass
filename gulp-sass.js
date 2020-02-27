const { src, dest, watch } = require('gulp');
const { gulpReplace, normalizeOpts, prefixGlobs } = require('@hugsmidjan/gulp-utils');

const defaultOpts = {
  name: 'css', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/',
  glob: '*.{scss,sass}', // which files to glob up as entry points
  watchGlob: '*/**/*.{scss,sass}', // additional files to watch for changes
  sourcemaps: '.',
  sassOptions: null, // https://sass-lang.com/documentation/js-api#options
};

const sass = require('gulp-sass');
sass.compiler = require('sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const Fiber = require('fibers');

module.exports = (opts) => {
  opts = normalizeOpts(opts, defaultOpts);

  const bundleTask = () => {
    return src(prefixGlobs(opts.glob, opts.src), {
      sourcemaps: !!opts.sourcemaps,
      base: opts.src,
    })
      .pipe(
        sass({
          ...opts.sassOptions,
          fiber: Fiber,
        }).on('error', sass.logError)
      )
      .pipe(
        postcss([
          autoprefixer(),
          cssnano({
            preset: [
              'default',
              {
                discardUnused: true,
                mergeIdents: true,
                cssDeclarationSorter: { keepOverrides: true },
              },
            ],
          }),
        ])
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
