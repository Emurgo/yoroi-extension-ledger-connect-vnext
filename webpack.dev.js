const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  plugins: [
    new CopyWebpackPlugin([
      {from:'static/dev', to: '../'}
    ], {
      debug: true
    })
  ],
});