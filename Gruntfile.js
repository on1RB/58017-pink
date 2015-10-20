module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),}

  grunt.initConfig({

    less: {
      style: {
        files: {
          'build/css/style.css': 'src/less/style.less'
        }
      }
    },

    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },



    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    csscomb: {
      style:{
        expand: true,
        src: ["src/less/**/*.less"]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gid,svg}"]
        }]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/style.css'
      }
    },

    clean: {
      build: ["build"]
    },

    watch: {
      style: {
        files: ['less/**/*.less'],
        tasks: ['less', 'postcss'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
          "build/index.min.html": "build/index.html",
          "build/form.min.html": "build/form.html"
        }
      }
    },

    concat: {
      start: {
        src: [
          'src/js/script.js'
        ],
        dest: 'build/js/script.min.js'
      }
    },


    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['build/js/script.min.js']
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/img/*.{png,jpg,gif,svg}',
            'build/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/",
          },
          startPath: "index.html",
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }

  });

  grunt.registerTask('default', [
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    'cmq',
    'postcss',
    'cssmin',
    'imagemin',
    'htmlmin',
    'concat',
    'uglify'
  ]);

  config = require('./.gosha')(grunt, config);

};
