const path = require("path")
const { merge } = require("webpack-merge")
const { ESBuildMinifyPlugin } = require("esbuild-loader")
const CompressionPlugin = require("compression-webpack-plugin")
const config = require("./webpack.config.js")

module.exports = merge(config, {
  mode: "production",
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es6",
      }),
    ],
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
})
