'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.NODE_ENV;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'production';

var webpackConfig = {
    entry: {
        app: ['./src/scripts/app']
    },
    output: {
        path: __dirname + '/www/',
        publicPath: './',
        filename: isProd ? 'scripts/[name].[hash].bundle.js' : 'scripts/[name].bundle.js',
        chunkFilename: isProd ? 'scripts/[id].[name].[chunkhash].chunk.js' : 'scripts/[id].[name].chunk.js',
        sourceMapFilename: '[file].map',
        pathinfo: isProd ? false : true
    },
    devtool: 'source-map',
    externals: {
        'angular': 'angular',
        'angular-route': 'angular-route',
        'onsenui': 'onsenui',
        'ocLazyLoad': 'ocLazyLoad'
    },
    resolve: {
        modulesDirectories: ['src/web_modules', 'node_modules', 'src/bower_components'],
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            // TypeScript loader
            // Reference: https://github.com/TypeStrong/ts-loader
            // Transpile .ts files using TypeScript
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }, {
                // CSS LOADER
                // Reference: https://github.com/webpack/css-loader
                // Allow loading css through js
                //
                // Reference: https://github.com/postcss/postcss-loader
                // Postprocess your css with PostCSS plugins
                test: /\.css$/,
                // Reference: https://github.com/webpack/extract-text-webpack-plugin
                // Extract css files in production builds
                //
                // Reference: https://github.com/webpack/style-loader
                // Use style-loader in development.
                loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap')
            }, {
                // ASSET LOADER
                // Reference: https://github.com/webpack/file-loader
                // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                // Rename the file using the asset hash
                // Pass along the updated reference to your code
                // You can add here any file extension you want to get copied to your output
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            // {
            //   // HTML LOADER
            //   // Reference: https://github.com/webpack/raw-loader
            //   // Allow loading html through js
            //   test: /\.html$/,
            //   loader: 'raw'
            // }
        ]
    },
    plugins: [
        // function() {
        //   this.plugin('done', function(stats) {
        //     require('fs').writeFileSync(
        //       path.join(__dirname, './', 'stats.json'),
        //       JSON.stringify(stats.toJson()));
        //   });
        // },
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: isProd ? 'scripts/common.[hash].js' : 'scripts/common.js'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: isProd ? {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true
            } : {},
            inject: false
        }),
        new ExtractTextPlugin("css/app.bundle.css", {
            allChunks: true
        })
    ],
    isProd: isProd,
    isTest: isTest
};



module.exports = webpackConfig;
