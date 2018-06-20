const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve('src/index.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        // Don't use .babelrc in `yarn link`-ed dependency's directory and use in current direction instead
        loader: 'babel-loader?babelrc=false&extends=' + path.resolve(__dirname, '.babelrc')
      },
      {
        // Don't use extract-text-plugin, which is the normal way. Rather, keep vendor-only CSS in the global
        // scope. This is the same compilation time, just no more struggling with importing CSS into the project
        test   : /\.css$/,
        include: [/node_modules/, /app\/styles/, /app\/assets/],
        use    : ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolveLoader: {
    modules: [
      'node_modules',
    ],
  },
};
