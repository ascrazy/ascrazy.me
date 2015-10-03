var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/main.js'
  ],

  output: {
    path:     path.join(__dirname, 'dist/'),
    filename: 'main.js'
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
        loaders: ['babel']
      },
      {
        test:    /\.less$/,
        loaders: ['style', 'css', 'postcss', 'less']
      },
      {
        test: /\.(jpg|svg|ttf)$/,
        loader: 'url'
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'html!./src/index.html',
    })
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    publicPath:  "http://localhost:3000/",
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: {
      colors: true
    }
  }
};
