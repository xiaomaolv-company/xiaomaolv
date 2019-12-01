const path = require('path');
const fs = require('fs');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 代码分割插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css 代码的插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HappyPack = require('happypack');// 多线程打包，提升打包速度
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
const plugins = [
  new HtmlWebpackPlugin({// 打包生成index.html文件
    template: path.resolve(__dirname, "../public/index.html"), // 以这个路径下面的index.html为模板进行打包生成index.html
    filename: 'index.html'
  }),
  new CleanWebpackPlugin(), // 每次重新打包都会先删除dist文件夹里面的内容
  new MiniCssExtractPlugin({ // 从js里面将css抽离出来的插件
    filename: "[name].css",
    chunkFilename: "[name].chunk.css"
  }),
  new HappyPack({
    id: 'happyBabel',
    loaders: [{
      loader: 'babel-loader?cacheDirectory=true',
    }],
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new HappyPack({
    id: 'happyCss',
    loaders: [
      'style-loader',
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // publicPath: './'
        }
      },
      'css-loader',
    ]
  }),
  new HappyPack({
    id: 'happyLess',
    loaders: [
      'style-loader',
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // publicPath: './'
        }
      },
      'css-loader',
      'less-loader',
    ]
  })
];
files.forEach(file => {
  if (/.*\.dll\.js$/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file), // 引入这个文件夹下面的[name].dll.js文件到HTML文件中
    }))
  }
  if (/.*\.manifest\.json$/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file)
    }))
  }
});

module.exports = {
  mode: "production",
  // devtool: "cheap-module-source-map", //快速定位js代码出错的位置
  entry: [
    'react-hot-loader/patch',
    './src/app/app.js'
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, '../dist'),
    publicPath: "./", //  打包出来的index.html文件中的script标签上引入bundle.js文件路径上面会添加一个/
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
          }
        }
      },
      {
        test: /\.less$/,
        use: ['happypack/loader?id=happyLess']
      },
      {
        test: /\.css$/,
        use: ['happypack/loader?id=happyCss']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 不把node_modules里面的es6转es5，原因是第三方路已经做了这些操作
        // include: path.resolve(__dirname, '../src'),
        use: [
          // 'react-hot-loader/webpack',
          // "babel-loader"
          'happypack/loader?id=happyBabel'
        ]
      }
    ]
  },
  plugins,
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      "@components": path.resolve(__dirname, '../src/components'),
      "@pages": path.resolve(__dirname, '../src/pages'),
      "@utils": path.resolve(__dirname, '../src/utils'),
    }
  },
  optimization: {
    usedExports: true, // css 代码分割
    splitChunks: { // 代码分割，将公用的第三方类库，打包到一个单独的js文件中，这个文件名以vendors开头
      chunks: 'all', // 代码分割对哪一块代码有效，all 代表对同步和异步代码都进行分割
      minSize: 30000, // 引入的代码，大于30KB才做代码分割
      // maxSize: 0,
      minChunks: 1, // 当一个模块至少被使用了1次才会进行代码分割
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, //将node_modules下面的库打包到vendors开头的文件中
          priority: -10 // 优先级，-10大于-20，所以优先打包到vendors中
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }, // js代码分割
    minimizer: [
      // 压缩CSS的插件
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: {disable: true},
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      }),
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       drop_debugger: true,
      //       drop_console: true // 设置打包时将console语句不打包进去
      //     }
      //   },
      //   parallel: true, // 开启并行压缩，充分利用cpu
      //   exclude: /\.min\.js$/,
      //   cache: true,
      //   extractComments: false,
      // })
    ],
  }
};