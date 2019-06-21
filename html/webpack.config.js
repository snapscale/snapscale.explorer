const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pugParser = require('babel-plugin-transform-react-pug');

const baseDir = __dirname;

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(baseDir, 'src', 'index.jsx'),
  },
  output: {
    path: path.resolve(baseDir, 'output', 'src'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/src/',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: ['pug-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(baseDir, 'src', 'home', 'index.pug'),
      filename: '../index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}