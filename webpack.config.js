const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  devServer: {
    static: './dist',
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