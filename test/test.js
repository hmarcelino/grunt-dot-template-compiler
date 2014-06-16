var assert = require("assert"),
	should = require('should'),
	path = require('path'),
	fs = require('fs'),
	exec = require('child_process').exec,
	execOptions = {
		cwd: path.join(__dirname)
	};

suite('grunt doTCompiler tests', function(){

	setup(function(){

		var deleteFolderRecursive = function(path) {
			if( fs.existsSync(path) ) {
				fs.readdirSync(path).forEach(function(file,index){

					var curPath = path + "/" + file;
				    if(fs.lstatSync(curPath).isDirectory()) { // recurse
				    	deleteFolderRecursive(curPath);

				    } else { // delete file
				      	fs.unlinkSync(curPath);
				    }
				  });

				fs.rmdirSync(path);
			}
		};

		var testDist = path.join(__dirname, 'dist');

		deleteFolderRecursive(testDist);	
	    
	    fs.mkdirSync(testDist);
	});

	test('can compile doT template files', function(done){
		exec('grunt doTCompiler:templates-no-options', execOptions, function(error, stdout) {

			if(error) return done(error);

			assert.ok(
				fs.existsSync(path.join(__dirname, 'dist', 'templates-no-options.js')),
				"there should be a file with the compiled templates"
			);

			done();
		});
	});

	test('can compile doT template files with configuration', function(done){
		exec('grunt doTCompiler:templates-with-variablename', execOptions, function(error, stdout) {

			if(error) return done(error);

			assert.ok(
				fs.existsSync(path.join(__dirname, 'dist', 'templates-with-variablename.js')),
				"there should be a file with the compiled templates"
			);

			done();
		});
	});

});