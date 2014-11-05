/*
 * Longsip Gulpfile - see readme.md for details
 */

var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync')
var browserify = require('browserify')
var gulp = require('gulp')
var gutil = require('gulp-util')
var htmlmin = require('gulp-htmlmin')
var minifycss = require('gulp-minify-css')
var notify = require("gulp-notify")
var prettyHrtime = require('pretty-hrtime')
var rename = require('gulp-rename')
var rimraf = require('rimraf')
var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var stylus = require('gulp-stylus')
var uglify = require('gulp-uglify')
var vulcanize = require('gulp-vulcanize')
var watchify = require('watchify')

// =================================================================== SETTINGS

var config = {
    autoprefixer: ['last 2 version', '> 2%', 'Firefox ESR', 'opera 12.1', 'ios 6', 'android 4', 'safari 5'],
    browserSync: {
        proxy: {
            proxy: 'localhost'
        },
        serve: {
          server: {
              baseDir: './public',
              directory: false,
              index: "index.html",
              routes: {
                  "/bower_components": "./bower_components"
              }
          }
        },
        use: "server",
        watch: ['public/**']
    },
    build: 'public/build',
    isWatching: false,
    polymer: {
        htmlmin: {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            removeCommentsFromCDATA: true
        },
        manifest: './public/components.html'
    },
    js: {
        source: './scripts',
        entryPoint: 'main.js',
        build: './public/build',
        output: 'bundle.js'
    },
    styles: {
        watch: 'styles/**/*.styl',
        compile: 'styles/*.styl'
    }
}

// ====================================================================== TASKS

// Browserify
gulp.task('browserify', function() {
    var bundleMethod = config.isWatching ? watchify : browserify

    var bundler = bundleMethod({
        // Specify the entry point of your app
        entries: [config.js.source + '/' + config.js.entryPoint],
        // Add file extentions to make optional in your requires
        extensions: [],
        paths: ['./node_modules', config.js.source]
    })

    var bundle = function() {
        // Log when bundling starts
        bundleLogger.start()
        return bundler
        // Enable source maps!
        .bundle({ debug: true })
        // Report compile errors
        .on('error', handleError)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specifiy the
        // desired output filename here.
        .pipe(source(config.js.output))
        // Specify the output destination
        .pipe(gulp.dest(config.js.build))
        // rename the minifed version
        .pipe(rename({ suffix: '.min' }))
        // use streamify to allow uglify to work as a stream
        .pipe(streamify(uglify()))
        // output the minified version to build/
        .pipe(gulp.dest(config.js.build))
        // Log when bundling completes!
        .on('end', bundleLogger.end)
    }

    if (config.isWatching) {
        // Rebundle with watchify on changes.
        bundler.on('update', bundle)
    }

    return bundle()
})

// Live update connected browsers after changes
gulp.task('browserSync', ['build'], function() {
    if (config.browserSync.use === 'server') {
        browserSync.init(config.browserSync.watch, config.browserSync.serve)
    } else if (config.browserSync.use === 'proxy') {
        browserSync.init(config.browserSync.watch, config.browserSync.proxy)
    }
})

// Composite task of build types
gulp.task('build', ['styles', 'browserify', 'vulcanize'])

// Clean (delete) the entire build directory
gulp.task('clean', function() {
    rimraf.sync(config.build)
})

// By default Watch & Build
gulp.task('default', ['watch'])

// Compile and process stylesheets (stylus)
gulp.task('styles', function() {
    gulp.src(config.styles.compile)
        .pipe(stylus({ errors: true }))
        .on('error', handleError)
        .pipe(autoprefixer.apply(this, config.autoprefixer))
        .pipe(gulp.dest(config.build))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.build))
})

// Watch files for changes
gulp.task('watch', ['setWatch', 'browserSync'], function() {
    gulp.watch(config.styles.watch, ['styles'])
    gulp.watch(config.polymer.manifest, ['vulcanize'])
})

// Set watch flag so Watchify is used rather than Browserify
gulp.task('setWatch', function() {
    config.isWatching = true
})

// Vulcanize Polymer dependencies & minify HTML
gulp.task('vulcanize', function () {
    return gulp.src(config.polymer.manifest)
        .pipe(vulcanize({dest: config.build}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(htmlmin(config.polymer.htmlmin))
        .pipe(gulp.dest(config.build))
        .pipe(browserSync.reload({stream:true, once: true}))
})


// ==================================================================== HELPERS

var handleError = function() {
    var args = Array.prototype.slice.call(arguments)
    notify
        .onError({
            title: "Compile Error",
            message: "<%= error.message %>"
        })
        .apply(this, args)
    this.emit('end')
}

var startTime

var bundleLogger = {
    start: function() {
        startTime = process.hrtime()
        gutil.log('Running', gutil.colors.green("'bundle'") + '...')
    },
    end: function() {
        var taskTime = process.hrtime(startTime)
        var prettyTime = prettyHrtime(taskTime)
        gutil.log('Finished', gutil.colors.green("'bundle'"), 'in', gutil.colors.magenta(prettyTime))
    }
}
