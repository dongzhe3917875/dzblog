var Post = require('../models/blog.js');
var Comment = require('../models/comments.js');
var User = require('../models/user.js');
exports.post = function(req, res) {
  res.render("postBlog", {})
}

exports.post_blog = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.title, req.body.markdown,
    req.body.subject, req
    .body.post);
  console.log(post);
  post.save(function(err) {
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
      // console.log(posts)
      res.render("blog_list", {
        user: req.session.user,
        posts: posts,
        total: total
      });
    })
  })
}
exports.list_slice = function(req, res) {
  var offset = req.body.offset;
  var pageSize = req.body.pageSize;
  if (req.session.user && (req.session.user.name == req.params.name)) {
    User.get(req.params.name, function(err, user) {
      if (!user) {
        res.redirect('/blog/home');
      }
      Post.getSlice({
        name: user.name,
        offset: offset,
        pageSize: pageSize
      }, function(err, posts, total) {
        if (err) {
          return res.redirect('/blog/home');
        }
        require('express')().set('view engine', 'jade').render(
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
      pageSize: pageSize
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
  Post.getOne(req.params.name, req.params.day, req.params.title, function(err,
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
  Post.getOne(req.params.name, req.params.day, req.params.title, function(err,
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
      var url = encodeURI("/blog/" + req.params.name + "/" + req.params.day +
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
  Post.remove(currentUser.name, req.params.day, req.params.title, function(
    err) {
    if (err) {
      return res.send({
        error: err
      })
    }
    return res.send({
      success: "删除成功"
    })
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

  var newComment = new Comment(req.params.name, req.params.day, req.params.title,
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
