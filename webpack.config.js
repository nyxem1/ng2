var path = require('path');
var _root = path.resolve(__dirname, '..');

var webpack = require('webpack');

//common plugin for dev and prod env
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge({
    entry: {
        'vendor': './app/src/vendor.ts',
        'app': './app/src/app.ts'
    },
    output: {
        path: root('prod'),
        publicPath: 'http://localhost:4000/',
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
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: root('src', 'app'),
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
    return path.join.apply(path, [_root].concat(args));
}