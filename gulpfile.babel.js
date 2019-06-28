/**
 * Versyx Digital Ltd 2019
 *
 * gulpfile.babel.js (ES6)
 * @author Chris Rowles <me@rowles.ch>
 */
import gulp from 'gulp';
import del from 'del';
import plugins from 'gulp-load-plugins';
import config from './versyx-config';

// automatically load gulp plugins
const plugin = plugins();

gulp.task('clean', () => {
    return del(config.out + '/**', {
        force: true
    });
});

gulp.task('videos', () => {
    return gulp.src(config.assets.media.videos)
        .pipe(gulp.dest(config.out + '/media'))
});

gulp.task('images', () => {
    return gulp.src(config.assets.media.images)
        .pipe(plugin.imagemin([
            plugin.imagemin.gifsicle({interlaced: true}),
            plugin.imagemin.jpegtran({progressive: true}),
            plugin.imagemin.optipng({optimizationLevel: 5}),
            plugin.imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(config.out + '/media'))
});

gulp.task('fonts', () => {
    return gulp.src(config.assets.fonts)
        .pipe(gulp.dest(config.out + '/webfonts'))
});

gulp.task('vendor-styles', () => {
    return gulp.src(config.vendor.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.vendor.css))
        .pipe(gulp.dest(config.out + '/css'));
});

gulp.task('versyx-styles', () => {
    return gulp.src(config.versyx.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.versyx.css))
        .pipe(gulp.dest(config.out + '/css'));
});

gulp.task('vendor-scripts', () => {
    return gulp.src(config.vendor.scripts)
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.concat(config.vendor.js))
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(gulp.dest(config.out + '/js'));
});

gulp.task('versyx-scripts', () => {
    return gulp.src(config.versyx.scripts)
        .pipe(plugin.rename(config.versyx.js))
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.uglifyEs.default())
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(gulp.dest(config.out + '/js'));
});

gulp.task('compile', gulp.parallel(
    'videos',
    'images',
    'fonts',
    'vendor-styles',
    'versyx-styles',
    'vendor-scripts',
    'versyx-scripts'
));