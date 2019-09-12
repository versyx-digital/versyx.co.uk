/**
 * Versyx Digital Ltd 2019
 *
 * gulpfile.esm.js
 */
import { src, dest, parallel, series } from 'gulp';
import del from 'del';
import plugins from 'gulp-load-plugins';
import config from './versyx-config';

// automatically load gulp plugins
const plugin = plugins();

function clean () {
    return del(config.out + '/**', {
        force: true
    });
}

function videos () {
    return src(config.assets.media.videos)
        .pipe(dest(config.out + '/media'))
}

function images () {
    return src(config.assets.media.images)
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
        .pipe(dest(config.out + '/media'))
}

function fonts () {
    return src(config.assets.fonts)
        .pipe(dest(config.out + '/webfonts'))
}

function styles(cb) {
    src(config.vendor.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.vendor.css))
        .pipe(dest(config.out + '/css'));

    src(config.versyx.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.versyx.css))
        .pipe(dest(config.out + '/css'));

    cb();
}

function scripts(cb) {
    src(config.vendor.scripts)
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.concat(config.vendor.js))
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(dest(config.out + '/js'));

    src(config.versyx.scripts)
        .pipe(plugin.rename(config.versyx.js))
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.uglifyEs.default())
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(dest(config.out + '/js'));

    cb();
}

exports.clean   = clean;
exports.fonts   = fonts;
exports.styles  = styles;
exports.scripts = scripts;
exports.images  = images;
exports.videos  = videos;

exports.media   = parallel(images, videos);
exports.assets  = parallel(fonts, styles, scripts);

exports.build = series(clean, images, videos, fonts, styles, scripts);