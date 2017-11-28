const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const helpers = require('./helpers');

const rootPath = path.resolve(__dirname, '..');

const vendor = [
  // "jquery",
  // "classnames",
  "react-dom",
  // "react-redux",
  // "react-router-redux",
  "react-router-dom",
  "react",
  // "redux-saga",
  "bootstrap",
  "react-burger-menu",
  // "seamless-immutable",
  "axios"
];

module.exports = {
  entry: {
    vendor,
    app: path.join(rootPath, 'src', 'index.jsx'),
  },
  output: {
    publicPath: '/',
    path: path.join(rootPath, 'dist'),
    filename: '[name]-bundle.js'
  },
  rules: [
    {
      enforce: 'pre',
      test: /\.jsx?$/,
      use: ['eslint-loader'],
      include: /src/,
      exclude: /node_modules/,
    },
    {
      test: /\.jsx?$/,
      include: /src/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader']
      })
    },
    {
      test: /\.less$/,
      include: /src/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]', 'postcss-loader', 'less-loader']
      })
    },
    {
      test: /\.(otf|eot|ttf|woff|woff2|svg)/,
      use: 'file-loader'
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: 'file-loader'
    }
  ],
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    // devAlias: {
    //   'client': helpers.root('client'),
    //   'framework': helpers.root('client', 'framework'),
    //   'shared': helpers.root('client', 'shared')
    // },
    // prodAlias: {
    //   'seamless-immutable': 'seamless-immutable/seamless-immutable.production.min.js',
    //   'client': helpers.root('client'),
    //   'framework': helpers.root('client', 'framework'),
    //   'shared': helpers.root('client', 'shared')
    // }
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      $: 'jquery',
      Popper: ['popper.js', 'default']
    }),
  ],
};
