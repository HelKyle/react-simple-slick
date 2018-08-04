'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const dotenv = require('dotenv')

dotenv.config()

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8080

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',
  entry: {
    vendors: ['react', 'react-dom'],
    docs: './docs/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/docs', 'index.html') },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST,
    port: PORT,
    overlay: { warnings: false, errors: true },
    quiet: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './docs/index.html',
      inject: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: (severity, errors) => {
          if (severity !== 'error') return
      
          const error = errors[0]
          const filename = error.file && error.file.split('!').pop()
          console.error(`${severity}: ${error.name}`)
          console.error(filename)
        }
      }))

      resolve(devWebpackConfig)
    }
  })
})
