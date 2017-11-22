const webpack = require('webpack');
// const helpers = require('./helpers');
const common = require('./common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: common.entry,
  output: common.output,
  devtool: 'hidden-source-map',

  module: {
    rules: common.rules
  },

  resolve: {
    extensions: common.resolve.extensions,
    // alias: common.resolve.prodAlias
  },

  plugins: common.plugins
    .concat([
      new ExtractTextPlugin('[name]-bundle-[contenthash].css'),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '[name]-bundle-[hash].js' }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new WebpackMd5Hash(),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        sourceMap: true,
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false
        },
        comments: false
      })
    ])
};
