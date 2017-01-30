import gulp from 'gulp'
import livereload from 'gulp-livereload'
import webpack from 'gulp-webpack'
import exec from '../utils/exec'

function reload () {
  return gulp
    .src('dist/**/*')
    .pipe(livereload())
}

function main () {
  return gulp
    .src('app/main/**/*')
    .pipe(gulp.dest('dist/app/main'))
}

function render () {
  return gulp
    .src('app/render/index.js')
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
    .pipe(gulp.dest('dist/app/render'))
}

function content () {
  let src = [
    'app/**/*.html',
    'app/**/*.css'
  ]
  return gulp
    .src(src)
    .pipe(gulp.dest('dist/app'))
}

function jquery () {
  return gulp
    .src('node_modules/jquery/dist/jquery.min.*')
    .pipe(gulp.dest('dist/app/render/d/jquery'))
}

function bootstrap () {
  let src = [
    'node_modules/bootstrap/dist/js/bootstrap.min.*',
    'node_modules/bootstrap/dist/css/bootstrap.min.*'
  ]
  return gulp
    .src(src)
    .pipe(gulp.dest('dist/app/render/d/bootstrap'))
}

function fonts () {
  return gulp
    .src('node_modules/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('dist/app/render/fonts'))
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
