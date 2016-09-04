var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require("path");
module.exports = {
  // plugins: [commonsPlugin],
  entry: {
    "blog_home": './public/javascripts/socketIO_chat_home.js',
    "datatable": './public/javascripts/datatable.js',
    "blog_post": './public/javascripts/postBlog.js',
    "vue_loader_demo": './public/javascripts/vue_loader_demo.js',
  },
  output: {
    path: 'public/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: "/node_modules/"
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }]
  },
  resolve: {
    //查找module的话从这里开始查找
    // path.resolve解析出一个绝对路径，特别适合resolve的root
    // cd public/components
    // pwd  -> /usr/local/dzblog/dzblog/study/public/components
    root: [path.resolve("public/javascripts"),path.resolve("public/components")]
  }
}
