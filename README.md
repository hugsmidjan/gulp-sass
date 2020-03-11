# @hugsmidjan/gulp-sass

```
npm install --save-dev @hugsmidjan/gulp-sass
```

## Usage

```js
const [cssBundle, cssWatch] = require('@hugsmidjan/gulp-sass')(opts);
```

## API / Advanced usage

```js
const sassTaskFactory = require('@hugsmidjan/gulp-sass');

const options = {
  // These are the defaults:
  name: 'css', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/',
  glob: '*.{scss,sass}', // Glob|Array<Glob> – for entry points. Use '!' prefix to ignore
  watchGlob: '*/**/*.{scss,sass}', // Glob|Array<Glob> – additional files to watch for changes (or '!' ignore).
  sourcemaps: '.', // boolean or string (relative location)
  sassOptions: null, // https://sass-lang.com/documentation/js-api#options
  minify: true,
};

// Create the gulp tasks based on the above options.
const cssTasks = sassTaskFactory(options);

// cssTasks is a two item array...
const [cssBundle, cssWatch] = cssTasks;
// ...but it also exposes the tasks as named properties.
const { bundle, watch } = cssTasks;
```
