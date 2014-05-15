module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {},
    clean: {},
    jshint: {},
    watch: {},
    simplemocha: {}


  });

  grunt.loadNpmTask('');

  grunt.registerTask('default', ['']);
};
