const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve("lib"),
    libraryTarget: "commonjs2",
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
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      umd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
      umd: "react-dom"
    }
  }
};
