module.exports = function(grunt) {
    var pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
       pkg:pkg,
       //配置js压缩混淆插件
       uglify:{
          options:{
              banner:'/*! <%=pkg.name%> <%=pkg.version%> | <%=grunt.template.today("yyyy-mm-dd HH:MM:ss")%> */\n'
          },
          build:{
              src:'dist/<%=pkg.name%>.js',
              dest:'dist/<%=pkg.name%>.min.js'
          }
       },
       //配置文件合并插件
       concat:{
           options: {
               separator: ''
           },
           dist: {
               src: (function(){
                   var path = [];
                   for(var p in pkg.src){
                       path.push("src/"+p+".js");
                   }
                   return path;
               })(),
               dest: 'dist/script.js'
           }
       },
       //配置css压缩插件
       cssmin:{
           options: {
               shorthandCompacting: false,
               roundingPrecision: -1
           },
           build: {
               src:'src/style.css',
               dest:'dist/style.css'
           }
       },
       watch:{
           scripts: {
               files: ['src/*.*'],
               tasks: ['concat','cssmin','mytask','uglify'],
               options: {
                   spawn: false
               }
           }
       }

    });

    //自定义任务
    grunt.registerTask('mytask','',function(){
        var fs = require('fs');

        //读取文件数据
        var scriptData = fs.readFileSync('dist/script.js','utf-8');
        var styleData = fs.readFileSync('dist/style.css','utf-8');

        grunt.log.write(scriptData);

        var result = [
            "(function(window){\n",
            scriptData,
            "document.write(\"<style>",
            styleData,
            "</style>\");\n",
            "window.$ = b;\n",
            "})(this);"
        ].join('');

        //生成最终文件
        fs.writeFileSync('dist/'+pkg.name+".js",result,'utf-8');

        //删除临时文件
        fs.unlinkSync("dist/script.js");
        fs.unlinkSync("dist/style.css");

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',['concat','cssmin','mytask','uglify','watch']);
}