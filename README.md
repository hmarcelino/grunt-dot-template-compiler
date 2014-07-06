## Grunt doT template compiler

A plugin that compiles files with doT templates into javascript objects. The motivation is that this work can be done while building the project.

You create multiple template files with several `script` blocks for each template. The template name is the function name. After compile you can add the js generated file to you project.

### Example:

**Grunt config**:
     
```json
grunt.initConfig({
	"doTCompiler" : {
		"templates-with-variablename": {
			src: '*.tmpl.doT',
			dest: 'dist/templates-with-variablename.js',
			options: {
				variableName: "_htmlTemplates"
			}
		}
	}
});
```     
**Templates**:   
One template files with several `script` blocks for each template.

```html        
<script id="user-info-tmpl" type="text/x-doT-tmpl">
	<div class="user-info">
		<div>Hi {{=it.name}}!</div>
		<div>{{=it.age || ''}}</div>
	</div>
</script>

<script id="list-items" type="text/x-doT-tmpl">
	<ul class="list-items">
		{{~it.array :value:index}}
			<li class="item">{{=value}}!</li>
		{{~}}
	</ul>
</script>   

```    

**Result:**

```javascript    
var _htmlTemplates = {
"user-info-tmpl" : function(it) {
var out='<div class="user-info"><div>Hi '+(it.name)+'!</div><div>'+(it.age || '')+'</div></div>';return out;
}
,
"list-items" : function(it) {
var out='<ul class="list-items">';var arr1=it.array;if(arr1){var value,index=-1,l1=arr1.length-1;while(index<l1){value=arr1[index+=1];out+='<li class="item">'+(value)+'!</li>';} } out+='</ul>';return out;
}
};
```    

### Usage:

`npm install --save grunt-dot-tmpl-compiler`

And add to your GruntFile.js:

`grunt.loadNpmTasks('grunt-dot-tmpl-compiler');`

### Arguments:
* `src`: the directory where the templates files exist.
* `dist`: the destination directory for the compiled templates
* `options`: the options block

### Options:
* `variableName`: the name of the variable that will contain all the compiled templates. Defaults to `_templates`.
