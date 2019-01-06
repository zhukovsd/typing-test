process.env.TEST = 'dev';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  // watch: true,

  plugins: [
    new webpack.DefinePlugin({
      'LOGGING_LEVEL': JSON.stringify('trace')
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      // server: { baseDir: ['build'] }
      proxy: 'http://localhost:8080'
    })
  ]
});