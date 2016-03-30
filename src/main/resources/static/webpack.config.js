const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './js/app.js'
    ],
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },

    devtool: '#cheap-module-eval-source-map',

    resolve: { 
        extensions: ['', '.js', '.css', '.scss'] 
    },

    plugins: [
        new ExtractTextPlugin('bundle.css', { allChunks: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {   test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
            }
        ]
    },
    postcss: [ autoprefixer ]
};