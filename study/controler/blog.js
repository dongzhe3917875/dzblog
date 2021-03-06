var Post = require('../models/blog.js');
var Comment = require('../models/comments.js');
var User = require('../models/user.js');
var Version = require('../models/version.js');
exports.post = function(req, res) {
  Version.get_all(function(err1, docs) {
    if (err1) {
      return res.redirect('/blog/home');
    }
    res.render("postBlog", {
      versions: docs
    })
  })

}

exports.post_blog = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.title, req.body.markdown,
    req.body.subject, req
    .body.post, req.body.version);
  post.save(function(err) {
    if (err) {
      return res.send({
        error: err
      })
    }
    Version.get_one(req.body.version, function(err, version) {
      if (err) {
        return res.send({
          error: err
        })
      }
      var count = version.article;
      Version.update(req.body.version, count + 1, function(err) {
        if (err) {
          return res.send({
            error: err
          })
        }
        return res.send({
          success: "发表成功！",
          location: "/blog/" + currentUser.name
        })
      })
    })
  })
}

exports.upload = function(req, res, next) {
  // res.header("Content-Type", "application/json;charset=utf-8");
  console.log("****")
  console.log(req.file);
  console.log("****")
  return res.send({
    success: "上传成功",
    path: req.file.filename
  })
}

exports.list = function(req, res) {
  User.get(req.params.name, function(err, user) {
    if (!user) {
      res.redirect('/blog/home');
    }
    Post.getSlice({
      name: user.name,
      offset: 0,
      pageSize: 5
    }, function(err, posts, total) {
      if (err) {
        return res.redirect('/blog/home');
      }
      Version.get_all(function(err1, docs) {
        if (err1) {
          return res.redirect('/blog/home');
        }
        Post.getAll(user.name, function(err, articles) {
          if (err) {
            return res.redirect('/blog/home');
          }
          var version_to_article = {};
          docs.forEach((doc) => {
            var version = doc.version;
            version_to_article[version] = 0;
            articles.forEach((article) => {
              if (article.version == version) {
                version_to_article[version] =
                  version_to_article[version] + 1
              }
            })
          })
          console.log(version_to_article)
          res.render("blog_list", {
            user: req.session.user,
            ifcurrent: req.session.user.name ==
              req.params.name,
            posts: posts,
            total: total,
            versions: docs,
            version_to_article: version_to_article
          });
        })

      })

    })
  })
}
exports.list_slice = function(req, res) {
  var offset = req.body.offset;
  var pageSize = req.body.pageSize;
  var version = req.body.version;
  if (req.session.user && (req.session.user.name == req.params.name)) {
    User.get(req.params.name, function(err, user) {
      if (!user) {
        res.redirect('/blog/home');
      }
      Post.getSlice({
        name: user.name,
        offset: offset,
        pageSize: pageSize,
        version: version
      }, function(err, posts, total) {
        if (err) {
          return res.redirect('/blog/home');
        }
        require('express')().set('view engine',
          'jade').render(
          'blog_list_paginator', {
            user: req.session.user,
            posts: posts
          },
          function(err, html) {
            res.send({
              content: html,
              total: total
            })
          });
        // return res.render("blog_list_paginator", {
        //   user: req.session.user,
        //   posts: posts
        // });
      })
    })
  } else {
    Post.getSlice({
      offset: offset,
      pageSize: pageSize,
      version: version
    }, function(err, posts, total) {
      if (err) {
        return res.redirect('/blog/home');
      }
      require('express')().set('view engine', 'jade').render(
        'blog_list_index_paginator', {
          user: req.session.user,
          posts: posts
        },
        function(err, html) {
          res.send({
            content: html,
            total: total
          })
        });
      // return res.render("blog_list_paginator", {
      //   user: req.session.user,
      //   posts: posts
      // });
    })
  }

}

exports.listone = function(req, res) {
  Post.getOne(req.params.name, req.params.day, req.params.title, function(
    err,
    post) {
    if (err) {
      return res.send({
        error: "error"
      })
    }
    res.render('article', {
      user: req.session.user,
      title: req.params.title,
      post: post
    })
  })
}

exports.edit = function(req, res) {
  Post.getOne(req.params.name, req.params.day, req.params.title, function(
    err,
    post) {
    if (err) {
      return res.send({
        error: "error"
      })
    }
    res.render('article_edit', {
      user: req.session.user,
      title: req.params.title,
      post: post
    })
  })
}

exports.update_post = function(req, res) {
  var currentUser = req.session.user;
  var post = {
    markdown: req.body.markdown,
    post: req.body.post,
    subject: req.body.subject
  }
  Post.update(currentUser.name, req.params.day, req.params.title,
    post,
    function(err) {
      var url = encodeURI("/blog/" + req.params.name + "/" + req.params
        .day +
        "/" + req.params.title);

      if (err) {
        return res.send({
          error: err
        })
      }
      return res.send({
        success: "更新成功",
        location: url
      })
    })
}

exports.remove_post = function(req, res) {
  var currentUser = req.session.user;
  var version = req.body.version;
  Post.remove(currentUser.name, req.params.day, req.params.title,
    function(
      err) {
      if (err) {
        return res.send({
          error: err
        })
      }
      if (version) {
        Version.get_one(version, function(err, version) {
          if (err) {
            return res.send({
              error: err
            })
          }
          var count = version.article;
          Version.update(req.body.version, count - 1, function(err) {
            if (err) {
              return res.send({
                error: err
              })
            }
            return res.send({
              success: "删除成功",
              version: req.body.version,
              count: count - 1
            })
          })
        })
      } else {
        return res.send({
          success: "删除成功"
        })
      }
    })
}
exports.comment_post = function(req, res) {
  var currentUser = req.session.user;
  var date = new Date();
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
    date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() <
      10 ? '0' + date.getMinutes() : date.getMinutes());
  var comment = {
    name: currentUser.name,
    time: time,
    user: currentUser.name,
    content: req.body.comment
  }

  var newComment = new Comment(req.params.name, req.params.day, req.params
    .title,
    comment);
  newComment.save(function(err) {
    if (err) {
      return res.send({
        error: err
      })
    }
    return res.send({
      success: "评论成功",
      value: comment.content
    })
  })
}

exports.create_new_version = function(req, res) {
  var currentUser = req.session.user;
  var version = req.body.version
  var date = new Date();
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
    date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() <
      10 ? '0' + date.getMinutes() : date.getMinutes());
  var version_obj = new Version(version, currentUser.name, time);
  version_obj.save(function(err) {
    if (err) {
      return res.send({
        error: err
      })
    }
    Version.get_all(function(err1, docs) {
      if (err1) {
        return res.redirect('/blog/home');
      }
      return res.send({
        success: "创建成功",
        versions: docs
      })
    })
  })
}
