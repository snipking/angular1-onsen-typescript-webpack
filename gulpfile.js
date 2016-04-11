/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');

// Include Plugins
var del = require('del');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');
var opn = require('opn');

// Clean Task
gulp.task('clean', function () {
    del(['www/*']);
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src('src/scripts/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

// copy all files
gulp.task('copy-dev', function () {
    return gulp.src([
        'src/**/*',
        '!src/index.html'])
            .pipe(gulp.dest('www'));
});

// copy product env files, ignore source and useless files
gulp.task('copy-prod', function () {
    return gulp.src([
        'src/**/*',
        '!src/index.html',
        '!src/**/*.ts',
        '!src/**/*.less',
        '!src/**/*.sass',
        '!src/**/*.html',
        '!src/**/*.styl',
        '!src/scripts/*',
        '!src/css/*',
        '!src/**/*.md'])
            .pipe(gulp.dest('www'));
});

// minify src/pages/**/*.html
gulp.task('pages-html', function () {
    return gulp.src('src/pages/**/*.html')
            .pipe(gulpif(process.env.NODE_ENV === 'production', htmlmin({collapseWhitespace: true})))
            .pipe(gulp.dest('www/pages'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(['src/**/*', '!src/index.html',
        '!src/**/*.ts',
        '!src/**/*.less',
        '!src/**/*.sass',
        '!src/**/*.styl',
        '!src/scripts/*'], ["copy-dev"]);
});

gulp.task('build-prod', function (callback) {
    runSequence('copy-prod', ['webpack:build', 'pages-html'], callback);
});

gulp.task('build-dev', function (callback) {
    runSequence('copy-dev', ['webpack:build-dev'], callback);
});

// Default Task
gulp.task('default', ['run-dev']);

// Set Node Environment
gulp.task('set-dev-node-env', function () {
    return process.env.NODE_ENV = 'development';
});
gulp.task('set-prod-node-env', function () {
    return process.env.NODE_ENV = 'production';
});
gulp.task('set-test-node-env', function () {
    return process.env.NODE_ENV = 'test';
});

gulp.task("webpack:build", ['set-prod-node-env'], function (callback) {
    // webpack prod config
    var webpackProdConfig = Object.create(require('./webpack.config.js'));
    webpackProdConfig.devtool = undefined;
    webpackProdConfig.plugins = webpackProdConfig.plugins.concat(
            new webpack.DefinePlugin({
                "process.env": {
                    // This has effect on the react lib size
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
            );

    // create a single instance of the compiler to allow caching
    var webpackProdCompiler = webpack(webpackProdConfig);

    // run webpack
    webpackProdCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build", err);
        }
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack:build-dev", ['set-dev-node-env'], function (callback) {
    // webpack dev config
    var webpackDevConfig = Object.create(require('./webpack.config.js'));
    webpackDevConfig.devtool = "source-map";
    webpackDevConfig.debug = true;
    var webpackDevCompiler = webpack(webpackDevConfig);

    // run webpack
    webpackDevCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//// Build and watch cycle (another option for development)
//// Advantage: No server required, can run app from filesystem
//// Disadvantage: Requests are not blocked until bundle is available,
////               can serve an old app on refresh
//gulp.task("build-dev", ["webpack:build-dev"], function () {
//    gulp.watch(["src/**/*"], ["webpack:build-dev"]);
//});

gulp.task("webpack:dev-server", function (callback) {
    // modify some webpack config options
    var webpackDevConfig = Object.create(require('./webpack.config.js'));
    webpackDevConfig.devtool = "source-map";
    webpackDevConfig.debug = true;
    // for inline mode and HMR
    webpackDevConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8384/", "webpack/hot/dev-server");
    webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackDevConfig), {
        hot: true,
        contentBase: "./www/",
//        publicPath: "/" + webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8384, "localhost", function (err) {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }
        gutil.log("[webpack-dev-server:iframe]", "http://localhost:8384/webpack-dev-server/index.html");
        gutil.log("[webpack-dev-server:inline (suggested)]", "http://localhost:8384/index.html");
    });
});

gulp.task("run-dev", function (callback) {
    runSequence('build-dev', ['webpack:dev-server', 'watch', 'open'], callback);
});

gulp.task("open", function(callback) {
    var isWin = /^win/.test(process.platform);
    var isOSX = /^darwin/.test(process.platform);
    var appName = isWin ? 'chrome' : isOSX ? 'google chrome' : 'google-chrome';
    opn('http://localhost:8384/index.html', {app: [appName]});
    callback();
});