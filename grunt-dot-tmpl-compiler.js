var jsdom = require('jsdom'),
    doT = require('dot');

module.exports = function (grunt) {

    grunt.registerMultiTask('doTCompiler', 'Pre-compiles the doT html templates', function() {

        var opts = this.options({
            variableName: "_templates"
        });

        var countdownLatch = function(number, callback){
            var counter = number;

            return  {
                decrement: function(description){
                    counter--;

                    if(counter === 0) callback();
                }
            }
        };

        // parse a template file by searching all script tags.    
        var parseTemplateFile = function(html, callback) {
            jsdom.env({
                html:"<html><head></head><body><div>" + html + "</div></body></html>",
                done:function (errors, window) {
                    var fns = [];

                    var scripts = window.document.getElementsByTagName('script'),
                    i = scripts.length;

                    for (var j = 0; j < i; j++) {
                        var template = doT.template(scripts[j].innerHTML).toString(),
                        id = scripts[j].getAttribute("id");

                        template = template.replace(/function anonymous/g, 'function') + "\n";

                        fns.push({
                            id: id,
                            template: template
                        });
                    }

                    callback(fns);
                }
            });
        };    

        var compileTemplateFile = function(file, onDone) {
            var templateFile = grunt.file.read(file);
            console.log("Precompiling template file: " + file);

            parseTemplateFile(templateFile, onDone);
        };

        var writeToFile = function(templateFileContent, destinationFile) {
            var stringContent = templateFileContent.map(function(entry) {
                return "\"" + entry.id + "\" : " + entry.template;
            }).join(",\n");

            stringContent = "var " + opts.variableName + " = {\n" + stringContent + "\n};\n";

            console.log("Writing compiled templates to file: " + destinationFile);
            grunt.file.write(destinationFile, stringContent);
        };


        // main block
        this.files.forEach(function(files) {

            var destinationFile = files.dest,
                templateFileContent = [];

            var latch = new countdownLatch(files.src.length, function(){
                writeToFile(templateFileContent, destinationFile);
            });

            // Compile all files in the src array
            files.src.forEach(function(templateFile){
                compileTemplateFile(templateFile, function(fns){
                    templateFileContent = templateFileContent.concat(fns);
                    latch.decrement(templateFile + " is finished");
                });
            });
            
        });

    });
};
