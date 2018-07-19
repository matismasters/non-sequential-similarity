const path = require('path');

module.exports = {
  entry: './src/non-sequential-similarity.js',
  mode: 'production',
  output: {
    filename: 'non-sequential-similarity.min.js',
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
