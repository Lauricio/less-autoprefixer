## DEPRECATED
This package has been deprecated starting **Meteor 1.3** release. Use core `less` package and [juliancwirko:postcss](https://github.com/juliancwirko/meteor-postcss) to get the same functionality.

## Less + Autoprefixer

This is a hacked meteor core `less` package extended to support  [AutoPrefixer](https://github.com/ai/autoprefixer) via `less-plugin-autoprefix`. It provides a compiler build plugin for the Meteor build tool. It
handles the compilation of `*.less` files to CSS and automatically applies vendor prefixes.

## Version history
### v2.5.0_3
- Meteor 1.2.0 support with cross package imports and caching
- New autoprefixer test

## Usage

If you want to use it in your app, just run:

```bash
meteor add lauricio:less-autoprefixer
```

If you want to use it for your package, add it in your package control file's
`onUse` block:

```javascript
Package.onUse(function (api) {
  ...
  api.use('lauricio:less-autoprefixer@2.5.0_3');
  ...
});
```

## Autoprefixer Configuration
You can pass custom options to `autoprefixer` by setting `AUTOPREFIXER_OPTIONS` environment variable: `export AUTOPREFIXER_OPTIONS='{ "browsers": ["Chrome 46", "iOS 9"]}'`

**Important!** When deploying to production `AUTOPREFIXER_OPTIONS` has to be set on the machine where you bundle your project, for example if you are using your *Mac* to deploy to *Modulus.io* you must set the environment variable on you *Mac* then run `modulus deploy`, setting it on modulus website will have no effect.

To unset environment variable run: `unset AUTOPREFIXER_OPTIONS`


If no `AUTOPREFIXER_OPTIONS` environment variable is found it fallbacks to `autoprefixer` default options: `["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"]`

For more info on `autoprefixer` options please check https://github.com/ai/browserslist#queries


## File types

There are two different types of files recognized by this package:

- Less sources (all `*.less` files that are not imports)
- Less imports:
  * files with the `import.less` extension: `*.import.less`
  * files in an `imports` directory: `**/imports/**/*.less`
  * marked as `isImport: true` in the package's `package.js` file:
    `api.addFiles('x.less', 'client', {isImport: true})`

The source files are compiled automatically. The imports are not loaded by
themselves; you need to import them from one of the source files to use them.

The imports are intended to keep shared mixins and variables for your project,
or to allow your package to provide several components which your package's
users can opt into one by one.

Each compiled source file produces a separate CSS file.  (The
`standard-minifiers` package merges them into one file afterwards.)

## Importing

You can use the regular `@import` syntax to import any Less files: sources or
imports.

Besides the usual way of importing files based on the relative path in the same
package (or app), you can also import files from other packages or apps with the
following syntax.

Importing styles from a different package:

```less
@import "{my-package:pretty-buttons}/buttons/styles.import.less"

.my-button {
  // use the styles imported from a package
  .pretty-button;
}
```

Importing styles from the target app:

```less
@import "{}/client/styles/imports/colors.less"

.my-nav {
  // use a color from the app style pallete
  background-color: @primary-branding-color;
}
```

Importing styles relative to the current package/app's root:

```less
@import "/path/to/style.import.less";
```

## Testing

Theres an **autoprefixer-plugin** test in addition to meteor core less import test.
Follow these steps to run the tests:

```
meteor create test-less && cd test-less
git clone https://github.com/Lauricio/less-autoprefixer packages/lauricio:less-autoprefixer
meteor test-packages  lauricio:less-autoprefixer
```

## Dependencies

This package uses the following npm modules:

- [less@2.5.0](https://www.npmjs.com/package/less)
- [less-plugin-autoprefix@1.4.2](https://www.npmjs.com/package/less-plugin-autoprefix)


### Contributors:
[Bass Jobsen](https://github.com/bassjobsen)

### LICENSE:
MIT
