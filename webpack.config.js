module.exports = function(env) {
    let webpackConfig;

    switch(env.target) {
        case 'prod':
            webpackConfig = require('./config/webpack.prod.js');
            break;
        case 'dev':
        default:
            webpackConfig = require('./config/webpack.dev.js');
    }

    if(env.analize) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

        webpackConfig['plugins'].push(new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
            reportFilename: 'stats.html',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
        }));
    }

    return webpackConfig;
};
