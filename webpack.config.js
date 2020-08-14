const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    contentBase: "./public",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "dist/css/styles.css",
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "dist/images",
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "dist/js/app.js",
    path: path.resolve(__dirname, "public"),
  },
};
