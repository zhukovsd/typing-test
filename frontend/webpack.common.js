const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './app/js/app.js',
  output: {
  	path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  plugins: [
    // bundle CSS together and emit the result into "style.css" file
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],

  module: {
    rules: [
      {
        // ES6 to ES5 with Babel
        use: 'babel-loader',
        test: /\.js$/,
        // disable AMD modules due to problem in jquery.caret
        parser: {
          amd: false
        }
      },
      {
        // pug templates to HTML
        use: [
          {
            // emit HTML files to build folder
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              // pretty output only for dev
              pretty: process.env.NODE_ENV !== 'production'
            }
          }
        ],
        test: /\.pug$/
      },
      {
        // bundle CSS, with source maps on dev
        use: [
          // emit bundled file
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // minimize on prod
              minimize: process.env.NODE_ENV === 'production'
            }
          }
        ],
        test: /\.css$/
      }
    ]
  }
};
