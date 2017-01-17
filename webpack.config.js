var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js'],
  output: {
    path: './dist/',
    filename: 'js/app.js'
  },
  devtool: 'source-map',
  debug: true,
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets:['es2015','react'],
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: 'src/css/**/**.css', to: 'css/style.css' },
      { from: 'src/index.html', to: 'index.html' }
    ])
  ]
};
