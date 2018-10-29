const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const openBrowser = require('react-dev-utils/openBrowser');

const presetConfig = require('./build-utils/loadPresets');

module.exports = ({ mode, presets } = { mode: 'development', presets: [] }) =>
  webpackMerge({
    mode,
    entry: './dist/index.js',
    module: {
      strictExportPresence: true,
      rules: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: 'babel-loader',
        // },
      ],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
      before(app) {
        app.listen(5000, '0.0.0.0', () => {
          openBrowser('http://localhost:5000');
        });
      },
      contentBase: './dist',
      hot: true,
      port: 5000,
    },
  },
  presetConfig({ presets }));
