const path = require('path');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  watchOptions: {
    aggregateTimeout:300,
    poll:1000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    host: '0.0.0.0', // server to be accessible externally
    public: 'dev.myapp.com:80', // the dev-server is proxied,
    watchOptions: {
      poll: true,
    }, // enable wathing changes on host (vagrant)



  },
};
