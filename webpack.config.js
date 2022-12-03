const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      }
    ]

  },
  devtool: 'inline-source-map',
  plugins: [
    //new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: '3DBoxesEditor-Development',
      filename: "index.html",
      inject: "body",
     }),
  ],
};