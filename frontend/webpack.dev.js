const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  // watch: true,

  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      // server: { baseDir: ['build'] }
      proxy: 'http://localhost:8080'
    })
  ]
});