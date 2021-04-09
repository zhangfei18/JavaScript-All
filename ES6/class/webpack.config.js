const path = require("path");
module.exports = {
  mode: "development",
  entry: "./1.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        use: {
          loader: "babel-loader",
          options: {
            presets: "@babel/preset-env",
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};
