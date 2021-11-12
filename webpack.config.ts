module.exports = {
  entry: "./src/assets/js/app.js",
  mode: "development",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.ttf$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(svg|gif|png|eot|woff|ttf)$/,
        use: ["url-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
