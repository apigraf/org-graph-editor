const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',

    module: {
        rules: [
            {
                test: /\.(ts)$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader']
            }
        ]
    },

    devServer: {
        port: 3000
    }
});
