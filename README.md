# essential-web-app-starter-kit

Essential starter kit for web application.

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

## License

[MIT License](http://opensource.org/licenses/MIT)
