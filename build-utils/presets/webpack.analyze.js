const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = () => ({
  entry: './index.js',
  plugins: [new WebpackBundleAnalyzer()],
});
