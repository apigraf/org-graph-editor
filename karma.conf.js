module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],

        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },

        files: [
            {pattern: 'bootstrap.spec.ts'},
            {pattern: 'app/**/*.+(ts|html)'}
        ],

        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require('karma-typescript-angular2-transform')
                ]
            },
            compilerOptions: {
                lib: ['ES2015', 'DOM'],
                skipLibCheck: true
            }
        },

        reporters: ['dots', 'karma-typescript'],

        browsers: ['Chrome']
    });
};
