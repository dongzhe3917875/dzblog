const path = require("path");
const webpack = require("webpack");
var vendors = ['vue', 'vuex'];

module.exports = {
  entry: {
    "lib": vendors
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: "manifest.json",
      name: '[name]',
      context: __dirname
    })
  ]
};
