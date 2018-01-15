const path = require('path');
const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.csv$/,
        use: ['csv-loader'],
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      }, {
        test: /\.js$/,
        use: ['babel-loader'],
      }, {
        test: /\.vue$/,
        use: ['vue-loader'],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      exclude: ['index.html'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
