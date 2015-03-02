/* ==============================================================
Karma configuration

https://github.com/angular/angular-seed/blob/master/karma.conf.js

Ref.
https://github.com/karma-runner/karma-traceur-preprocessor
http://engineering.radius.com/post/77677879234/testing-angularjs-in-a-requirejs-environment
=============================================================== */

var traceurOptions = {
    "modules": "amd",
    "script": false,
    "types": true,
    "typeAssertions": true,
    "typeAssertionModule": "assert",
    "annotations": true,
    "sourceMaps": false
//    "sourceMaps": "file"
  };


module.exports = function(config) {


    var files;

    // Serve already transpiled files, including source maps.
    files = [
      {pattern: 'build/**/*.js', included: false},
      {pattern: 'build/**/*.map', included: false}
    ];


    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath : '../..',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        //frameworks: ['jasmine'],
        frameworks: ['jasmine', 'requirejs', 'traceur'],
//        frameworks: ['jasmine', 'requirejs', 'traceur', 'sourcemaps'],


        // list of files / patterns to load in the browser
        // files: [
        //     'lib/angular/angular.js',
        //     'lib/angular-route/angular-route.js',
        //     'lib/angular-sanitize/angular-sanitize.js',
        //     'lib/angular-mocks/angular-mocks.js',
        //     'src/js/app.js',
        //     'src/js/appRoutes.js',
        //     'src/js/controllers/emailControllers.js',
        //     'src/js/services/emailServices.js',
        //     //'src/js/**/*.js',
        //     'test/unit/app.spec.js',
        //     'test/unit/services/emailServices.spec.js'    ],    



        files: [

            //'build/js/**/*.js',
            //'test/unit/app.spec.js'
            //'lib/js/**/*.js',
            // The entry point that dynamically imports all the specs.
            {pattern: 'test/main.js', included: true},

            // The runtime assertion library.
            {pattern: 'node_modules/rtts-assert/dist/amd/assert.js', included: false}
        ],

        //.concat(files),

        preprocessors: {
        //'**/*.ats': ['traceur']
          '**/*.js': ['traceur']
        },



        // list of files to exclude
        exclude: [
        //    'test/unit/services/emailServices.spec.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // preprocessors: {
        // },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome', 'Firefox'],
        //PhantomJS
        browsers: ['Chrome'],

        traceurPreprocessor: {
            options: traceurOptions,
            transformPath: function(path) {
            // Traceur preprocessor is only used when running Karma outside of WebStorm.
            // We change the path to `build/**` so that the paths are the same as with WebStorm.
            return path.replace(config.basePath, config.basePath + 'public/build')
                .replace(/\.ats$/, '.js');
            }
        }


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
      //  singleRun: false
    });

//    config.plugins.push(require('karma_sourcemaps.js'));

};