const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const config = require('@talentui/webpack-config')({
  entry: {
    background: './src/background/background.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  useCommonChunk: false,
  useHostPage: false,
  sourceMap: false,
});

// 拷贝一些静态文件到build目录
const copySource = new CopyPlugin({
  patterns: [
    { from: 'src/images', to: 'images' },
    { from: 'src/css', to: 'css' },
    { from: 'src/action', to: 'action' },
    // 下面这种规则需要指定context才能成功, 如果写成src/options.*，没有指定context则会在build目录新建src目录
    { from: 'options.*', context: 'src'}, 
    'src/manifest.json',
  ],
});
config.plugins.push(copySource);

module.exports = config;
