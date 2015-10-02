var styleSheets = document.querySelectorAll('[rel="stylesheet"]');
var autoprefixerUrl = '';

// Get autoprefixer stylesheet url
for (var i = styleSheets.length - 1; i >= 0; i--) {
  var url = styleSheets[i].href;
  if (new RegExp('autoprefixer.less.css').test(url)) {
    autoprefixerUrl = url;
  }
}

testAsyncMulti("autoprefixer - stylesheet", [

  function (test, expect) {
    $.get(autoprefixerUrl, expect(function (res) {
      test.equal(/-webkit-user-select|-moz-user-select|-ms-user-select/.test(res), true);
    }))
  },
  function (test, expect) {
    $.get(autoprefixerUrl, expect(function (res) {
      test.equal(/-webkit-box-pack|-webkit-justify-content|-ms-flex-pack/.test(res), true);
    }))
  }

]);

