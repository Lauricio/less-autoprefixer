Package.describe({
  summary: "The dynamic stylesheet language + Autoprefixer",
  version: "1.0.7",
  git: "https://github.com/lauricio/less-autoprefixer"
});

Package._transitional_registerBuildPlugin({
  name: "compileLess",
  use: [],
  sources: [
    'plugin/compile-less.js'
  ],
  npmDependencies: {
    // Fork of 1.7.4 deleted large unused files in dist directory.
    "less": "https://github.com/meteor/less.js/tarball/4ccb7fc94321a6a85d592cdf46579425add1570f", "autoprefixer-core": "3.0.1"
  }
});

Package.on_test(function (api) {
  api.use(['test-helpers', 'tinytest', 'less', 'templating']);
  api.add_files(['less_tests.less', 'less_tests.js', 'less_tests.html',
                 'less_tests_empty.less'],
                'client');
});
