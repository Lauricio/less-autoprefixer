var fs = Npm.require('fs');
var path = Npm.require('path');
var less = Npm.require('less');
var Future = Npm.require('fibers/future');
var LessPluginAutoPrefix = Npm.require('less-plugin-autoprefix');
var autoprefixerOptions = {};



Plugin.registerSourceHandler("less", {archMatching: 'web'}, function (compileStep) {
  var source = compileStep.read().toString('utf8');

  
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
    
    var autoprefixPlugin = new LessPluginAutoPrefix(autoprefixerOptions);
    var options = {
    filename: compileStep.inputPath,
    plugins: [autoprefixPlugin],
    sourceMap: true,					
    paths: [path.dirname(compileStep._fullInputPath)] // for @import
    };

	less.render(source, options,function(error,output){
	compileStep.addStylesheet({
				path: compileStep.inputPath + ".css",
				data: output.css,
				sourceMap: JSON.stringify(output.map)																									
			  });
	});


});

// Register import.less files with the dependency watcher, without actually
// processing them. There is a similar rule in the stylus package.
Plugin.registerSourceHandler("import.less", function () {});

// Backward compatibility with Meteor 0.7
Plugin.registerSourceHandler("lessimport", function () {});
