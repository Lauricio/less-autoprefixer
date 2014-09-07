var fs = Npm.require('fs');
var path = Npm.require('path');
var less = Npm.require('less');
var Future = Npm.require('fibers/future');
var autoprefixer = Npm.require('autoprefixer-core');
var autoprefixerOptions = {};

Plugin.registerSourceHandler("less", {archMatching: 'web'}, function (compileStep) {
  var source = compileStep.read().toString('utf8');
  var options = {
    filename: compileStep.inputPath,
    // Use fs.readFileSync to process @imports. This is the bundler, so
    // that's not going to cause concurrency issues, and it means that (a)
    // we don't have to use Futures and (b) errors thrown by bugs in less
    // actually get caught.
    syncImport: true,
    paths: [path.dirname(compileStep._fullInputPath)] // for @import
  };

  var parser = new less.Parser(options);
  var astFuture = new Future;
  var sourceMap = null;
  try {
    parser.parse(source, astFuture.resolver());
    var ast = astFuture.wait();

    var css = ast.toCSS({
      sourceMap: true,
      writeSourceMap: function (sm) {
        sourceMap = JSON.parse(sm);
      }
    });
  } catch (e) {
    // less.Parser.parse is supposed to report any errors via its
    // callback. But sometimes, it throws them instead. This is
    // probably a bug in less. Be prepared for either behavior.
    compileStep.error({
      message: "Less compiler error: " + e.message,
      sourcePath: e.filename || compileStep.inputPath,
      line: e.line,
      column: e.column + 1
    });
    return;
  }

  // JSON validation and parsing helper function
  function parseOptions(options){
    try {
      var o = JSON.parse(options);
      if (o && typeof o === "object" && o !== null) {
        if (Object.keys(o)[0] !== "browsers"){
          console.log('\n less-autoprefixer: invalid AUTOPREFIXER_OPTIONS - "browsers" key not found, falling back to default options - { browsers: "> 1%, last 2 versions, Firefox ESR, Opera 12.1"}, more info - https://github.com/postcss/autoprefixer-core#usage');
        } else {
          return o; 
        }
      }
    }
    catch (e) {
      console.log("\n less-autoprefixer: invalid JSON format in AUTOPREFIXER_OPTIONS -", e)
      console.log(' less-autoprefixer: falling back to default options - { browsers: "> 1%, last 2 versions, Firefox ESR, Opera 12.1"}, more info - https://github.com/postcss/autoprefixer-core#usage');
    }
    return {};
  };

  // Parse Autoprefixer options enviroment variable
  if (process.env.AUTOPREFIXER_OPTIONS) {
    autoprefixerOptions = parseOptions(process.env.AUTOPREFIXER_OPTIONS);
  };


  // Applying Autoprefixer to compiled css
  css = autoprefixer(autoprefixerOptions).process(css).css;

  if (sourceMap) {
    sourceMap.sources = [compileStep.inputPath];
    sourceMap.sourcesContent = [source];
    sourceMap = JSON.stringify(sourceMap);
  }

  compileStep.addStylesheet({
    path: compileStep.inputPath + ".css",
    data: css,
    sourceMap: sourceMap
  });
});;

// Register import.less files with the dependency watcher, without actually
// processing them. There is a similar rule in the stylus package.
Plugin.registerSourceHandler("import.less", function () {
  // Do nothing
});

// Backward compatibility with Meteor 0.7
Plugin.registerSourceHandler("lessimport", function () {});
