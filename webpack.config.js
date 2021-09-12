const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
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
}