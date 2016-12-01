var path = require('path');
var _root = path.resolve(__dirname, '');

var webpack = require('webpack');

//common plugin for dev and prod env
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge({
    entry: {
        'vendor': './app/vendor/vendor.ts',
        'app': './app/src/main.ts'
    },
    output: {
        path: root('public'),
        publicPath: 'http://localhost:8000/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devtool: 'cheap-module-eval-source-map',

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                exclude: root('app', 'src'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: root('app', 'src'),
                loader: 'raw'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new ExtractTextPlugin('[name].css'),

        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
})

// helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    console.log('this is ' + path.join.apply(path, [_root].concat(args)));
    return path.join.apply(path, [_root].concat(args));
}
