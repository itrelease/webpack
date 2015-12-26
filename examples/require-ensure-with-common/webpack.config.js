var path = require("path");
var webpack = require("../../");
module.exports = {
  entry: {
    app: './index.js',
    page: './page',
    common: ['./common-dep1.js']
  },
  output: {
    path: path.join(__dirname, 'js'),
    filename: '[name].[chunkhash:6].js',
    chunkFilename: '[id].[name].[chunkhash:6].js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[chunkhash:6].js',
      minChunks: 2
    })
  ]
};
