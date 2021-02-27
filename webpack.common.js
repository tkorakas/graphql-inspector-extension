const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    panel: path.join(__dirname, "src/panel.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "assets/icon*.png", to: "[name].[ext]" },
        { from: "assets/manifest.json", to: "./" },
        { from: "assets/*.html", to: "[name].html" },

      ],
    }),
  ],
};
