const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = () => ({
  entry: './src/index.js',
  plugins: [new WebpackBundleAnalyzer()],
});
