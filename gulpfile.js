var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var path = require('path');
var pump = require('pump');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');

// Config
var config = {
    script: {
        dest: {
            file: {
                custom: 'script.js',
                vendor: 'vendor.js'
            },
            dir: path.join(__dirname, 'public/assets/js/')
        },
        jsHintOptions: {
            asi: true,
            esversion: 6
        },
        src: {
            files: {
                custom: [
                    'resources/assets/js/main.js'
                ],
                vendor: [],
            },
        }
    },
    style: {
        autoprefixerOptions: {
            browsers: ['last 10 versions'],
            cascade: false
        },
        cleanCSSOptions: {
            compatibility: 'ie8'
        },
        dest: {
            file: 'style.css',
            dir: path.join(__dirname, 'public/assets/css/')
        },
        sassOptions: {
            errLogToConsole: true,
            outputStyle: 'compact'
        },
        sourceMaps: {
            file: './maps'
        },
        src: {
            file: 'main.scss',
            dir: path.join(__dirname, 'resources/assets/scss/')
        }
    },
    templates: {
        src: {
            files: [
                './resources/views/**/*'
            ]
        }
    }
};

console.log(config.style.dest.dir);

// DEFAULT TASKS
gulp.task('default', ['js', 'css']);

gulp.task('watch', function() {
    gulp.watch([config.script.src.files.custom], ['js']);
    gulp.watch([path.join(config.style.src.dir, '/**/*')], ['css']);
});

// HANDLE JS
gulp.task('js', ['jsvendor', 'jslint'], function() {
    pump([
        gulp.src(config.script.src.files.custom),
        concat(config.script.dest.file.custom),
        babel(),
        gulp.dest(config.script.dest.dir),
    ]);
});

gulp.task('jsvendor', function() {
    pump([
        gulp.src(config.script.src.files.vendor),
        concat(config.script.dest.file.vendor),
        gulp.dest(config.script.dest.dir),
    ]);
});

gulp.task('jslint', function() {
    pump([
        gulp.src(config.script.src.files.custom),
        jshint(config.script.jsHintOptions),
        jshint.reporter('jshint-stylish'),
    ]);
});

// HANDLE CSS
gulp.task('css', function() {
    pump([
        gulp.src(path.join(config.style.src.dir, config.style.src.file)),
        sourceMaps.init(),
        sass(config.style.sassOptions).on('error', sass.logError),
        autoprefixer(config.style.autoprefixerOptions),
        concat(config.style.dest.file),
        cleanCSS(config.style.cleanCSSOptions),
        sourceMaps.write(config.style.sourceMaps.file),
        gulp.dest(config.style.dest.dir),
    ]);
});