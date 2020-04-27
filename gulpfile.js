const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();

const todo = require('gulp-todo');
const jshint = require('gulp-jshint');

//scan JS-Files and give hints on syntax to prevent errors
async function lint() {
    gulp.src(['./assets/js/*.js', '!./assets/js/*.min.js'])
        .pipe(jshint({esnext: true}))
        .pipe(jshint.reporter('default'));
}

//scan all major files on open todos and list them in a .md-file
async function assemblyTodos() {
    gulp.src(['./assets/js/*.js', './assets/scss/*.scss', './public/*.html'])
        .pipe(todo())
        .pipe(gulp.dest('./'));
}

//compile scss + minify css -> save in public folder
function style() {
    gulp.src('./assets/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream());

    return gulp.src('./assets/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream());
}

//concat js files + uglify -> save in public folder
function scripts() {
    gulp.src(['./assets/js/*.js', './assets/js/*.min.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.stream());

    return gulp.src('./assets/js/*.js')
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./public/js/'))
            .pipe(browserSync.stream());
}

//create file watchers, which watches scss, js and html files for anychanges
//also enables browsersync, which can be used to test on desktop and mobile
function watch() {
    browserSync.init({
        server: {
            baseDir: 'public/'
        }
    });
    gulp.watch('./assets/scss/*.scss', style);
    gulp.watch('./assets/js/*.js', scripts);
    gulp.watch('public/*.html').on('change', browserSync.reload);
}

//move all used files of npm dependencies to a local directory, dont use node_modules folder in any working files
async function modules() {
    //scss of bootstrap
    gulp.src(['./node_modules/bootstrap/scss/**/*']).pipe(gulp.dest('./assets/bootstrap/'));

    //get icon library icomoon
    gulp.src(['./node_modules/icomoon/**/*']).pipe(gulp.dest('./public/css/icomoon/'));

    let styleSources = [
        './node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
        './node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
        './node_modules/jquery-ui-dist/jquery-ui.min.css',
        './node_modules/jquery-fancybox/source/scss/jquery.fancybox.scss',
    ];

    let scriptSources = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/jquery-ui-dist/jquery-ui.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/owl.carousel/dist/owl.carousel.min.js',
        './node_modules/jquery-fancybox/source/js/jquery.fancybox.js',
        './node_modules/typed.js/lib/typed.min.js'
    ];
    gulp.src(styleSources).pipe(sass()).pipe(gulp.dest('./public/css/'));
    gulp.src(scriptSources).pipe(gulp.dest('./public/js/'));
}

//use "gulp lint" to test your js files
// hints on your syntax will be given to you to prevent errors
// also make your code prettier
exports.lint = lint;

//use "gulp todo" to run this task
//scan all major files (scss, js, html) on open todos and list them in a .md-file
exports.todo = assemblyTodos;

//use command "gulp modules" to run this task
//move all used files of npm dependencies to a local directory, dont use node_modules folder in any working files
exports.modules = modules;

//use command "gulp style" to run all style related gulp tasks
//compile scss once and minify
exports.styles = style;

//use command "gulp scripts" to run all scripts related gulp tasks
//concat all js and uglify
exports.scripts = scripts;

//use command "gulp watch" to run file watchers and open a synced browserstream
exports.watch = watch;

exports.default = function (){
    exports.modules();
    exports.todo();
    exports.styles();
    exports.lint();
    exports.scripts();
    exports.watch();
};