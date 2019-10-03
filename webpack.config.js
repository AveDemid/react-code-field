const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('lib'),
    libraryTarget: 'commonjs2',
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          },
        ]
      }
    ]
  }
};
