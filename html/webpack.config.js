const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssImport = require('postcss-import');

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
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.css?$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: [
          path.resolve(baseDir, 'src', 'sass'),
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { modules: true } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                postcssImport({ root: loader.resourcePath }),
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(baseDir, 'src', 'sass'),
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'file-loader',
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
};
