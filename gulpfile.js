
const { src, dest, watch, series, parallel} = require("gulp");

//CSS

const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Imagenes

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){

    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))

    done()
}

function imagenes (done){

    src('src/img/**/*')
        .pipe(imagemin({optimizationLevel:3}))
        .pipe(dest('build/img'))

    done()
}

function versionWebp (done){
    const opciones = {
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done()
}

function versionAvif(done){
    const opciones = {
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done()
}

function dev (done){

    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)


    done()
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.versionWebp = versionWebp;
exports.default = series( imagenes, versionWebp, versionAvif, css , dev);