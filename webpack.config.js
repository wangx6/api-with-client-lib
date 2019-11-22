module.exports = [{
  mode: 'development',
  entry: {
    'index': './client/src/js/index.js',
  },
  output: {
    path: __dirname + '/client/dist/js',
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }],
    }]
  }
}];
