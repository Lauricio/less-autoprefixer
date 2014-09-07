# Less 1.7.4 + autoprefixer-core 3.0.1

This is a hacked native LESS package with [AutoPrefixer](https://github.com/ai/autoprefixer) support, a temporary solution until multiple source handlers are implemented in Meteor [#1207](https://github.com/meteor/meteor/pull/1207).

## Install

    meteor add lauricio:less-autoprefixer

## Configuration
You can pass custom options to `autoprefixer` by setting `AUTOPREFIXER_OPTIONS` environment variable: `export AUTOPREFIXER_OPTIONS='{ "browsers": ["Chrome 36", "iOS 7"]}'`

**Important!** When deploying to production `AUTOPREFIXER_OPTIONS` has to be set on the machine where you bundle your project, for example if you are using your *Mac* to deploy to *Modulus.io* you must set the environment variable on you *Mac* then run `modulus deploy`, setting it on modulus website will have no effect.

To unset environment variable run: `unset AUTOPREFIXER_OPTIONS`


If no `AUTOPREFIXER_OPTIONS` environment variable is found it fallbacks to `autoprefixer` default options: `["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"]`

For more info on `autoprefixer` options please check https://github.com/ai/autoprefixer#browsers
