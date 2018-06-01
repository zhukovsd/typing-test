const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    bundle: './app/js/app.js'
  },
  output: {
  	path: path.resolve(__dirname, 'build'),
    // filename: 'bundle.js'
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js'
    // '[name].[chunkhash].js'
  },

  plugins: [
    new CleanWebpackPlugin(['build/*']),

    // bundle CSS together and emit the result into "style.css" file
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'production' ? 'style.[contenthash].css' : 'style.css'
    }),

    new HtmlWebpackPlugin({
      //   // template: 'build/index.html',
      //   template: 'out.html',
      template: 'app/index.pug',
      inject: 'head',

      minify: {
        // remove HTML comments on production
        removeComments: process.env.NODE_ENV === 'production',
        // don't remove HTML comment with build info
        ignoreCustomComments: [ /^.*Built from.*$/ ]
      }
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
        // use: [
        //   {
        //     // emit HTML files to build folder
        //     loader: 'file-loader',
        //     options: {
        //       // name: '[name].html'
        //       name: 'out.html'
        //     }
        //   },
        //   {
        //     loader: 'pug-html-loader',
        //     options: {
        //       // pretty output only for dev
        //       pretty: process.env.NODE_ENV !== 'production'
        //     }
        //   }
        // ],
        use: [
          {
            loader: 'pug-loader',
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
