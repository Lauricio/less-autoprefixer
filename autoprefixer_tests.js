Tinytest.add("autoprefixer - prefixing", function (test) {

  var stylesheets = document.styleSheets;
  var stylesheetsList = Object.keys(stylesheets);
  var styleSheet = {};

  // Find the right stylesheet
  for (var i = stylesheetsList.length - 1; i >= 0; i--) {
    if (new RegExp('autoprefixer.less.css').test(stylesheets[stylesheetsList[i]].href)) {
      styleSheet = stylesheets[stylesheetsList[i]]
    }
  }

  var stylesheetRules = styleSheet.cssRules;
  var rulesList = Object.keys(stylesheetRules);

  try {
    var t = function (selector, prefixedProp) {
      var rgx = new RegExp(prefixedProp);
      // find the right css selector and test if it has prefixed properties
      for (var i = rulesList.length - 1; i >= 0; i--) {
        if (stylesheetRules[rulesList[i]].selectorText === selector) {
          test.equal(rgx.test(stylesheetRules[rulesList[i]].cssText), true);
        }
      }

    };
    // Note that browsers don't include other vendor prefixes even if those are generated by autoprefixer, in other words if you run tests on webkit browser it wont have -moz- prefixed properties in styleheets
    t('.ap1', '-webkit-box-pack|-webkit-justify-content|-ms-flex-pack|-webkit-user-select|-moz-user-select|-ms-user-select|-webkit-clip-path|-webkit-appearance|-moz-appearance');

  } finally {

  }
});