const HtmlWebpackPlugin = require("html-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")

module.exports = {
  entry: "./src/index.ts",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      extensions: [".ts", ".tsx", ".js"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        include: [resolve(__dirname, "src")],
        exclude: /node_modules/,
        options: {
          loader: "tsx",
          target: "es6",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
}
