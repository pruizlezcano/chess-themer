/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
  mode: 'production',
  entry: {
    'js/chessThemer': path.join(srcDir, 'chessThemer.ts'),
    'js/popup': path.join(srcDir, 'popup.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '.',
          globOptions: { ignore: ['**/themes/**', '**/manifest/**'] },
          context: 'public',
        },
      ],
    }),
  ],
};
