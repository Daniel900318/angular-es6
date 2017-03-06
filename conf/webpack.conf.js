const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }],

    loaders: [{
      test: /.json$/,
      loaders: [
        'json'
      ]
    }, {
      test: /\.(css|scss)$/,
      loaders: [
        'style',
        'css',
        'sass'
        // 'postcss'
      ]
    }, {
      test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders: [{
        loader: 'url-loader?limit=1000',
        query: {
          name: 'assets/fonts/[name]_[hash].[ext]'
        }
      }]
    }, {
      test: /\.(png|jpg)(\?v=.+)?$/,
      // loader: 'file-loader'
      loader: 'url-loader?limit=1000'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
          'ng-annotate',
          'babel'
        ]
        // loaders: [{
        //     loader: 'babel-loader',
        //     query: {
        //       cacheDirectory: false
        //     }
        //   },
        //   'baggage-loader?[file].html&[file].css'
        // ]
    }, {
      test: /.html$/,
      loaders: [
        'html'
      ]
    }]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.NoErrorsPlugin(),
    // new webpack.IgnorePlugin(/^eslint/),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new webpack.ProvidePlugin({
      // angular: 'angular',

      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.jquery': 'jquery',

      moment: 'moment',
      'window.moment': 'moment',

      _: 'lodash',
      'window._': 'lodash'

    })
  ],
  postcss: () => [autoprefixer],
  debug: true,
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },
  entry: `./${conf.path.src('index')}`
};
