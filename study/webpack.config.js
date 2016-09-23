var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require("path");
var Ex = require("extract-text-webpack-plugin");
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
// 关于
// webpack-dev-middleware/middleware.js:106
//             if(err) throw err;
//                     ^
// Error: invalid argument
// For what it's worth, I also ran into this problem today, and found a workaround for my scenario. I was using:
//
// output: {
//     path: './dist',
//     filename: 'bundle.js'
// },
// but I changed it to use:
//
// output: {
//     path: __dirname + '/dist',
//     filename: 'bundle.js'
// },
// and everything worked fine afterwards.
// https://github.com/webpack/webpack-dev-middleware/issues/97
function joinjsPath(filename) {
  return path.join(__dirname, 'public/javascripts/' + filename + ".js");
}
module.exports = {
  // plugins: [commonsPlugin],
  entry: {
    "blog_home": [joinjsPath("socketIO_chat_home")],
    "datatable": [joinjsPath("datatable")],
    "blog_post": [joinjsPath("postBlog")],
    "vue_loader_demo": [joinjsPath("vue_loader_demo")],
    "select_simulate": [joinjsPath("select_simulate")]
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: Ex.extract('style-loader', 'css-loader')
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: "/node_modules/"
    }, {
      test: /\.less$/,
      // loader: 'style-loader!css-loader!less-loader'
      loader: Ex.extract("style-loader", "css-loader!less-loader")
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }]
  },
  plugins: [
    new Ex('[name].css')
  ],
  // plugins: [
  //     new webpack.optimize.OccurenceOrderPlugin(),
  //     new webpack.HotModuleReplacementPlugin(),
  //     new webpack.NoErrorsPlugin()
  // ],
  resolve: {
    //查找module的话从这里开始查找
    // path.resolve解析出一个绝对路径，特别适合resolve的root
    // cd public/components
    // pwd  -> /usr/local/dzblog/dzblog/study/public/components
    root: [path.resolve("public/javascripts"), path.resolve(
      "public/components"), path.resolve("public/stylesheets")]
  }
}
