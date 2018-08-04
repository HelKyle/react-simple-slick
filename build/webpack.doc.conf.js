'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    vendors: ['react', 'react-dom'],
    docs: './docs/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './docs/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
})

module.exports = webpackConfig
