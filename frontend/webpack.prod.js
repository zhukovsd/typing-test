process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  // output: {
  //   filename: '[name].[chunkhash].js',
  // }

  plugins: [
    new webpack.DefinePlugin({
      'LOGGING_LEVEL': JSON.stringify('silent')
    })
  ]
});