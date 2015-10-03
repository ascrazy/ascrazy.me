var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'production',

  entry: './src/main.js',

  output: {
    path:     path.join(__dirname, 'dist/'),
    filename: 'main.[hash].js'
  },

  resolve: {
    modulesDirectories: [ 'node_modules' ]
  },

  postcss: function() {
    return [ autoprefixer({browsers: [ 'last 2 versions' ]}) ];
  },

  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test:    /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader', {})
      },
      {
        test: /\.(jpg|svg|ttf)$/,
        loader: 'url?limit=5'
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('main.[hash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      }
    }),
    new HtmlWebpackPlugin({
      template: 'html!./src/index.html',
    }),
  ]
};
