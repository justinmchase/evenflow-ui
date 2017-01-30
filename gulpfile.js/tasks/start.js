import gulp from 'gulp'
import livereload from 'gulp-livereload'
import webpack from 'gulp-webpack'
import changed from 'gulp-changed'
import exec from '../utils/exec'

function reload () {
  return gulp
    .src('dist/app/render/index.html')
    .pipe(livereload())
}

function main () {
  let src = 'app/main/**/*'
  let dst = 'dist/app/main'
  return gulp
    .src(src)
    .pipe(changed(dst))
    .pipe(gulp.dest(dst))
}

function render () {
  let src = 'app/render/index.js'
  let dst = 'dist/app/render'
  return gulp
    .src(src)
    .pipe(webpack({
      output: {
        filename: 'index.js'
      },
      target: 'electron',
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.common'
        }
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.json$/, loader: 'json-loader' }
        ]
      }
    }))
    .pipe(gulp.dest(dst))
}

function content () {
  let src = [
    'app/**/*.html',
    'app/**/*.css'
  ]
  let dst = 'dist/app'
  return gulp
    .src(src)
    .pipe(gulp.dest(dst))
}

function jquery () {
  let src = 'node_modules/jquery/dist/jquery.min.*'
  let dst = 'dist/app/render/d/jquery'
  return gulp
    .src(src)
    .pipe(changed(dst))
    .pipe(gulp.dest(dst))
}

function bootstrap () {
  let src = [
    'node_modules/bootstrap/dist/js/bootstrap.min.*',
    'node_modules/bootstrap/dist/css/bootstrap.min.*'
  ]
  let dst = 'dist/app/render/d/bootstrap'
  return gulp
    .src(src)
    .pipe(changed(dst))
    .pipe(gulp.dest(dst))
}

function fonts () {
  let src = 'node_modules/bootstrap/dist/fonts/*'
  let dst = 'dist/app/render/fonts'
  return gulp
    .src(src)
    .pipe(gulp.dest(dst))
}

let build = gulp.parallel(main, render, content, jquery, bootstrap, fonts)
function start (callback) {
  livereload.listen()
  gulp.watch(['lib/**/*', 'app/**/*'], gulp.series(build, reload))
  exec('electron main', 'dist/app', () => {
    console.log('exiting...')
    callback()
    process.exit()
  })
}

gulp.task('start', gulp.series(
  build,
  start
))
