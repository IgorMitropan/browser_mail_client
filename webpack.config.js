'use strict';
let path = require('path');
let webpack = require('webpack');
let ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: ['./spa/js/app.js'],
    output: {
        path: './public/js/',
        publicPath: './public/',
        filename: "build.js"
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
        })
    ]

};
