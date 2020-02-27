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
  glob: '*.{scss,sass}', // which files to use as entry points
  watchGlob: '*/**/*.{scss,sass}', // additional files to watch for changes
  sourcemaps: true, // Not supported tet
  sassOptions: null, // https://sass-lang.com/documentation/js-api#options
};

// Create the gulp tasks based on the above options.
const cssTasks = sassTaskFactory(options);

// cssTasks is a two item array...
const [cssBundle, cssWatch] = cssTasks;
// ...but it also exposes the tasks as named properties.
const { bundle, watch } = cssTasks;
```
