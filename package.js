Package.describe({
  name: "lauricio:less-autoprefixer",
  summary: "The dynamic stylesheet language + Autoprefixer",
  version: "1.0.12",
  git: "https://github.com/lauricio/less-autoprefixer"
});

Package._transitional_registerBuildPlugin({
  name: "compileLess",
  use: [],
  sources: [
    'plugin/compile-less.js'
  ],
  npmDependencies: {
    "less": "1.7.5",
    "autoprefixer-core": "5.0.0"
  }
});

Package.on_test(function (api) {
  api.use(['test-helpers', 'tinytest', 'less', 'templating']);
  api.add_files(['less_tests.less', 'less_tests.js', 'less_tests.html',
                 'less_tests_empty.less'],
                'client');
});
