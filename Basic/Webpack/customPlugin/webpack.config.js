const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanFile = require('./cleanFile/cleanFile')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            title: '自定义plugin'
        }),
        new cleanFile()
    ]
}