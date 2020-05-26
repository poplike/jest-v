var path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
      hash: true,
    }),
  ],
  devServer: {
    open: true,
    port: 8095
    // port: process.env.VUE_APP_PROJECT_TYPE === "management" ? 8088 : 8089,
  }
};
