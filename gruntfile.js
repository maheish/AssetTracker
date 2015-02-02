module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**','!public/js/build.js'],
                tasks: ['clean','uglify'],
                options: {
                    livereload: true
                }

            },
            less: {
                files: ['public/less/**'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            cssmin : {
                files : ['public/css/**'],
                task : ['cssmin'],
                options : {
                    liverreload : true
                }
            }
        },
        uglify: {
            build: {
                src: ['public/js/**/*.js'],
                dest: 'public/js/build.js'
            }

        },
        jshint: {
            all: ['gruntfile.js']
        },
        less: {
            options: {
                //compress:true,
                //yuicompress:true,
                paths: ['public/less']
            },
            // target name
            src: {
                // no need for files, the config below should work
                expand: true,
                cwd:    "public/less",
                src:    "styles.less",
                dest:   "public/css",
                ext:    ".css"
            }
        },
        clean: {
            build: {
                src: ["public/js/build.js"]
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 8000
                    },
                    cwd: __dirname
                }
            },
            exec: {
                options: {
                    exec: 'less'
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task(s).
    grunt.registerTask('default', ['jshint','clean','less','uglify','concurrent:target']);
};