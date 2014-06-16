module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		"doTCompiler" : {

			"templates-no-options": {
				src: '*.tmpl.doT',
				dest: 'dist/templates-no-options.js'
			},

			"templates-with-variablename": {
				src: '*.tmpl.doT',
				dest: 'dist/templates-with-variablename.js',
				options: {
                    variableName: "_htmlTemplates"
                }
			}

		}
	});

	grunt.loadTasks('../');

	grunt.registerTask('default', ['doTCompiler']);
};