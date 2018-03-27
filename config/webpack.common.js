const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const sourcePath = path.join(__dirname, '../app');
const npmVendorPath = path.join(__dirname, '../node_modules');
const distPath = path.join(__dirname, '../dist');

module.exports = {
    context: sourcePath,

    entry: [
        'index.ts'
    ],

    output: {
        path: distPath,
        filename: 'bundle.[chunkhash].js',
    },

    resolve: {
        extensions: ['.js', '.ts'],
        modules: [
            npmVendorPath,
            sourcePath
        ]
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                include: sourcePath,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            doctype: 'html',
                            data: {
                                space: ' '
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: sourcePath,
                use: ['to-string-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),

        // fixes WARNING Critical dependency: the request of a dependency is an expression
        new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, '../app')),
    ]
};
