const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        nav: './src/nav.js',
        db: './src/db-test/db.js',
        rating1: './src/ratings/rating1/rating1.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader' 
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index'],
            cache: false
        }),
        new HtmlWebpackPlugin({
            template: './src/nav.html',
            filename: 'nav.html',
            chunks: ['nav'],
            cache: false
        }),
        new HtmlWebpackPlugin({
            template: './src/db-test/db.html',
            filename: 'db-test/db.html',
            chunks: ['db'],
            cache: false
        }),
        new HtmlWebpackPlugin({
            template: './src/ratings/rating1/rating1.html',
            filename: 'ratings/rating1/rating1.html',
            chunks: ['rating1'],
            cache: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, './songs.db'), to: path.resolve(__dirname, 'dist/songs.db') },
                { from: path.resolve(__dirname, './latest.db'), to: path.resolve(__dirname, 'dist/latest.db') } 
            ]
        }),
    ],
    mode: 'production',
};
