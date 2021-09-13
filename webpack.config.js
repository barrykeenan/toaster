const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

// Set mode
const argv = require('yargs').argv;
const devMode = argv.mode !== 'production';

module.exports = {
    mode: argv.mode,
    devtool: devMode ? 'source-map' : false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/index.html', to: '.' },
                { from: 'src/assets', to: './assets' }
            ],
        }),
    ],
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
    },
    devServer: {
        static: './docs',
        hot: true,
        compress: true,
        client: {
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
};
