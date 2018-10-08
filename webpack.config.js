const path = require('path');
const webpack = require('webpack');

module.exports = ({ mode } = { mode: 'production' }) => ({
  mode,
  entry: './dist/index.js',
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 5000,
  },
})