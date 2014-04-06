module.exports = function(grunt){

  grunt.initConfig({
    uglify: {
      development: {
        options: {
          beautify: 'true'
        },
        files: {
          'assets/js/index.min.js': ['src/js/lib/*.js', 'src/js/index.js']
        }
      },
      production: {
        files: {
          'assets/js/index.min.js': ['src/js/lib/*.js', 'src/js/index.js']
        }
      },
    },
    jade: {
      development: {
        options: {
          pretty: true,
          data: function(dest, src) {
            return require('./src/jade/lang/zh.js');
          }
        },
        files: {
          'index.html': 'index.jade',
          'exam.html': 'exam.jade'
        }
      },
      production: {
        options: {
          data: function(dest, src) {
            return require('./src/jade/lang/zh.js');
          }
        },
        files: {
          'index.html': 'index.jade',
          'exam.html': 'exam.jade'
        }
      }
    },
    stylus: {
      development: {
        options: {
          compress: false
        },
        files: {
          'assets/css/index.min.css': 'src/stylus/index.styl'
        }
      },
      production: {
        files: {
          'assets/css/index.min.css': 'src/stylus/index.styl'
        }
      }
    },
    watch: {
      uglify: {
        files: ['src/js/*.js'],
        tasks: ['uglify:development']
      },
      stylus: {
        files: ['src/stylus/*.styl'],
        tasks: ['stylus:development'],
      },
      jade: {
        files: ['./*.jade', 'src/jade/*.jade', 'src/jade/lang/*.js'],
        tasks: ['jade:development'],
      }
    },
  });

  // plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 默认任务
  grunt.registerTask('init', ['uglify:development', 'jade:development', 'stylus:development']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['uglify:production', 'stylus:production', 'jade:production']);
};
