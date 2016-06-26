'use strict';
let path = require('path');
let webpack = require('webpack');
let ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: {
        build: ['./spa/js/app.js'],
        vendor: ['angular', 'angular-ui-router', 'lodash', 'restangular', './ui.bootstrap/ui-bootstrap-tpls-1.3.3.min.js']
    },
    output: {
        path: './public/js/',
        publicPath: './public/',
        filename: "[name].js",
        library:  "[name]"
    },

    watch: true,
    devtool: "source-map",

    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,

            loader: 'babel',
            query: {
                presets: ['es2015'],
                plugins: ['transform-es2015-modules-commonjs']
            }
        },
            {
                test: /\.html$/,
                loader: "html"
            }]
    },
    plugins: [
        new ngAnnotatePlugin({
            add: true
            // other ng-annotate options here
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ]

};
