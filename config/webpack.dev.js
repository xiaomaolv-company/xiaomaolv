const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/app/app.js'
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|svg|pdf|ico|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images/',
              limit: 204800, // 只有图片大于200KB的话才会被打包到imgages文件夹下面，否则会被打成base64的形式，打进bundle.js中
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/, //打包iconfont
        use: {
          loader: "file-loader",
          options: {
            outputPath: 'fonts/',
            // publicPath: 'fonts/',
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 不把node_modules里面的es6转es5，原因是第三方路已经做了这些操作
        use: [
          'react-hot-loader/webpack',
          "babel-loader"
        ],
      },
      {
        test: /\.tsx$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: "index.html"
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".jsx", ".js", ".ts", ".tsx"],
    alias: {
      "@components": path.resolve(__dirname, '../src/components'),
      "@pages": path.resolve(__dirname, '../src/pages'),
      "@utils": path.resolve(__dirname, '../src/utils'),
    }
  },
  optimization: {
    splitChunks: {chunks: "all"},
  },
  devServer: {
    // host: '192.168.2.122',
    host: 'localhost',
    port: 3000,
    hot: true,
    // hotOnly: true,
    proxy: { // 跨域代理
      '/**': {
        // target: 'http://192.168.1.108:8080/',
        target: 'http://localhost:8080/',
        secure: false, // 对https也能访问
        changeOrigin: true
      }
    }
  }
};