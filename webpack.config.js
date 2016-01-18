'use strict';
var path = require('path');

module.exports = {
    entry: ['webpack/hot/dev-server', './app.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    publicPath: '/build/',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
      extensions: ['', '.js']
    }
};
