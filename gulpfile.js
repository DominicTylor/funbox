/**
 * Created by MoHax on 19.03.2016.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');

gulp.task('browser-sync', ['styles', 'scripts'], function () {
    browserSync.init({
        proxy: "funbox.dev/app",
        notify: false
    });
});

gulp.task('styles', function () {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer({browsers: ['last 3 versions', 'ie >= 10'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('./app/js/common.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./app/js/'))
        .pipe(browserSync.stream());
});

gulp.task('js-libs', function () {
    return gulp.src([ // Берем все необходимые библиотеки
            // Берем библиотеки
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js/')); // Выгружаем в папку app/js
});

gulp.task('jade', function () {
    gulp.src('./app/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./app/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img/')); // Выгружаем на продакшен
});

gulp.task('templates', function () {
    gulp.src('./app/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./app/'))
});

gulp.task('clean', function () {
    return del.sync('./dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'img'], function () {
    var buildCss = gulp.src('./app/css/*.css') // Переносим стили в продакшен
        .pipe(gulp.dest('./dist/css/'))
    var buildJs = gulp.src('./app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('./dist/fonts/'))
    var buildJs = gulp.src('./app/js/*.js') // Переносим скрипты в продакшен
        .pipe(gulp.dest('./dist/js/'))
    var buildHtml = gulp.src('./app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    gulp.watch('./app/scss/**/*.scss', ['styles']);
    gulp.watch('./app/js/common.js', ['scripts']);
    gulp.watch('./app/jade/**/*.jade', ['jade']);
});

gulp.task('default', ['browser-sync', 'watch']);