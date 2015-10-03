var styleSheets = document.querySelectorAll('[rel="stylesheet"]');
var autoprefixerUrl = '';

// Get autoprefixer stylesheet url
for (var i = styleSheets.length - 1; i >= 0; i--) {
  var url = styleSheets[i].href;
  if (url.match(/autoprefixer.less.css/)) {
    autoprefixerUrl = url;
  }
}

testAsyncMulti("autoprefixer - stylesheet", [

  function (test, expect) {
    $.get(autoprefixerUrl, expect(function (stylesheet) {
      test.equal(/-webkit-user-select|-moz-user-select|-ms-user-select/.test(stylesheet), true);
    }))
  },
  function (test, expect) {
    $.get(autoprefixerUrl, expect(function (stylesheet) {
      test.equal(/-webkit-box-pack|-webkit-justify-content|-ms-flex-pack/.test(stylesheet), true);
    }))
  }

]);

