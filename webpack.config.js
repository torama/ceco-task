const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: { 
        app: path.join(__dirname, 'src', 'application.ts')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }, 
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'package.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        })
    ]
};