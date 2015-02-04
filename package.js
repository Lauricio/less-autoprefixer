Package.describe({
  name: "lauricio:less-autoprefixer",
  summary: "The dynamic stylesheet language + Autoprefixer",
  version: "1.0.14",
  git: "https://github.com/lauricio/less-autoprefixer"
});

Package._transitional_registerBuildPlugin({
  name: "compileLess",
  use: [],
  sources: [
    'plugin/compile-less.js'
  ],
  npmDependencies: {
    "less": "2.2.0",
    "less-plugin-autoprefix": "1.3.0"
  }
});

Package.on_test(function (api) {
  api.use(['test-helpers', 'tinytest', 'less', 'templating']);
  api.add_files(['less_tests.less', 'less_tests.js', 'less_tests.html',
                 'less_tests_empty.less'],
                'client');
});
