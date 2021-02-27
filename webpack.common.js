const path = require("path");

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
};
