var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var extend = require('xtend');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var jshint = require('gulp-jshint');
var path = require('path');
var pump = require('pump');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');

// Config
var config = {
    script: {
        files: [
            {
                src: [
                    './node_modules/jquery/dist/jquery.min.js',
                    './node_modules/bootstrap/dist/js/bootstrap.min.js',
                ],
                dest: path.join(__dirname, 'public/assets/js/vendor.js'),
            },
            {
                src: [
                    './resources/assets/js/main.js',
                ],
                dest: path.join(__dirname, 'public/assets/js/scripts.js'),
                options: {
                    transpile: false,
                    lint: true,
                    jsHintOptions: {
                        asi: true,
                        esversion: 6
                    },
                },
            },
        ],
    },
    style: {
        files: [
            {
                src: [
                    './node_modules/bootstrap/dist/css/bootstrap.min.css',
                ],
                dest: path.join(__dirname, 'public/assets/css/vendor.css'),
                options: {
                    sourceMaps: false,
                }
            },
            {
                src: [
                    './resources/assets/css/main.scss',
                ],
                dest: path.join(__dirname, 'public/assets/css/styles.css'),
                options: {
                    sourceMaps: true,
                }
            },
        ],
        options: {
            autoprefixerOptions: {
                browsers: ['last 10 versions'],
                cascade: false
            },
            cleanCSSOptions: {
                compatibility: 'ie8'
            },
            sassOptions: {
                errLogToConsole: true,
                outputStyle: 'compact'
            },
            sourceMaps: {
                file: './'
            },
        },
    },
};

// Default Tasks
gulp.task('default', ['js', 'css']);

// Watch Tasks
gulp.task('watch', function() {
    gulp.watch(['./resources/assets/js/**/*'], ['js']);
    gulp.watch(['./resources/assets/scss/**/*'], ['css']);
});

// Handle JS
gulp.task('js', function() {
    config.script.files.map(function(jsBlock) {
        var blockOptions = extend({
            transpile: false,
            lint: false,
            jsHintOptions: {},
        }, jsBlock.options || {});

        pump([
            gulp.src(jsBlock.src),
            concat(path.basename(jsBlock.dest)),
            gulpIf(blockOptions.transpile, babel()),
            gulpIf(blockOptions.lint, jshint(blockOptions.jsHintOptions)),
            gulpIf(blockOptions.lint, jshint.reporter('jshint-stylish')),
            gulp.dest(path.dirname(jsBlock.dest)),
        ]);
    });
});

// Handle CSS
gulp.task('css', function() {
    var options = extend({
        autoprefixerOptions: {
            browsers: ['last 10 versions'],
            cascade: false
        },
        cleanCSSOptions: {
            compatibility: 'ie8'
        },
        sassOptions: {
            errLogToConsole: true,
            outputStyle: 'compact'
        },
        sourceMaps: {
            file: './maps'
        },
    }, config.style.options || {});

    config.style.files.map(function(styleBlock) {
        var blockOptions = extend({
            sourceMaps: false,
        }, styleBlock.options || {});

        pump([
            gulp.src(styleBlock.src),
            gulpIf(blockOptions.sourceMaps, sourceMaps.init()),
            sass(options.sassOptions).on('error', sass.logError),
            autoprefixer(options.autoprefixerOptions),
            concat(path.basename(styleBlock.dest)),
            cleanCSS(options.cleanCSSOptions),
            gulpIf(blockOptions.sourceMaps, sourceMaps.write(options.sourceMaps.file)),
            gulp.dest(path.dirname(styleBlock.dest)),
        ]);
    });
});
