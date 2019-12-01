// 此webpack配置文件专门用于打包第三方模块，原因是第三方模块很少变动，所以可以只打包一次即可。具体用法可以参考DllPlugin的介绍

// dll  动态链接库的意思
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    // lodash: ['lodash'],
    // antdMobile: ['antd-mobile'],
    // saltui: ['saltui'],
    // refast: ['refast'],
    // nattyStorage: ['natty-storage'],
    // nattyFetch: ['natty-fetch'],
    // saltIcon: ['salt-icon'],
    // simplePinyin: ['simple-pinyin'],
    // immutable: ['immutable'],
    // redux: ['redux', 'react-redux'],
    // reactRouter: ['react-router'],
    // reactTransitionGroup: ['react-transition-group'],
    react: ['react', 'react-dom'],
  },

  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, '../dll'),
    library: '[name]', // 将打包出来的dll文件，暴露给window对象
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json'), // 生成映射文件
    }),
  ],
};