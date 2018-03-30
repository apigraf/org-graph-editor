const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const path = require('path');

const commonConfig = require('./webpack.common');

const sourcePath = path.join(__dirname, '../app');
const aotGeneratedPath = path.join(__dirname, '../app/$$_gendir');

module.exports = webpackMerge(commonConfig, {
    module: {
        rules: [
            // TODO: AoT пока отключаем из-за бага в ngx-graph (https://github.com/swimlane/ngx-graph/issues/46)
            {
                test: /\.(ts)$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader']
            }
            // {
            //     test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            //     include: [sourcePath, aotGeneratedPath],
            //     use: ['@ngtools/webpack', 'angular2-template-loader']
            // }
        ]
    },

    plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.\/environment\.dev/, './environment.prod'),

        new CleanWebpackPlugin(['dist'], {
            root: process.cwd()
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                sequences: true,
                dead_code: true,
                warnings: false,
                unsafe: true
            },
            output: {
                comments: false
            },
            sourceMap: true
        }),

        // TODO: AoT пока отключаем из-за бага в ngx-graph
        // new AngularCompilerPlugin({
        //     tsConfigPath: 'tsconfig.json',
        //     entryModule: sourcePath + '/app.module#AppModule',
        //     typeChecking: false
        // })
    ]
});
