'use strict';

module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    // Task configuration
    concat: {
      application: {
        src: [
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
          './bower_components/bootstrapValidator/dist/js/bootstrapValidator.js',
          './bower_components/owlcarousel/owl-carousel/owl.carousel.js',
          './bower_components/fancybox/source/jquery.fancybox.js',
          './app/assets/js/jquery.mask.js',
          './app/assets/js/application.js',
        ],
        dest: './public/js/application.js'
      },
      admin: {
        src: [
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
          './bower_components/bootstrapValidator/dist/js/bootstrapValidator.js',
          './bower_components/owlcarousel/owl-carousel/owl.carousel.js',
          './app/assets/js/jquery.mask.js',
          './app/assets/js/admin.js',
        ],
        dest: './public/js/admin.js'
      },
    },
    uglify: {
      options: {
        mangle: false  // Use if you want the names of your functions and variables unchanged
      },
      application: {
        files: {
          './public/js/application.min.js': './public/js/application.js',
        }
      },
      admin: {
        files: {
          './public/js/admin.min.js': './public/js/admin.js',
        }
      }
    },
    /*phpunit{
      classes: {
          dir: 'app/tests/'   //location of the tests
      },
      options: {
          bin: 'vendor/bin/phpunit',
          colors: true
      }
    },*/
    watch: { //'./app/assets/javascript/backend.js'
      css: {
        files : [
          './app/assets/css/*.scss'
        ],
        tasks: ['sass'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      js: {
        files : [
          './app/assets/js/*.js'
        ],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      /*core: {

      }*/
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('deploy', ['sass, concat, uglify', 'test', 'publish']);

};
