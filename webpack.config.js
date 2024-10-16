const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Import the plugin

module.exports = {
    entry: {
        index: './src/index.js',
        nav: './src/nav.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: './src/nav.html',
            filename: 'nav.html',
            chunks: ['nav'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/songs.db'), to: path.resolve(__dirname, 'dist/songs.db') } // Copy the database
            ]
        }),
    ],
    mode: 'production', // Set to 'development' if you're still developing
};
