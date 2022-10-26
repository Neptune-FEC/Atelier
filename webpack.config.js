const path = require("path");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "public")
    },
    compress: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new Dotenv(),
    new MomentLocalesPlugin(),
  ]
};