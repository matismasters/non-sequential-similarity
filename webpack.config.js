const path = require('path');

module.exports = {
  entry: './src/similarto.js',
  mode: 'production',
  output: {
    filename: 'similarto.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  }, };
