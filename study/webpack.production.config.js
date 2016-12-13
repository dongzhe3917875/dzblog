var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require("path");
var Ex = require("extract-text-webpack-plugin");
var publicPath = 'http://45.62.108.67:3000/dist/';
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
// var hotMiddlewareScript =
//   'webpack-hot-middleware/client?path=http://45.62.108.67:3000/__webpack_hmr&reload=true&noInfo=false&quiet=false&timeout=2000';
// var hotMiddlewareScript =
//   'webpack-hot-middleware/client?http://45.62.108.67:3000/&noInfo=true&reload=true';

// 'webpack-hot-middleware/client';

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
// function joinjsPath(filename) {
//   return [hotMiddlewareScript, path.join(__dirname, 'public/javascripts/' +
//     filename + ".js")]
// }
function joinjsPath(filename) {
  return path.join(__dirname, 'public/javascripts/' + filename + ".js")
}
module.exports = {
  // plugins: [commonsPlugin],
  entry: {
    "blog_home": joinjsPath("socketIO_chat_home"),
    "datatable": joinjsPath("datatable"),
    "blog_post": joinjsPath("postBlog"),
    "vue_loader_demo": joinjsPath("vue_loader_demo"),
    "select_simulate": joinjsPath("select_simulate"),
    "vuex_cart": joinjsPath("vuex_cart")
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].js',
    publicPath: publicPath
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: Ex.extract('style-loader', 'css-loader')
        // loader: 'style-loader!css-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: function(path) {
        // 路径中含有 node_modules 的就不去解析。
        var isNpmModule = !!path.match(/node_modules/);
        return isNpmModule;
      },
      query: {
        presets: ['es2015']
      }
      // include: [
      //   // 只去解析运行目录下的 src 和 demo 文件夹
      //   path.join(process.cwd(), './src'),
      //   path.join(process.cwd(), './demo')
      // ]
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
    new Ex('[name].css'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./manifest.json")
    })
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
    // 可以实现提取出来的公共打包
    // new  webpack.optimize.CommonsChunkPlugin('common.js', ['blog_home', 'datatable'])
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
