'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.index.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.(js?)$/,
        include: [resolve('src'), resolve('docs')],
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.(tsx?)$/,
        include: [resolve('src'), resolve('docs')],
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'ts-loader',
        }]
      },
      {
        test: /\.(scss)$/,
        include: [resolve('src'), resolve('docs')],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
        ]
      }
    ]
  }
}