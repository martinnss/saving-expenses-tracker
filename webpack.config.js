const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');


module.exports = {
  resolve: {
    fallback: {
      "process": require.resolve("process/browser"),
      "fs": false,
      "child_process": false,
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
    },
  },
  entry: './src/index.jsx',
  mode: 'development', // or 'production' based on your environment
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
		new NodePolyfillPlugin()
	],

};
