# Less 1.7.5 + autoprefixer-core 5.0.0

This is a hacked native LESS package with [AutoPrefixer](https://github.com/ai/autoprefixer) support, a temporary solution until multiple source handlers are implemented in Meteor [#51](https://github.com/MeteorCommunity/discussions/issues/51).

## Install

    meteor add lauricio:less-autoprefixer

## Configuration
You can pass custom options to `autoprefixer` by setting `AUTOPREFIXER_OPTIONS` environment variable: `export AUTOPREFIXER_OPTIONS='{ "browsers": ["Chrome 36", "iOS 7"]}'`

**Important!** When deploying to production `AUTOPREFIXER_OPTIONS` has to be set on the machine where you bundle your project, for example if you are using your *Mac* to deploy to *Modulus.io* you must set the environment variable on you *Mac* then run `modulus deploy`, setting it on modulus website will have no effect.

To unset environment variable run: `unset AUTOPREFIXER_OPTIONS`


If no `AUTOPREFIXER_OPTIONS` environment variable is found it fallbacks to `autoprefixer` default options: `["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"]`

For more info on `autoprefixer` options please check https://github.com/ai/autoprefixer#browsers

###From meteor less package:

# less

[LESS](http://lesscss.org/) extends CSS with dynamic behavior such as variables, mixins,
operations and functions. It allows for more compact stylesheets and
helps reduce code duplication in CSS files.

With the `less` package installed, `.less` files in your application are
automatically compiled to CSS and the results are included in the client CSS
bundle.

If you want to `@import` a file, give it the extension `.import.less`
to prevent Meteor from processing it independently.