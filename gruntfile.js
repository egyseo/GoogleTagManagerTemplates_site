module.exports = grunt => {
  grunt.initConfig({
    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      custom: {
        files: [{
          src: 'src/css/style.css',
          dest: 'public/css/style.min.css'
        }]
      }
    },
    eslint: {
      src: ['**/*.js', '!src/**/*.js', '!public/**/*.js', '!node_modules/**/*.js']
    },
    uglify: {
      options: {
        mangle: true,
        preserveComments: /^!|@preserve|@license|@cc_on/i
      },
      custom: {
        files: [{
          src: 'src/js/site.js',
          dest: 'public/js/site.min.js'   
        }]
      }
    },
    copy: {
      bootstrap: {
        files: [{
          src: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
          dest: 'public/css/bootstrap.min.css'
        },{
          src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
          dest: 'public/js/bootstrap.bundle.min.js'
        },{
          src: 'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
          dest: 'public/js/bootstrap-select.min.js'
        }, {
          src: 'node_modules/bootstrap-select/dist/css/bootstrap-select.min.css',
          dest: 'public/css/bootstrap-select.min.css'
        }, {
          src: 'node_modules/smartwizard/dist/js/jquery.smartWizard.min.js',
          dest: 'public/js/jquery.smartWizard.min.js'
        },{
          src: 'node_modules/smartwizard/dist/css/smart_wizard_theme_arrows.min.css',
          dest: 'public/css/smart_wizard.min.css'
        }]
      },
      jquery: {
        files: [{
          src: 'node_modules/jquery/dist/jquery.min.js',
          dest: 'public/js/jquery.min.js'
        }]
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'bin/www',
        options: {
          ext: 'js,pug'
        }
      }
    },
    watch: {
      styles: {
        files: ['src/css/style.css'],
        tasks: ['cssmin:custom']
      },
      customjs: {
        files: ['src/js/site.js', 'src/js/firebase.init.js'],
        tasks: ['eslint', 'uglify:custom']
      },
      otherjs: {
        files: ['**/*.js'],
        tasks: ['eslint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-nodemon');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('gruntify-eslint');

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['cssmin:custom', 'copy:bootstrap', 'copy:jquery', 'eslint', 'uglify:custom', 'concurrent' ]);
  grunt.registerTask('deploy', ['cssmin:custom', 'copy:bootstrap', 'copy:jquery', 'eslint', 'uglify:custom' ]);
};
