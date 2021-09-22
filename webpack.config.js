const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Set mode
const argv = require('yargs').argv;
const devMode = argv.mode !== 'production';

module.exports = {
    mode: argv.mode,
    devtool: devMode ? 'source-map' : false,
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                // pass CSS to style-loader as a single string
                // style-loader embeds CSS in style tag in index.html (dev only)
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/css', to: './css' },
                { from: 'src/assets', to: './assets' },
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            // favicon: `src/favicon.ico`,
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
