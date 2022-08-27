const {series, parallel, src, dest, watch} = require('gulp');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const serv = () => {
	browserSync.init({
		server: {
			baseDir: './',
		},
		open: true,
	})
}

const scripts = done => {
	src('./src/js/*.js')
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(dest('./dist/js'))
	.pipe(browserSync.stream())
	done()
}

const stylesdev = done => {
	src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('styles.min.css'))
		.pipe(dest('./dist/css'))
		.pipe(browserSync.stream())
	done()
}
const stylesbuild = done => {
	src('./src/scss/**/*.scss')
		.pipe(sass())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(autoprefixer({cascade: false}))
		.pipe(concat('styles.min.css'))
		.pipe(dest('./dist/css'))
	done()
}

const images = () => {
	src('./src/img/**/*.{jpg,jpeg,png,svg}')
	.pipe(imagemin())
	.pipe(dest('./dist/img'))
}
const watcher = () => {
	watch('*.html').on('change', browserSync.reload)
	watch('./src/js/*.js').on('change', series(scripts, browserSync.reload))
	watch('./src/scss/**/*.scss', stylesdev)
	watch('./src/img/**/*.{jpg,jpeg,png,svg}').on(
		'change',
		series(images, browserSync.reload)
	)
}
function cleanDist (){
	return src('dist', {allowEmpty: true}).pipe(clean())}



exports.dev = parallel(serv, watcher, series(stylesdev, scripts, images));
exports.build = series(cleanDist, stylesbuild, scripts, images);
