

var gulp = require('gulp');
var traceur = require('gulp-traceur');
var rename_ = require('gulp-rename');
var karma = require('karma').server;
//var theServer = require('gulp-express');
var del        = require('del');
var minifyCSS  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var jshint     = require('gulp-jshint');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon    = require('gulp-nodemon');



//var TRACEUR_OPTIONS = require('./config').traceur;
var TRACEUR_OPTIONS = {
  "modules": "amd",
  "script": false,
  "types": true,
  "typeAssertions": true,
  "typeAssertionModule": "assert",
  "annotations": true,
  "sourceMaps": "file"
}



/* ==============================================================
Set base directories
source & destination (build) files
=============================================================== */
var BASES = {
  SRC: 'public/src/',
  BUILD: 'public/build/',
  ROOT: './'
};


/**
 * Define paths
 */
var PATHS = {
  SCRIPTS: ['js/**/*.js'],
  HTML: ['**/*.html'],
 // nodeScripts: ['server.js', 'server/**/*.js'], 
  // lib: ['lib/angular/angular.min.js',
  //   'lib/angular-animate/angular-animate.min.js', 
  //   'lib/angular-material/angular-material.min.js',
  //   'lib/angular-messages/angular-messages.min.js',
  //   'lib/angular-route/angular-route.min.js',
  //   'lib/angular-sanitize/angular-sanitize.min.js',
  //   'lib/angular-aria/angular-aria.min.js'

  // ],
  // libMap:[ 'lib/angular/angular.min.js.map', 
  //   'lib/angular-animate/angular-animate.min.js.map', 
  //   'lib/angular-sanitize/angular-sanitize.min.js.map',
  //   'lib/angular-messages/angular-messages.min.js.map',
  //   'lib/angular-route/angular-route.min.js.map',
  //   'lib/angular-aria/angular-aria.min.js.map'
  // ],

  // libStyles: ['lib/angular-material/angular-material.css',
  //   'lib/angular-material/default-theme.css'
  // ],
  appStyles: [
    'css/**/*.css'
  ]
}  


//-----------------------------------------------------------
// A wrapper around gulp-rename to support `dirnamePrefix`.
function rename(obj) {
  return rename_(function(parsedPath) {
    return {
      extname: obj.extname || parsedPath.extname,
      dirname: (obj.dirnamePrefix || '') + parsedPath.dirname,
      basename: parsedPath.basename
    };
  });
}


/** 
 * clean task - WORKS!!
 * Delete the dist directory 
 */
gulp.task('clean', function() {
  del(BASES.BUILD)
});



/** 
 * html task -
 * Copies HTML to the dist directory 
 */
gulp.task('html', function() {
  gulp.src(PATHS.HTML, {cwd: BASES.SRC}) //CWD - current working directory
  .pipe(gulp.dest(BASES.BUILD));
});





/**
 * css task - WORKS!!
 * get the css files
 * concatenate them 
 * minify
 * save to dist/css/app.min.css
 */
gulp.task('css', function() {
  gulp.src(PATHS.appStyles, {cwd: BASES.SRC})
  //.pipe(concat('app.css'));
  //.pipe(minifyCSS())
  //.pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(BASES.BUILD + 'css'));
});



/** 
 * TRANSPILE ES6 to ES5
 */
gulp.task('build-es6', function() {
  gulp.src(PATHS.SCRIPTS, {cwd: BASES.SRC})
  //Rename before Traceur, so that Traceur has the knowledge of both input and output paths.
  //.pipe(rename({extname: '.js', dirnamePrefix: BASES.BUILD}))
  //.pipe(rename({extname: '.js'}))
  .pipe(traceur(TRACEUR_OPTIONS))
  .pipe(gulp.dest(BASES.BUILD + 'js'));
});



// WEB SERVER
/**
 * Start server.js in development mode 
 * Watch for changes 
 * Watch all .html and .js files in the directory (ext = extension).
 * .on()[event, tasks] -> takes gulp task names to execute.
 * 'change' -> which fires before the server restarts so that you 
 * can run your compile tasks all within the same gulp process.)
 * [tasks] A gulp task name, array of gulp task names, or a function to execute.
 */
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js html css',
    env: { 'NODE_ENV': 'development' }
  })
  .on('start', ['build-es6', 'css', 'html'])
  .on('change', ['watch'])
  .on('restart', function() {
    console.log('Restarted!');
  });
});


/* ==========================================================
GULP TASKS - Unit Testing with Karma
========================================================== */
/**
 * Run test once and exit
 */
gulp.task('unit:test', function (done) {
  karma.start({
  configFile: __dirname + '/public/test/config/karma.conf.js',
  singleRun: true
  }, done);
});

/**
* Watch for file changes and re-run tests on each change
*/
gulp.task('unit:tdd', function (done) {
  karma.start({
  configFile: __dirname + '/public/test/config/karma.conf.js'
  }, done);
});



//gulp.task('default', ['node-server', 'watch']);




/* ==========================================================
GULP WATCH TASK
A development task - WORKS!!
Watch css files, lib-scripts, back-end js and front-end js files for changes
when a change is detected run the associated task 
========================================================== */
gulp.task('watch', function() {
  //Watch front end js files - on change run lint and run angular task  
  gulp.watch(BASES.SRC + PATHS.SCRIPTS, ['build-es6']);  
  //Watch html files - on change run copy-html task
  gulp.watch(BASES.SRC + PATHS.HTML, ['html']);
  //Watch css files - on change run css task
  //gulp.watch(bases.src + paths.styles, ['css']); 
  gulp.watch('public/src/css/**/*', ['css']); 
  //Watch back-end js files - on change run lint and run node-scripts task
  //gulp.watch(bases.root + paths.nodeScripts, ['node-scripts']);
});



/**
 * Default Task
 */
gulp.task('default', ['nodemon']);












