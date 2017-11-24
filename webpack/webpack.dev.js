const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const common = require('./common');

const rootPath = path.resolve(__dirname, '..');

module.exports = {
  entry: common.entry,
  output: common.output,
  devtool: 'source-map',

  module: {
    rules: common.rules,
  },

  resolve: {
    extensions: common.resolve.extensions,
    // alias: common.resolve.devAlias
  },

  plugins: common.plugins.concat([
    new ExtractTextPlugin('[name]-bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '[name]-bundle.js' }),
    new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
  ]),

  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(rootPath, 'src'),
    hot: true,
  },
};
