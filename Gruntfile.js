'use strict';


module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['Gruntfile.js', 'server.js', 'test/api/*.js','app/js/**/*.js']
    },

    simplemocha: {
      options: {
        ui: 'bdd'
      },
      all: {src: ['test/api/**/*.js']}
    },

    clean: ['dist'],

    copy: {
      all: {
        expand: true,
        cwd: 'app/',
        src: ['*.css', '*.html', '/images/**/*', '!Gruntfile.js'],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
    },

    browserify: {
      all: {
        src: 'app/js/**/*.js',
        dest: 'dist/client.js'
      },
      options: {
        transform:['debowerify'],
        debug: true
      }
    },

    express: {
      dev: {
        options: {
          background: true,
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    },
    capser: {
      acceptance : {
        options : {
          pre: 'node server.js',
          verbose: true,
          'log-level': 'debug',
          test : true,
        },
        files : {
          '/dev/null' : ['test/acceptance/*_test.js']
        }
      }
    },
    watch: {
      scripts: {
        files:['app/js/**/*.js','test/**/*.js']
      },
      express: {
          files: ['server.js'],
          tasks: ['browserify'],
          options: {
            spawn: false
          }
      }
    }



  });

  //grunt.loadNpmTask('');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTask);

  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('server', ['build', 'express:dev', 'watch']);
  grunt.registerTask('test:acceptance', ['express:dev', 'casper']);
  grunt.registerTask('test:api', ['simplemocha']);
  grunt.registerTask('test', ['test:acceptance', 'test:api']);
  grunt.registerTask('default', ['jshint', 'test']);
};
