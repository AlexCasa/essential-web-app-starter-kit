# EWASK

Essential starter kit for web application.

## Features

- Compiles Scss to CSS
- Scss live reload
- CSS Autoprefixer
- CSS Minifier
- Watchify & Browserify

## Usage

- Install dependencies: `npm install` or `yarn`

- Run dev: `gulp watch`

- Run dist: `gulp build`

## Conventions

The project must have the following structure:
```
  app/
    scripts/
    styles/
    images/
  public/
      ...
```
Note that `app/scripts/main.js` act as the build entry, recursively all the required module are bundle up into `public/bundle.js`.
You need `.babelrc` file to compile `gulpfile.babel.js` from ES6 to ES5.

## License

[MIT License](http://opensource.org/licenses/MIT)
